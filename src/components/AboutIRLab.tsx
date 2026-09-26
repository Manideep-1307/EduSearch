import React, { useState } from 'react';
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  Cpu,
  Database,
  GraduationCap,
  Layers,
  Search,
  Sliders,
  Sparkles,
  Terminal,
} from 'lucide-react';

const PIPELINE_STEPS = [
  {
    step: 1,
    title: 'Document Collection',
    desc: 'Ingests multi-source educational data: local PDF/TXT documents, Wikipedia API, and Crossref/OpenAlex scholarly works.',
    icon: Database,
  },
  {
    step: 2,
    title: 'Text Extraction & Preprocessing',
    desc: 'Lexical analysis parsing, alphanumeric regex tokenization, punctuation stripping, and lowercasing.',
    icon: Terminal,
  },
  {
    step: 3,
    title: 'Stop-word Elimination',
    desc: 'Filters out high-frequency functional words (the, is, at, which) using an educational stopword lexicon.',
    icon: Sliders,
  },
  {
    step: 4,
    title: 'Porter Stemming Algorithm',
    desc: 'Reduces morphological word inflections to their canonical root stem (e.g., "processing", "processes" -> "process").',
    icon: Cpu,
  },
  {
    step: 5,
    title: 'Inverted Index Construction',
    desc: 'Maps unique vocabulary terms to posting lists recording document IDs, term frequencies (TF), and offsets.',
    icon: Layers,
  },
  {
    step: 6,
    title: 'Multi-Source Retrieval & BM25 Scoring',
    desc: 'Queries inverted index and external knowledge endpoints concurrently with Okapi BM25 and TF-IDF calculation.',
    icon: Calculator,
  },
  {
    step: 7,
    title: 'Cosine Similarity & Ranking',
    desc: 'Evaluates vector angles in VSM space, normalizes relevance scores (0-100%), and presents ranked results.',
    icon: Search,
  },
  {
    step: 8,
    title: 'Intelligent Study Notes Synthesis',
    desc: 'Synthesizes multi-source facts into a rapid university revision guide highlighting key textbook literature.',
    icon: Sparkles,
  },
];

