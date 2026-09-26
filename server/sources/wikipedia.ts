import { SearchResultItem } from '../../src/types';

/**
 * Strips HTML tags and unescapes common HTML entities from Wikipedia API output.
 * Crucial rule: Never display raw <span class="searchmatch">...</span> in UI.
 */
function cleanWikipediaText(rawHtml: string): string {
  if (!rawHtml) return '';
  return rawHtml
    .replace(/<span\s+class="searchmatch">/gi, '')
    .replace(/<\/span>/gi, '')
    .replace(/<[^>]+>/g, '') // remove any other tags
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Fetches the authentic, authoritative lead extract (plain text intro) from Wikipedia for given page IDs.
 */
async function fetchPageExtracts(pageIds: number[]): Promise<Record<number, string>> {
  if (pageIds.length === 0) return {};
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&pageids=${pageIds.join(
      '|'
    )}&format=json`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'EduSearch-Academic-Project/1.0 (academic-ir-assistant; mailto:contact@edusearch.edu)',
      },
    });
    clearTimeout(timeoutId);

    if (!res.ok) return {};
    const data = await res.json();
    const pages = data?.query?.pages || {};
    const extracts: Record<number, string> = {};
    for (const [pid, pdata] of Object.entries<any>(pages)) {
      if (pdata.extract) {
        extracts[Number(pid)] = pdata.extract.trim();
      }
    }
    return extracts;
  } catch {
    return {};
  }
}

/**
 * Fetches the full lead article extract for a specific topic directly.
 */
export async function fetchWikipediaArticleExtract(topic: string): Promise<string> {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&titles=${encodeURIComponent(
      topic
    )}&redirects=1&format=json`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'EduSearch-Academic-Project/1.0 (academic-ir-assistant; mailto:contact@edusearch.edu)',
      },
    });
    clearTimeout(timeoutId);

    if (!res.ok) return '';
    const data = await res.json();
    const pages = data?.query?.pages || {};
    for (const p of Object.values<any>(pages)) {
      if (p.extract && p.extract.length > 50) {
        return p.extract.trim();
      }
    }
    return '';
  } catch {
    return '';
  }
}

export async function searchWikipedia(query: string, limit = 5): Promise<SearchResultItem[]> {
  try {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      query
    )}&utf8=&format=json&srlimit=${limit}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(endpoint, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'EduSearch-Academic-Project/1.0 (academic-ir-assistant; mailto:contact@edusearch.edu)',
      },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Wikipedia search returned status ${response.status}`);
      return [];
    }

    const data = await response.json();
    const searchItems = data?.query?.search || [];
    if (searchItems.length === 0) return [];

    // Fetch rich authentic extracts for top results
    const topPageIds = searchItems.slice(0, 3).map((item: any) => item.pageid).filter(Boolean);
    const extracts = await fetchPageExtracts(topPageIds);

    const results: SearchResultItem[] = searchItems.map((item: any, index: number) => {
      const richExtract = extracts[item.pageid];
      let cleanSnippet = richExtract
        ? richExtract.slice(0, 320) + (richExtract.length > 320 ? '...' : '')
        : cleanWikipediaText(item.snippet);

      const titleLower = item.title.toLowerCase();
      const queryLower = query.toLowerCase();

      // Meaningful relevance scoring for web source:
      let webScore = 75;
      if (titleLower === queryLower) {
        webScore = 98;
      } else if (titleLower.includes(queryLower) || queryLower.includes(titleLower)) {
        webScore = 93 - index * 2;
      } else {
        webScore = Math.max(65, 85 - index * 4);
      }

      const matchedTerms = query
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 2 && (titleLower.includes(w) || cleanSnippet.toLowerCase().includes(w)));

      return {
        id: `wiki-${item.pageid || index}`,
        sourceType: 'web',
        title: item.title,
        snippet: cleanSnippet.endsWith('.') ? cleanSnippet : `${cleanSnippet}...`,
        matchedTerms: matchedTerms.length > 0 ? matchedTerms : [query],
        relevanceScore: webScore,
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/\s+/g, '_'))}`,
      };
    });

    return results;
  } catch (err: any) {
    console.warn('Wikipedia search error (graceful fallback):', err.message || err);
    return [];
  }
}

