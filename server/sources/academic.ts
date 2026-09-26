import { SearchResultItem } from '../../src/types';

function cleanAbstract(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/<jats:[^>]+>/gi, '')
    .replace(/<\/jats:[^>]+>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Searches academic literature via Crossref API with OpenAlex fallback.
 */
export async function searchAcademicPapers(query: string, limit = 5): Promise<SearchResultItem[]> {
  // First attempt: Crossref API
  try {
    const crossrefUrl = `https://api.crossref.org/works?query=${encodeURIComponent(
      query
    )}&rows=${limit}&sort=relevance`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const res = await fetch(crossrefUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'EduSearch-Academic/1.0 (mailto:academic-ir-project@edusearch.edu)',
      },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const items = data?.message?.items || [];

      if (items.length > 0) {
        return items.map((item: any, idx: number) => {
          const title = Array.isArray(item.title) ? item.title[0] : item.title || 'Academic Paper';
          const authors = (item.author || [])
            .map((a: any) => `${a.given || ''} ${a.family || ''}`.trim())
            .filter((name: string) => name.length > 0)
            .slice(0, 4);

          const journal = Array.isArray(item['container-title'])
            ? item['container-title'][0]
            : item['container-title'] || item.publisher || 'Academic Journal';

          const year =
            item['published-print']?.['date-parts']?.[0]?.[0] ||
            item['published-online']?.['date-parts']?.[0]?.[0] ||
            item.issued?.['date-parts']?.[0]?.[0] ||
            'Recent';

          const rawAbstract = item.abstract || '';
          const cleanAbs = cleanAbstract(rawAbstract);
          const snippet = cleanAbs
            ? cleanAbs.slice(0, 260) + (cleanAbs.length > 260 ? '...' : '')
            : `Peer-reviewed scientific research published in ${journal} investigating ${query}.`;

          const doi = item.DOI;
          const url = item.URL || (doi ? `https://doi.org/${doi}` : undefined);

          // Relevance scoring for academic source based on index and query presence in title
          const titleMatches = title.toLowerCase().includes(query.toLowerCase());
          const score = titleMatches ? Math.max(78, 94 - idx * 3) : Math.max(65, 85 - idx * 4);

          return {
            id: `academic-cr-${item.DOI || idx}`,
            sourceType: 'academic',
            title,
            snippet,
            authors: authors.length > 0 ? authors : ['Scholarly Contributors'],
            journal,
            year,
            doi,
            url,
            relevanceScore: score,
            matchedTerms: [query],
          };
        });
      }
    }
  } catch (err: any) {
    console.warn('Crossref API request failed, attempting OpenAlex fallback:', err.message || err);
  }

  // Fallback attempt: OpenAlex API
  try {
    const openAlexUrl = `https://api.openalex.org/works?search=${encodeURIComponent(
      query
    )}&per-page=${limit}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(openAlexUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'EduSearch-Academic/1.0 (mailto:academic-ir-project@edusearch.edu)',
      },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const items = data?.results || [];

      return items.map((item: any, idx: number) => {
        const title = item.title || item.display_name || 'Academic Work';
        const authors = (item.authorships || [])
          .map((a: any) => a.author?.display_name)
          .filter(Boolean)
          .slice(0, 4);

        const journal = item.primary_location?.source?.display_name || 'Scholarly Publication';
        const year = item.publication_year || 'Recent';
        
        let snippet = `Academic work on ${query} indexed in scientific databases.`;
        if (item.abstract_inverted_index) {
          // Reconstruct inverted index abstract
          const wordsWithPositions: [string, number][] = [];
          for (const [word, positions] of Object.entries(item.abstract_inverted_index as Record<string, number[]>)) {
            for (const pos of positions) {
              wordsWithPositions.push([word, pos]);
            }
          }
          wordsWithPositions.sort((a, b) => a[1] - b[1]);
          const reconstructed = wordsWithPositions.map((w) => w[0]).join(' ');
          snippet = reconstructed.slice(0, 260) + (reconstructed.length > 260 ? '...' : '');
        }

        const doi = item.doi;
        const url = doi ? (doi.startsWith('http') ? doi : `https://doi.org/${doi}`) : undefined;

        return {
          id: `academic-oa-${item.id || idx}`,
          sourceType: 'academic',
          title,
          snippet,
          authors: authors.length > 0 ? authors : ['Research Authors'],
          journal,
          year,
          doi,
          url,
          relevanceScore: Math.max(68, 90 - idx * 4),
          matchedTerms: [query],
        };
      });
    }
  } catch (err: any) {
    console.warn('OpenAlex API fallback also encountered error:', err.message || err);
  }

  return [];
}
