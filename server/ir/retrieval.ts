import { IRBreakdown, SearchResultItem } from '../../src/types';
import { invertedIndex } from './indexer';
import { preprocessText } from './preprocessor';

export interface RetrievalResult {
  docId: string;
  relevanceScore: number; // 0 to 100
  tfidfScore: number;
  bm25Score: number;
  cosineSimilarity: number;
  snippet: string;
  matchedTerms: string[];
  irBreakdown: IRBreakdown;
}

const BM25_K1 = 1.5;
const BM25_B = 0.75;

export function searchLocalCollection(rawQuery: string): SearchResultItem[] {
  if (!rawQuery || !rawQuery.trim()) return [];

  const queryPreprocessed = preprocessText(rawQuery);
  // If all words were stopwords (e.g. "what is the"), fall back to raw tokens
  const queryStems = queryPreprocessed.stems.length > 0
    ? queryPreprocessed.stems
    : queryPreprocessed.tokens;
  
  if (queryStems.length === 0) return [];

  const totalDocs = invertedIndex.getTotalDocs();
  if (totalDocs === 0) return [];

  const avgDocLength = invertedIndex.getAvgDocLength();

  // Query term frequencies
  const queryTermFreqs = new Map<string, number>();
  for (const stem of queryStems) {
    queryTermFreqs.set(stem, (queryTermFreqs.get(stem) || 0) + 1);
  }

  // Calculate IDFs for query terms
  const queryIdfs = new Map<string, number>();
  const bm25Idfs = new Map<string, number>();

  for (const stem of queryTermFreqs.keys()) {
    const nt = invertedIndex.getDocFrequency(stem);
    // Standard smoothed IDF: ln(1 + N / (nt + 0.5))
    const standardIdf = Math.log(1 + (totalDocs / (nt + 0.5)));
    // BM25 Robertson-Spärck Jones IDF
    const bm25Idf = Math.log(Math.max(0.1, (totalDocs - nt + 0.5) / (nt + 0.5) + 1));

    queryIdfs.set(stem, standardIdf);
    bm25Idfs.set(stem, bm25Idf);
  }

  // Calculate Query Vector Norm for Cosine Similarity
  let queryVectorSumSq = 0;
  for (const [stem, qtf] of queryTermFreqs.entries()) {
    const idf = queryIdfs.get(stem) || 1;
    const w_q = (1 + Math.log(qtf)) * idf;
    queryVectorSumSq += w_q * w_q;
  }
  const queryNorm = Math.sqrt(queryVectorSumSq) || 1;

  // Candidate documents: docs containing at least one query term
  const candidateDocIds = new Set<string>();
  for (const stem of queryTermFreqs.keys()) {
    const postings = invertedIndex.getPostings(stem);
    for (const p of postings) {
      candidateDocIds.add(p.docId);
    }
  }

  const scoredDocs: RetrievalResult[] = [];

  for (const docId of candidateDocIds) {
    const meta = invertedIndex.getDocumentMeta(docId);
    if (!meta) continue;

    const docLength = meta.docLength;
    let dotProduct = 0;
    let bm25Sum = 0;
    let matchedQueryStemsCount = 0;
    const tokenWeightsBreakdown: IRBreakdown['tokenWeights'] = [];
    const matchedOriginalWords = new Set<string>();

    // Calculate document vector norm across its terms
    let docVectorSumSq = 0;
    for (const [stem, dtf] of meta.termFreqs.entries()) {
      const nt = invertedIndex.getDocFrequency(stem);
      const idf = Math.log(1 + (totalDocs / (nt + 0.5)));
      const w_d = (1 + Math.log(dtf)) * idf;
      docVectorSumSq += w_d * w_d;
    }
    const docNorm = Math.sqrt(docVectorSumSq) || 1;

    // Evaluate each query term
    for (const [stem, qtf] of queryTermFreqs.entries()) {
      const dtf = meta.termFreqs.get(stem) || 0;
      const idf = queryIdfs.get(stem) || 0;
      const bm25Idf = bm25Idfs.get(stem) || 0;

      let bm25Contribution = 0;
      let tfidfWeight = 0;

      if (dtf > 0) {
        matchedQueryStemsCount++;
        // TF-IDF weights
        const w_q = (1 + Math.log(qtf)) * idf;
        const w_d = (1 + Math.log(dtf)) * idf;
        tfidfWeight = w_d;
        dotProduct += w_q * w_d;

        // BM25 term contribution
        const numerator = dtf * (BM25_K1 + 1);
        const denominator = dtf + BM25_K1 * (1 - BM25_B + BM25_B * (docLength / (avgDocLength || 1)));
        bm25Contribution = bm25Idf * (numerator / denominator);
        bm25Sum += bm25Contribution;

        // Find original matching word in tokens
        const matchedToken = queryPreprocessed.tokens.find((t) => t.startsWith(stem.slice(0, 3))) || stem;
        matchedOriginalWords.add(matchedToken);
      }

      tokenWeightsBreakdown.push({
        token: stem,
        stem,
        tf: dtf,
        idf: Number(idf.toFixed(3)),
        tfidf: Number(tfidfWeight.toFixed(3)),
        bm25Contribution: Number(bm25Contribution.toFixed(3)),
      });
    }

    const cosineSim = Math.max(0, Math.min(1, dotProduct / (queryNorm * docNorm)));
    const coverageRatio = matchedQueryStemsCount / queryTermFreqs.size;

    // Check title/subject match for relevance boost
    const titleLower = meta.doc.title.toLowerCase();
    const subjectLower = meta.doc.subject.toLowerCase();
    let hasTitleOrSubjectMatch = false;
    let titleBoost = 1.0;
    for (const qWord of queryPreprocessed.tokens) {
      if (qWord.length >= 3 && (titleLower.includes(qWord) || subjectLower.includes(qWord))) {
        titleBoost += 0.25;
        hasTitleOrSubjectMatch = true;
      }
    }

    // STRICT RELEVANCE FILTERING:
    // Do NOT return documents with negligible or incidental keyword overlap.
    // If a query is about "Photosynthesis" or "Contract Law", don't return computer science docs just because a single generic word matched.
    const isMeaningfullyRelevant =
      hasTitleOrSubjectMatch ||
      (cosineSim >= 0.12 && coverageRatio >= 0.25) ||
      (bm25Sum >= 2.5 && matchedQueryStemsCount >= 1 && coverageRatio >= 0.3);

    if (!isMeaningfullyRelevant) {
      continue;
    }

    // Normalized Final Relevance Score (0 - 100%)
    // Combine Cosine Similarity (directional fit) + BM25 saturation + Query Term Coverage
    const normalizedBM25 = Math.min(1, bm25Sum / (bm25Sum + 4)); // Sigmoid-style bounded saturation
    const combinedRaw = (0.45 * cosineSim + 0.35 * normalizedBM25 + 0.20 * coverageRatio) * titleBoost;

    // Map to realistic 55% - 98% range for verified relevant matches
    const finalRelevanceScore = Math.min(99, Math.max(50, Math.round(combinedRaw * 85) + 20));

    // Generate intelligent contextual snippet with query terms
    const snippet = extractRelevantSnippet(meta.doc.text, queryPreprocessed.tokens);

    scoredDocs.push({
      docId,
      relevanceScore: finalRelevanceScore,
      tfidfScore: Number(dotProduct.toFixed(3)),
      bm25Score: Number(bm25Sum.toFixed(3)),
      cosineSimilarity: Number(cosineSim.toFixed(4)),
      snippet,
      matchedTerms: Array.from(matchedOriginalWords),
      irBreakdown: {
        queryTokens: queryPreprocessed.tokens,
        stemmedTokens: queryStems,
        matchedTokens: Array.from(matchedOriginalWords),
        tokenWeights: tokenWeightsBreakdown,
        tfidfScore: Number(dotProduct.toFixed(3)),
        bm25Score: Number(bm25Sum.toFixed(3)),
        cosineSimilarity: Number(cosineSim.toFixed(4)),
        termCoverageRatio: Number(coverageRatio.toFixed(2)),
        docLength,
        avgDocLength: Math.round(avgDocLength),
        finalRelevanceScore,
        explanation: `BM25 term saturation score: ${bm25Sum.toFixed(2)}, Cosine Angle Similarity: ${cosineSim.toFixed(3)}, Query Term Coverage: ${(coverageRatio * 100).toFixed(0)}%. Combined with title relevance coefficient: ${titleBoost.toFixed(2)}x.`,
      },
    });
  }

  // Sort descending by relevanceScore
  scoredDocs.sort((a, b) => b.relevanceScore - a.relevanceScore);

  return scoredDocs.map((res) => {
    const docMeta = invertedIndex.getDocumentMeta(res.docId)!;
    return {
      id: docMeta.doc.id,
      sourceType: 'local',
      title: docMeta.doc.title,
      subject: docMeta.doc.subject,
      filename: docMeta.doc.filename,
      snippet: res.snippet,
      fullText: docMeta.doc.text,
      matchedTerms: res.matchedTerms,
      relevanceScore: res.relevanceScore,
      uploadDate: docMeta.doc.uploadDate,
      irBreakdown: res.irBreakdown,
    };
  });
}

