import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookMarked,
  BookOpen,
  Check,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  GraduationCap,
  Lightbulb,
  Printer,
  Sparkles,
  Zap,
} from 'lucide-react';
import { StudyNotes } from '../types';

interface StudyNotesViewProps {
  notes: StudyNotes;
  onBackToSearch: () => void;
  onExploreSuggestion?: (topic: string) => void;
}

export const StudyNotesView: React.FC<StudyNotesViewProps> = ({
  notes,
  onBackToSearch,
  onExploreSuggestion,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `# Study Notes: ${notes.topic}
Generated: ${new Date(notes.generatedAt).toLocaleDateString()}

## Academic Overview
${notes.overview.summary}

## Relevant Concepts
${notes.keyConcepts
  .map(
    (c, i) => `### ${i + 1}. ${c.title}
${c.explanation}
${c.keyFormulaOrPrinciple ? `Principle/Formula: ${c.keyFormulaOrPrinciple}` : ''}
${c.deepStudyPoints && c.deepStudyPoints.length > 0 ? c.deepStudyPoints.map((p) => `- ${p}`).join('\n') : ''}
${c.realWorldApplication ? `Real-World Application: ${c.realWorldApplication}` : ''}
${c.examInsight ? `Exam Takeaway: ${c.examInsight}` : ''}`
  )
  .join('\n\n')}

## Recommended Famous Textbooks
${(notes.recommendedBooks || [])
  .map(
    (b) => `### ${b.title} by ${b.author} ${b.famousAlias ? `(${b.famousAlias})` : ''}
- Why: ${b.whyRecommended}
- Key Chapters: ${b.keyChaptersToStudy}`
  )
  .join('\n\n')}

## Related Suggestions to Explore
${(notes.relatedSuggestions || []).map((s) => `- ${s}`).join('\n')}

## High-Yield Revision Points
${(notes.quickRevision || []).map((r) => `- ${r}`).join('\n')}
`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const markdown = `# Study Notes: ${notes.topic}
*Generated on ${new Date(notes.generatedAt).toLocaleDateString()} | ${
      notes.isAiGenerated ? 'Gemini 3.8-Flash Fast Synthesis' : 'Instant Academic Synthesis'
    } (${notes.generationTimeMs || '<100'}ms)*

---

## 1. Academic Overview
${notes.overview.summary}
*Source: ${notes.overview.sourceType}*

---

## 2. Core Relevant Concepts
${notes.keyConcepts
  .map(
    (c, i) => `### 2.${i + 1} ${c.title}
${c.explanation}

${c.keyFormulaOrPrinciple ? `**Key Principle / Formula:** \`${c.keyFormulaOrPrinciple}\`\n` : ''}
${
  c.deepStudyPoints && c.deepStudyPoints.length > 0
    ? `**Deep Study Mechanics:**\n${c.deepStudyPoints.map((p) => `- ${p}`).join('\n')}\n`
    : ''
}
${c.realWorldApplication ? `**Real-World System Implementation:** ${c.realWorldApplication}\n` : ''}
${c.examInsight ? `**Exam & Viva Takeaway:** ${c.examInsight}\n` : ''}`
  )
  .join('\n\n')}

---

## 3. Related Topics & Next Study Suggestions
${(notes.relatedSuggestions || []).map((s) => `- ${s}`).join('\n')}

---

## 4. High-Yield Revision Points
${(notes.quickRevision || []).map((r) => `- ${r}`).join('\n')}

---

## 5. Recommended Famous Textbooks
${(notes.recommendedBooks || [])
  .map(
    (b) => `### ${b.title} by ${b.author} ${b.famousAlias ? `(${b.famousAlias})` : ''}
- **Why Essential:** ${b.whyRecommended}
- **Target Chapters:** ${b.keyChaptersToStudy}
`
  )
  .join('\n')}
`;

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `StudyNotes-${notes.topic.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20 text-white">
      {/* Top Navigation & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <button
          onClick={onBackToSearch}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search Results</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="apple-glass-button inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="apple-glass-button inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Markdown</span>
          </button>

          <button
            onClick={handlePrint}
            className="apple-glass-button inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Sheet</span>
          </button>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="apple-liquid-glass p-6 sm:p-8 space-y-3 apple-glass-refract">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/25">
              <Zap className="w-3 h-3" />
              <span>Instant Synthesis</span>
            </span>
            {notes.generationTimeMs !== undefined && (
              <span className="text-[11px] font-mono text-white/50">
                {notes.generationTimeMs}ms
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-white/60 font-medium">
            <BookOpen className="w-3.5 h-3.5 text-white" />
            <span>Detailed Academic Study Guide</span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-sm">
            {notes.topic}
          </h1>
          <p className="text-xs sm:text-sm text-white/70 mt-1">
            Focusing exclusively on core concepts, deep mechanics, textbook literature, and revision takeaways.
          </p>
        </div>
      </div>

      {/* SECTION 1: ACADEMIC OVERVIEW */}
      <div className="apple-liquid-glass p-6 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/80">
            01 · Academic Overview
          </span>
          <span className="text-[11px] text-white/50">{notes.overview.sourceType}</span>
        </div>
        <p className="text-base sm:text-lg text-white leading-relaxed font-normal">
          {notes.overview.summary}
        </p>
      </div>

      {/* SECTION 2: RELEVANT CONCEPTS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/60">
            02 · Relevant Core Concepts ({notes.keyConcepts.length})
          </span>
          <span className="text-xs text-white/50 font-medium">Detailed Syllabus Breakdown</span>
        </div>

        {notes.keyConcepts.map((concept, idx) => (
          <div
            key={idx}
            className="apple-liquid-glass p-6 sm:p-7 space-y-4 hover:border-white/30 transition-all"
          >
            {/* Concept Header */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-white/90 px-2 py-0.5 rounded-md bg-white/10 border border-white/15 inline-block">
                Concept 0{idx + 1}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {concept.title}
              </h2>
            </div>

            {/* In-depth Explanation */}
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              {concept.explanation}
            </p>

            {/* Formula / Governing Principle */}
            {concept.keyFormulaOrPrinciple && (
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs text-white flex items-start gap-2.5">
                <span className="font-semibold text-white/50 select-none">Invariant:</span>
                <code className="font-semibold text-amber-300">{concept.keyFormulaOrPrinciple}</code>
              </div>
            )}

            {/* Deep Study Points */}
            {concept.deepStudyPoints && concept.deepStudyPoints.length > 0 && (
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white/60">
                  Detailed Operational Mechanics:
                </h4>
                <ul className="space-y-1.5">
                  {concept.deepStudyPoints.map((point, pIdx) => (
                    <li
                      key={pIdx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-white/75 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Real World System Implementation */}
            {concept.realWorldApplication && (
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white">
                <span className="font-semibold block mb-0.5 font-mono text-white/60">
                  Real-World System Implementation:
                </span>
                <p className="leading-relaxed text-white/80">{concept.realWorldApplication}</p>
              </div>
            )}

            {/* Exam Takeaway */}
            {(concept.examInsight || concept.keyTakeaway) && (
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold font-mono text-white block mb-0.5">
                    Exam & Viva High-Yield Takeaway:
                  </span>
                  <p className="leading-relaxed text-white/80">{concept.examInsight || concept.keyTakeaway}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* SECTION 3: RELATED SUGGESTIONS */}
      {notes.relatedSuggestions && notes.relatedSuggestions.length > 0 && (
        <div className="apple-liquid-glass p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>03 · Related Concepts to Study Next</span>
            </span>
            <span className="text-xs text-white/50 font-medium">Connected syllabus topics</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {notes.relatedSuggestions.map((suggestion, sIdx) => (
              <button
                key={sIdx}
                onClick={() => onExploreSuggestion && onExploreSuggestion(suggestion)}
                className="group p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 flex items-center justify-between text-left transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5 pr-2">
                  <span className="w-6 h-6 rounded-lg bg-white/10 text-white text-[11px] font-mono font-semibold flex items-center justify-center shrink-0">
                    {sIdx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white group-hover:text-white transition-colors">
                    {suggestion}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: HIGH-YIELD EXAM REVISION */}
      {notes.quickRevision && notes.quickRevision.length > 0 && (
        <div className="apple-liquid-glass p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-white" />
              <span>04 · High-Yield Exam Revision Points</span>
            </span>
            <span className="text-xs text-white/50 font-medium">Quick revision sheet</span>
          </div>

          <div className="space-y-2.5">
            {notes.quickRevision.map((point, rIdx) => (
              <div
                key={rIdx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10"
              >
                <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: RECOMMENDED FAMOUS & GOOD BOOKS */}
      <div className="apple-liquid-glass p-6 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <BookMarked className="w-4 h-4" />
              <span>05 · Recommended Famous Textbooks & Authoritative Literature</span>
            </span>
            <p className="text-xs text-white/60 mt-0.5">
              Standard university syllabus references and exam master books for deep study of {notes.topic}.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/15 w-fit">
            Academic Benchmark
          </span>
        </div>

        {notes.recommendedBooks && notes.recommendedBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.recommendedBooks.map((book, bIdx) => (
              <div
                key={bIdx}
                className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold text-white leading-snug group-hover:text-white transition-colors">
                        {book.title}
                      </h4>
                      <p className="text-xs text-white/60 font-medium">
                        {book.author} {book.editionOrYear && `• ${book.editionOrYear}`}
                      </p>
                    </div>
                  </div>

                  {book.famousAlias && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-white text-xs font-semibold border border-white/15">
                      <Bookmark className="w-3 h-3 text-white shrink-0" />
                      <span>{book.famousAlias}</span>
                    </div>
                  )}

                  <div className="text-xs text-white/70 leading-relaxed">
                    <span className="font-semibold text-white">Why Essential: </span>
                    {book.whyRecommended}
                  </div>

                  {book.keyChaptersToStudy && (
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                      <span className="font-semibold text-white block mb-0.5">
                        Targeted Chapters to Study:
                      </span>
                      <span className="text-[11px] text-white/70 leading-relaxed block">
                        {book.keyChaptersToStudy}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-white/50 font-medium">
                    {book.difficultyLevel || 'Standard Core'}
                  </span>

                  <a
                    href={book.searchUrl || `https://www.google.com/search?q=${encodeURIComponent(book.title + ' ' + book.author)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="apple-glass-button inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium transition-all cursor-pointer select-none"
                  >
                    <span>Find Book</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-white/5 text-xs text-white/60 text-center">
            Standard university textbooks matching "{notes.topic}" will be linked here.
          </div>
        )}

        {/* Traceable Citations */}
        {notes.sources && notes.sources.length > 0 && (
          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs text-white/60">
            <span className="font-medium text-white/50">Indexed Sources:</span>
            {notes.sources.map((src, srcIdx) => (
              <a
                key={srcIdx}
                href={src.url || '#'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
              >
                <span>[{src.type}] {src.title}</span>
                {src.url && <ExternalLink className="w-2.5 h-2.5 text-white/50" />}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
