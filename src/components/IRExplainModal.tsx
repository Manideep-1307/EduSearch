import React from 'react';
import { Calculator, CheckCircle2, Sparkles, X } from 'lucide-react';
import { IRBreakdown } from '../types';

interface IRExplainModalProps {
  breakdown: IRBreakdown | null;
  docTitle: string;
  onClose: () => void;
}

export const IRExplainModal: React.FC<IRExplainModalProps> = ({
  breakdown,
  docTitle,
  onClose,
}) => {
  if (!breakdown) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xl">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto apple-liquid-glass p-6 sm:p-7 text-white space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close explanation"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/90 font-bold">
                IR Explainability Engine
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/15 font-mono font-bold">
                {breakdown.finalRelevanceScore}% Match
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-0.5 line-clamp-1">
              {docTitle}
            </h3>
            <p className="text-xs text-white/60">
              Transparent Information Retrieval mathematical scoring breakdown for academic evaluation.
            </p>
          </div>
        </div>

        {/* Pipeline Step 1: Preprocessing */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-xs font-mono uppercase tracking-wider text-white/90 mb-2.5 flex items-center gap-1.5 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            1. Query Text Preprocessing Pipeline
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-white/50 block text-[11px] mb-1">
                Raw Query Tokens:
              </span>
              <div className="flex flex-wrap gap-1">
                {breakdown.queryTokens.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-white/10 text-white font-mono text-[11px] border border-white/15"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-white/50 block text-[11px] mb-1">
                Porter Stems:
              </span>
              <div className="flex flex-wrap gap-1">
                {breakdown.stemmedTokens.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-white/10 text-white font-mono text-[11px] border border-white/15"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-white/50 block text-[11px] mb-1">
                Matched Terms in Doc:
              </span>
              <div className="flex flex-wrap gap-1">
                {breakdown.matchedTokens.length > 0 ? (
                  breakdown.matchedTokens.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white text-black font-mono text-[11px] font-semibold"
                    >
                      {m}
                    </span>
                  ))
                ) : (
                  <span className="text-white/40">None</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline Step 2: Scoring Metrics Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-white/50 font-medium block">Cosine Similarity</span>
            <div className="text-lg font-bold font-mono text-white mt-0.5">
              {breakdown.cosineSimilarity}
            </div>
            <span className="text-[10px] text-white/40 block">Vector angle norm</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-white/50 font-medium block">Okapi BM25 Score</span>
            <div className="text-lg font-bold font-mono text-white mt-0.5">
              {breakdown.bm25Score}
            </div>
            <span className="text-[10px] text-white/40 block">k1=1.5, b=0.75</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-white/50 font-medium block">TF-IDF Dot Product</span>
            <div className="text-lg font-bold font-mono text-white mt-0.5">
              {breakdown.tfidfScore}
            </div>
            <span className="text-[10px] text-white/40 block">Weighted vector sum</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-white/50 font-medium block">Doc Length / Avg</span>
            <div className="text-lg font-bold font-mono text-white mt-0.5">
              {breakdown.docLength} <span className="text-xs text-white/40 font-normal">/ {breakdown.avgDocLength}</span>
            </div>
            <span className="text-[10px] text-white/40 block">Length factor</span>
          </div>
        </div>

        {/* Pipeline Step 3: Token Weights Breakdown Table */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-2 flex items-center justify-between font-semibold">
            <span>2. Inverted Index Token Analysis</span>
            <span className="text-[11px] text-white/40 normal-case">
              Term Frequency & Inverted Document Frequency
            </span>
          </h4>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-white/10 text-white/60 bg-white/5">
                <tr>
                  <th className="p-2.5">Token / Stem</th>
                  <th className="p-2.5">Doc TF</th>
                  <th className="p-2.5">IDF</th>
                  <th className="p-2.5">TF-IDF Weight</th>
                  <th className="p-2.5">BM25 Gain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {breakdown.tokenWeights.map((row, idx) => (
                  <tr
                    key={idx}
                    className={row.tf > 0 ? 'bg-white/5 text-white' : 'text-white/40'}
                  >
                    <td className="p-2.5 font-semibold flex items-center gap-1.5">
                      {row.tf > 0 && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
                      {row.token}
                    </td>
                    <td className="p-2.5">{row.tf}</td>
                    <td className="p-2.5">{row.idf}</td>
                    <td className="p-2.5 font-bold text-white">{row.tfidf}</td>
                    <td className="p-2.5 text-white">{row.bm25Contribution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mathematical Formulas Box */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono space-y-2">
          <div className="flex items-center gap-1.5 text-white font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Mathematical Ranking Formulation:</span>
          </div>
          <p className="text-white/70">
            • <strong className="text-white">TF-IDF:</strong> w(t, d) = (1 + ln(tf(t, d))) × ln(1 + N / (nt + 0.5))
          </p>
          <p className="text-white/70">
            • <strong className="text-white">Cosine Sim:</strong> Cosine(q, d) = (q · d) / (||q|| × ||d||)
          </p>
          <p className="text-white/70">
            • <strong className="text-white">Okapi BM25:</strong> Score = ∑ IDF × [tf × (k1 + 1)] / [tf + k1 × (1 - b + b × (|d| / avgdl))]
          </p>
          <p className="text-white/50 text-[11px] pt-1 border-t border-white/10">
            {breakdown.explanation}
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="apple-glass-button px-5 py-2 rounded-full text-white text-xs font-semibold transition-all cursor-pointer select-none"
          >
            Close Explanation
          </button>
        </div>
      </div>
    </div>
  );
};