/**
 * Extracts a high-density snippet of the document centered around query tokens.
 */
function extractRelevantSnippet(text: string, queryTokens: string[], windowSize = 220): string {
  if (!text) return '';
  const textClean = text.replace(/\s+/g, ' ').trim();
  if (textClean.length <= windowSize) return textClean;

  const lowerText = textClean.toLowerCase();
  let bestPos = -1;
  let maxScore = -1;

  // Find occurrences of query tokens
  for (const token of queryTokens) {
    if (token.length < 3) continue;
    let pos = lowerText.indexOf(token);
    while (pos !== -1) {
      // Evaluate a window around pos
      const start = Math.max(0, pos - 40);
      const end = Math.min(textClean.length, start + windowSize);
      const windowStr = lowerText.slice(start, end);

      let score = 0;
      for (const t of queryTokens) {
        if (windowStr.includes(t)) score += 1;
      }
      if (score > maxScore) {
        maxScore = score;
        bestPos = start;
      }
      pos = lowerText.indexOf(token, pos + 1);
    }
  }

  if (bestPos === -1) {
    return textClean.slice(0, windowSize) + '...';
  }

  // Adjust to start on a word boundary
  let adjustedStart = bestPos;
  if (adjustedStart > 0) {
    const spaceIdx = textClean.indexOf(' ', adjustedStart);
    if (spaceIdx !== -1 && spaceIdx - adjustedStart < 25) {
      adjustedStart = spaceIdx + 1;
    }
  }

  const snippet = textClean.slice(adjustedStart, adjustedStart + windowSize);
  return (adjustedStart > 0 ? '...' : '') + snippet.trim() + (adjustedStart + windowSize < textClean.length ? '...' : '');
}
