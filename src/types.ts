export type SourceType = 'local' | 'web' | 'academic';

export interface IRBreakdown {
  queryTokens: string[];
  stemmedTokens: string[];
  matchedTokens: string[];
  tokenWeights: {
    token: string;
    stem: string;
    tf: number;
    idf: number;
    tfidf: number;
    bm25Contribution: number;
  }[];
  tfidfScore: number;
  bm25Score: number;
  cosineSimilarity: number;
  termCoverageRatio: number;
  docLength: number;
  avgDocLength: number;
  finalRelevanceScore: number; // 0 to 100%
  explanation: string;
}

export interface SearchResultItem {
  id: string;
  sourceType: SourceType;
  title: string;
  subject?: string;
  filename?: string;
  snippet: string;
  fullText?: string;
  matchedTerms: string[];
  relevanceScore: number; // 0 to 100
  url?: string;
  authors?: string[];
  journal?: string;
  year?: number | string;
  doi?: string;
  uploadDate?: string;
  irBreakdown?: IRBreakdown;
}

export interface SearchResponse {
  query: string;
  queryProcessed: {
    raw: string;
    tokens: string[];
    stopwordsRemoved: string[];
    stemmed: string[];
  };
  totalResults: number;
  localResultsCount: number;
  webResultsCount: number;
  academicResultsCount: number;
  results: SearchResultItem[];
  retrievalTimeMs: number;
}

export interface DocumentItem {
  id: string;
  title: string;
  subject: string;
  filename: string;
  uploadDate: string;
  fileSize?: string;
  text: string;
  wordCount: number;
  isSeed?: boolean;
}

export interface RelevantConcept {
  title: string;
  explanation: string;
  keyTakeaway?: string;
  keyFormulaOrPrinciple?: string;
  deepStudyPoints?: string[];
  realWorldApplication?: string;
  examInsight?: string;
}

export interface RecommendedBook {
  title: string;
  author: string;
  editionOrYear?: string;
  famousAlias?: string; // e.g. "The Dinosaur Book", "The Dragon Book", "CLRS", "The Cow Book"
  whyRecommended: string;
  keyChaptersToStudy: string;
  difficultyLevel?: string;
  searchUrl: string;
}

export interface StudyNotes {
  topic: string;
  generatedAt: string;
  isAiGenerated: boolean;
  modelUsed?: string;
  generationTimeMs?: number;
  overview: {
    summary: string;
    sourceType: string;
  };
  keyConcepts: RelevantConcept[];
  relatedSuggestions: string[];
  recommendedBooks?: RecommendedBook[];
  subtopics?: string[];
  howItWorks?: {
    stepNumber: number;
    phase: string;
    description: string;
  }[];
  examples?: {
    title: string;
    description: string;
    outcome: string;
  }[];
  applications?: string[];
  advantages?: string[];
  limitations?: string[];
  quickRevision?: string[];
  importantTerms?: {
    term: string;
    definition: string;
  }[];
  examQuestions?: {
    type: 'Define' | 'Explain' | 'Compare' | 'Architecture' | 'Practical';
    question: string;
    guidance: string;
    marks: number;
  }[];
  sources: {
    title: string;
    type: string;
    url?: string;
  }[];
}
