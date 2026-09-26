import React from 'react';
import { ArrowLeft, Calendar, Hash, Tag, X } from 'lucide-react';
import { DocumentItem } from '../types';

interface DocumentReaderModalProps {
  document: DocumentItem | null;
  searchTerms?: string[];
  onClose: () => void;
}

export const DocumentReaderModal: React.FC<DocumentReaderModalProps> = ({
  document,
  searchTerms = [],
  onClose,
}) => {
  if (!document) return null;

  // Highlight matched terms if search terms are provided
  const renderHighlightedText = (content: string) => {
    if (!searchTerms || searchTerms.length === 0) {
      return content;
    }

    // Filter out short terms
    const terms = searchTerms.filter((t) => t.length > 2);
    if (terms.length === 0) return content;

    const regex = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = content.split(regex);

    return parts.map((part, i) => {
      const isMatch = terms.some((t) => t.toLowerCase() === part.toLowerCase());
      if (isMatch) {
        return (
          <mark
            key={i}
            className="bg-white text-black px-1 py-0.5 rounded-md font-semibold"
          >
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xl">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col apple-liquid-glass p-6 sm:p-7 text-white space-y-4">
        {/* Header Actions */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Results</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metadata Bar */}
        <div className="space-y-2 shrink-0">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/15 font-mono font-semibold flex items-center gap-1">
              <Tag className="w-3 h-3 text-amber-400" />
              {document.subject}
            </span>
            <span className="text-white/60 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {document.uploadDate}
            </span>
            <span className="text-white/60 flex items-center gap-1 font-mono">
              <Hash className="w-3.5 h-3.5" />
              {document.wordCount} words
            </span>
            {document.isSeed && (
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/15 font-medium">
                Standard Course Note
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-xs">
            {document.title}
          </h2>

          <p className="text-xs font-mono text-white/40">
            Source File: {document.filename}
          </p>
        </div>

        {/* Document Content with term highlights */}
        <div className="flex-1 overflow-y-auto p-5 rounded-2xl bg-black/40 border border-white/10 font-mono text-xs sm:text-sm leading-relaxed text-white/85 whitespace-pre-wrap">
          {renderHighlightedText(document.text)}
        </div>
      </div>
    </div>
  );
};
