import React, { useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  ExternalLink,
  FileText,
  GraduationCap,
  HelpCircle,
  Search,
  Sparkles,
  Zap,
} from 'lucide-react';
import { IRBreakdown, SearchResultItem } from '../types';

interface ResultsListProps {
  query: string;
  results: SearchResultItem[];
  retrievalTimeMs: number;
  localCount: number;
  webCount: number;
  academicCount: number;
  onGenerateStudyNotes: (topic: string) => void;
  isGeneratingNotes: boolean;
  onViewDocument: (docId: string) => void;
  onExplainIR: (breakdown: IRBreakdown, title: string) => void;
}

export const ResultsList: React.FC<ResultsListProps> = ({
  query,
  results,
  retrievalTimeMs,
  localCount,
  webCount,
  academicCount,
  onGenerateStudyNotes,
  isGeneratingNotes,
  onViewDocument,
  onExplainIR,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'local' | 'web' | 'academic'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'title' | 'source'>('relevance');

  // Filter results
  let filtered = results.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.sourceType === activeFilter;
  });

  // Sort results
  filtered.sort((a, b) => {
    if (sortBy === 'relevance') {
      return b.relevanceScore - a.relevanceScore;
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'source') {
      return a.sourceType.localeCompare(b.sourceType);
    }
    return 0;
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header Info Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-xs">
            Results for &ldquo;{query}&rdquo;
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Retrieved {results.length} educational results in {retrievalTimeMs}ms
          </p>
        </div>

        {/* Apple iOS 18 Liquid Glass Filter Pills */}
        <div className="apple-glass-tab-bar flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeFilter === 'all'
                ? 'apple-glass-tab-active'
                : 'apple-glass-tab-inactive'
            }`}
          >
            All ({results.length})
          </button>
          <button
            onClick={() => setActiveFilter('local')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeFilter === 'local'
                ? 'apple-glass-tab-active'
                : 'apple-glass-tab-inactive'
            }`}
          >
            Local ({localCount})
          </button>
          <button
            onClick={() => setActiveFilter('web')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeFilter === 'web'
                ? 'apple-glass-tab-active'
                : 'apple-glass-tab-inactive'
            }`}
          >
            Wikipedia ({webCount})
          </button>
          <button
            onClick={() => setActiveFilter('academic')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeFilter === 'academic'
                ? 'apple-glass-tab-active'
                : 'apple-glass-tab-inactive'
            }`}
          >
            Academic ({academicCount})
          </button>
        </div>
      </div>

      {/* APPLE LIQUID GLASS STUDY NOTES SYNTHESIS CARD */}
      <div className="apple-liquid-glass apple-glass-refract p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-xs shrink-0 mt-0.5 backdrop-blur-xl">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20">
                  Instant Syllabus Guide
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                Study Notes for &ldquo;{query}&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-xl leading-relaxed">
                Synthesizes academic overviews, high-yield principles, textbook recommendations, and exam takeaways into a view-only study guide.
              </p>
            </div>
          </div>

          <button
            onClick={() => onGenerateStudyNotes(query)}
            disabled={isGeneratingNotes}
            className="cursor-pointer px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm shadow-[0_4px_18px_rgba(255,255,255,0.35)] hover:bg-white/90 active:scale-97 transition-all flex items-center justify-center gap-2 shrink-0 select-none"
          >
            {isGeneratingNotes ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-black" />
                <span>Generate Notes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* RESULTS LIST */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center apple-liquid-glass space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/50 backdrop-blur-xl">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">
            No matching records found
          </h3>
          <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto">
            No matching records for &ldquo;{query}&rdquo; in this filter. Try a broader course topic or different keywords.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            if (item.sourceType === 'local') {
              return (
                <div
                  key={item.id}
                  className="group relative apple-liquid-glass p-5 sm:p-6 transition-all duration-200 hover:border-white/30 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/15">
                        <FileText className="w-3 h-3" />
                        Local Note
                      </span>
                      {item.subject && (
                        <span className="text-xs text-white/60 font-medium">
                          • {item.subject}
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                      {item.relevanceScore}% Match
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  {item.filename && (
                    <p className="text-[11px] font-mono text-white/40">
                      File: {item.filename}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                    {item.snippet}
                  </p>

                  {/* Matched tokens */}
                  {item.matchedTerms && item.matchedTerms.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] text-white/40">Matched:</span>
                      {item.matchedTerms.map((term, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/15"
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => onViewDocument(item.id)}
                      className="apple-glass-button inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white cursor-pointer"
                    >
                      <span>Read Document</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {item.irBreakdown && (
                      <button
                        onClick={() => onExplainIR(item.irBreakdown!, item.title)}
                        className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>View IR Ranking Math</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            }

            if (item.sourceType === 'web') {
              return (
                <div
                  key={item.id}
                  className="group relative apple-liquid-glass p-5 sm:p-6 transition-all duration-200 hover:border-white/30 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/15">
                        <BookOpen className="w-3 h-3" />
                        Wikipedia
                      </span>
                      <span className="text-xs text-white/50 font-medium">Encyclopedic Corpus</span>
                    </div>

                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                      {item.relevanceScore}% Match
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                    {item.snippet}
                  </p>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-white/40">
                      Verified Knowledge Corpus
                    </span>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="apple-glass-button inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-colors"
                      >
                        <span>Open Wikipedia Article</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            }

            if (item.sourceType === 'academic') {
              return (
                <div
                  key={item.id}
                  className="group relative apple-liquid-glass p-5 sm:p-6 transition-all duration-200 hover:border-white/30 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/15">
                        <GraduationCap className="w-3 h-3" />
                        Academic Paper
                      </span>
                      {item.year && (
                        <span className="text-xs text-white/50 font-medium">• {item.year}</span>
                      )}
                    </div>

                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                      {item.relevanceScore}% Score
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                    {item.authors && item.authors.length > 0 && (
                      <span>Authors: {item.authors.join(', ')}</span>
                    )}
                    {item.journal && <span className="italic">• {item.journal}</span>}
                  </div>

                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                    {item.snippet}
                  </p>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-white/40">
                      {item.doi ? `DOI: ${item.doi}` : 'Peer-Reviewed Literature'}
                    </span>

                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="apple-glass-button inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-colors"
                      >
                        <span>View Publication</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      )}
    </div>
  );
};
