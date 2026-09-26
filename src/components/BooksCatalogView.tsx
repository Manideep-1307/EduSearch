import React, { useState } from 'react';
import {
  Bookmark,
  BookMarked,
  BookOpen,
  ExternalLink,
  GraduationCap,
  Library,
  Search,
  Sparkles,
} from 'lucide-react';
import { FAMOUS_BOOKS_DATABASE } from '../../server/notes/famousBooksData';
import { RecommendedBook } from '../types';

interface BooksCatalogViewProps {
  onSearchCourse: (courseTopic: string) => void;
}

export const BooksCatalogView: React.FC<BooksCatalogViewProps> = ({ onSearchCourse }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const categories = ['All', ...Array.from(new Set(FAMOUS_BOOKS_DATABASE.map((c) => c.category)))];

  const filteredCatalogs = FAMOUS_BOOKS_DATABASE.filter((cat) => {
    if (selectedCategory !== 'All' && cat.category !== selectedCategory) {
      return false;
    }
    if (!filterQuery.trim()) return true;

    const q = filterQuery.toLowerCase();
    const subjectMatch = cat.subject.toLowerCase().includes(q);
    const bookMatch = cat.books.some(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        (b.famousAlias && b.famousAlias.toLowerCase().includes(q)) ||
        b.whyRecommended.toLowerCase().includes(q) ||
        b.keyChaptersToStudy.toLowerCase().includes(q)
    );
    return subjectMatch || bookMatch;
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-7 pb-24 text-slate-900 dark:text-slate-100">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                <BookMarked className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Famous & Recommended Textbooks Catalog
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Authoritative literature and standard reference books universally recommended by university professors, semester toppers, and competitive exam aspirants across sciences, medicine, economics, law, engineering, and humanities.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Standard Curriculum</span>
            </span>
          </div>
        </div>

        {/* Search within books */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search famous books by title, author, or nickname (e.g. Dinosaur, CLRS, Dragon, Tanenbaum)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Book Catalog Sections grouped by Subject */}
      <div className="space-y-8">
        {filteredCatalogs.map((section) => (
          <div key={section.subject} className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {section.subject}
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {section.category}
                </span>
              </div>

              <button
                onClick={() => onSearchCourse(section.subject)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 transition-colors cursor-pointer"
                title={`Generate full study notes for ${section.subject}`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Search & Study Course</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.books.map((book, bIdx) => (
                <div
                  key={bIdx}
                  className="flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-amber-400/60 dark:hover:border-amber-500/60 transition-all shadow-xs group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {book.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                          {book.author} {book.editionOrYear && `• ${book.editionOrYear}`}
                        </p>
                      </div>
                    </div>

                    {book.famousAlias && (
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60 text-xs font-semibold">
                        <Bookmark className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>{book.famousAlias}</span>
                      </div>
                    )}

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Why Essential: </span>
                      {book.whyRecommended}
                    </p>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 text-xs">
                      <span className="font-semibold text-amber-700 dark:text-amber-400 block mb-0.5">
                        High-Yield Chapters:
                      </span>
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed block">
                        {book.keyChaptersToStudy}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 font-medium">
                      {book.difficultyLevel || 'Standard Core'}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={book.searchUrl || `https://www.google.com/search?q=${encodeURIComponent(book.title + ' ' + book.author)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-slate-700 dark:text-slate-200 hover:text-amber-700 dark:hover:text-amber-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
                        title="Search book on Google Books or publisher"
                      >
                        <span>Find Book</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredCatalogs.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <BookMarked className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">
              No matching books found for "{filterQuery}"
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try searching by author name (e.g. Silberschatz, Tanenbaum, Cormen) or nickname (e.g. Dinosaur, Dragon).
            </p>
            <button
              onClick={() => {
                setFilterQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2 px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