export const AboutIRLab: React.FC = () => {
  const [sandboxText, setSandboxText] = useState(
    'Operating systems manage computer processes and scheduling algorithms effectively.'
  );
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const runSandbox = () => {
    const rawTokens = sandboxText.toLowerCase().match(/[a-z0-9]+/g) || [];
    const stopWords = new Set([
      'and',
      'the',
      'is',
      'in',
      'at',
      'of',
      'a',
      'an',
      'to',
      'for',
      'with',
      'on',
      'as',
    ]);
    const filtered = rawTokens.filter((t) => t.length > 1 && !stopWords.has(t));
    return {
      rawTokens,
      filtered,
    };
  };

  const sandboxOutput = runSandbox();

  const VIVA_QUESTIONS = [
    {
      q: 'What is the purpose of an Inverted Index in Information Retrieval?',
      a: 'An Inverted Index is the foundational data structure of search engines. Instead of scanning every document sequentially (O(N) search), an inverted index maps each unique vocabulary word (term) to a posting list containing the list of document IDs where that term appears, along with its Term Frequency (TF) and positional offsets. This reduces lookup time to O(1) per term.',
    },
    {
      q: 'How does Okapi BM25 improve upon standard TF-IDF?',
      a: 'Standard TF-IDF assumes linear or logarithmic gain from term frequency without bounds. Okapi BM25 introduces non-linear asymptotic saturation controlled by parameter k1 (typically 1.2–2.0), meaning that after 5–10 occurrences, additional term repetitions contribute diminishing relevance. Furthermore, parameter b (typically 0.75) penalizes or rewards documents based on length relative to average document length (avgdl), preventing long documents from dominating results.',
    },
    {
      q: 'Why do we compute Cosine Similarity in the Vector Space Model?',
      a: 'Cosine Similarity measures the cosine of the angle between two vectors (the query vector and document vector) in a multi-dimensional term space. By dividing the dot product by the product of vector Euclidean norms (||q|| * ||d||), Cosine Similarity normalizes for document length, ensuring that a 10-page document does not score artificially higher than a 1-page document with the exact same topic density.',
    },
    {
      q: 'What is the Porter Stemmer algorithm and why is it used?',
      a: 'The Porter Stemmer is a rule-based algorithmic stemmer developed by Martin Porter in 1980. It applies sequential suffix-stripping rules organized into 5 steps to reduce inflected or derived words to their morphological root stem (e.g. "connecting", "connection", "connections" all reduce to "connect"). This increases retrieval recall by matching varying grammatical forms.',
    },
    {
      q: 'How does EduSearch combine multi-source retrieval?',
      a: 'EduSearch integrates three distinct tiers: 1) A Local Educational Collection indexed via custom Inverted Index with BM25 & Cosine similarity; 2) General Web Knowledge fetched through official Wikimedia APIs; 3) Scholarly Research fetched via Crossref and OpenAlex APIs. Results are presented with distinct source tags and deterministic relevance metrics.',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 pb-20 text-white">
      {/* Hero Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-semibold px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/25">
          Academic CSE Project
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-sm">
          Information Retrieval Pipeline
        </h1>
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
          EduSearch integrates classic Information Retrieval algorithms (Inverted Indexing, Okapi BM25, TF-IDF, Vector Space Model) with fast generative synthesis for university study notes.
        </p>
      </div>

      {/* End-to-End Pipeline Steps Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-white" />
          <span>8-Stage Retrieval Architecture</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {PIPELINE_STEPS.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.step}
                className="p-5 rounded-3xl apple-liquid-glass flex flex-col justify-between group hover:border-white/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-xs font-bold flex items-center justify-center">
                      0{step.step}
                    </span>
                    <IconComponent className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-sm text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/65 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Text Preprocessing Sandbox */}
      <div className="p-6 sm:p-7 rounded-3xl apple-liquid-glass space-y-4">
        <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm font-mono">
          <Terminal className="w-4 h-4" />
          <span>Interactive Preprocessing Sandbox (Live Tokenizer & Filter)</span>
        </div>
        <p className="text-xs text-white/70">
          Type or modify any sentence below to observe real-time tokenization, stop-word elimination, and vocabulary normalization:
        </p>

        <textarea
          rows={2}
          value={sandboxText}
          onChange={(e) => setSandboxText(e.target.value)}
          className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-xs sm:text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-xs font-mono font-semibold text-white/60 block">
              1. Extracted Tokens ({sandboxOutput.rawTokens.length}):
            </span>
            <div className="flex flex-wrap gap-1">
              {sandboxOutput.rawTokens.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-white/10 text-white font-mono text-xs border border-white/15"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-xs font-mono font-semibold text-white/60 block">
              2. Stopwords Removed ({sandboxOutput.filtered.length}):
            </span>
            <div className="flex flex-wrap gap-1">
              {sandboxOutput.filtered.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-mono text-xs border border-amber-400/30"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mathematical Formulas Section */}
      <div className="p-6 sm:p-7 rounded-3xl apple-liquid-glass space-y-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Calculator className="w-4 h-4 text-white" />
          <span>Core Mathematical Formulations</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h3 className="font-bold text-xs font-mono text-white">1. TF-IDF Weight</h3>
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 font-mono text-[11px] text-amber-300">
              w(t, d) = (1 + ln(tf)) × ln(1 + N / (nt + 0.5))
            </div>
            <p className="text-[11px] text-white/65 leading-relaxed">
              Balances local word frequency with collection-wide rarity to suppress uninformative terms.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h3 className="font-bold text-xs font-mono text-white">2. Vector Cosine Angle</h3>
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 font-mono text-[11px] text-amber-300">
              Cosine(q, d) = (q · d) / (||q|| × ||d||)
            </div>
            <p className="text-[11px] text-white/65 leading-relaxed">
              Measures directional similarity between query and document vectors, invariant to text volume.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h3 className="font-bold text-xs font-mono text-white">3. Okapi BM25 Score</h3>
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 font-mono text-[11px] text-amber-300">
              Score = ∑ IDF × [tf(k1+1)] / [tf + k1(1 - b + b·|d|/avgdl)]
            </div>
            <p className="text-[11px] text-white/65 leading-relaxed">
              Probabilistic term saturation with k1=1.5 and document length normalization b=0.75.
            </p>
          </div>
        </div>
      </div>

      {/* Academic Viva Examination Guide */}
      <div className="p-6 sm:p-7 rounded-3xl apple-liquid-glass space-y-4">
        <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm">
          <GraduationCap className="w-4 h-4 text-white" />
          <span>B.Tech CSE Project Viva Preparation Guide</span>
        </div>
        <p className="text-xs text-white/70">
          Answers to typical viva voce questions posed by university examiners for Information Retrieval projects:
        </p>

        <div className="space-y-2.5 pt-1">
          {VIVA_QUESTIONS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition-all"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-white hover:bg-white/10 cursor-pointer transition-colors"
              >
                <span>{item.q}</span>
                {expandedFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-white shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-white/50 shrink-0" />
                )}
              </button>
              {expandedFaq === idx && (
                <div className="p-4 pt-0 text-xs sm:text-sm text-white/80 border-t border-white/10 leading-relaxed bg-black/20">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
