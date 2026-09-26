import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  FileUp,
  FolderOpen,
  Hash,
  Search,
  Tag,
  Trash2,
} from 'lucide-react';
import { DocumentItem } from '../types';

interface CollectionManagerProps {
  documents: DocumentItem[];
  onOpenUpload: () => void;
  onViewDocument: (docId: string) => void;
  onDeleteDocument: (docId: string) => void;
}

export const CollectionManager: React.FC<CollectionManagerProps> = ({
  documents,
  onOpenUpload,
  onViewDocument,
  onDeleteDocument,
}) => {
  const [filterSubject, setFilterSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique subjects
  const subjects = ['All', ...Array.from(new Set(documents.map((d) => d.subject)))];

  const filteredDocs = documents.filter((doc) => {
    const matchesSubject = filterSubject === 'All' || doc.subject === filterSubject;
    const matchesSearch =
      !searchQuery.trim() ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Educational Document Collection
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {documents.length} educational documents indexed in the local Information Retrieval pipeline.
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-semibold shadow-xs hover:opacity-95 active:scale-97 transition-all cursor-pointer select-none self-start sm:self-auto"
        >
          <FileUp className="w-4 h-4" />
          <span>Upload PDF / TXT</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Subject Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setFilterSubject(sub)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                filterSubject === sub
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xs font-semibold'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Search input in collection */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter collection..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocs.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-2xs">
          <FolderOpen className="w-10 h-10 mx-auto text-slate-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No documents match your filter</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Try adjusting your search query or upload a new educational document.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="group relative rounded-3xl p-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold">
                    <Tag className="w-3 h-3" />
                    {doc.subject}
                  </span>

                  <div className="flex items-center gap-2">
                    {doc.isSeed ? (
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 border border-sky-200 dark:border-sky-800 font-medium">
                        Core Seed
                      </span>
                    ) : (
                      <button
                        onClick={() => onDeleteDocument(doc.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                        title="Delete Document"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {doc.text}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Hash className="w-3 h-3" />
                  {doc.wordCount} words
                </span>

                <button
                  onClick={() => onViewDocument(doc.id)}
                  className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 transition-colors cursor-pointer"
                >
                  Read Document →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
