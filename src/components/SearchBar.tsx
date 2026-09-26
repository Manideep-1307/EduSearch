import React, { useEffect, useRef, useState } from 'react';
import { Command, Loader2, Search, X } from 'lucide-react';
import { motion } from 'motion/react';

interface SearchBarProps {
  query: string;
  setQuery: (q: string) => void;
  onSearch: (q: string) => void;
  isLoading: boolean;
  variant?: 'hero' | 'compact' | 'nav';
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  onSearch,
  isLoading,
  variant = 'hero',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Keyboard shortcut: '/' or 'Cmd+K' focuses input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' && document.activeElement !== inputRef.current) ||
        ((e.metaKey || e.ctrlKey) && e.key === 'k')
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const isHero = variant === 'hero';
  const isNav = variant === 'nav';

  if (isNav) {
    return (
      <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
        <div
          className={`flex items-center h-10 px-3 rounded-full transition-all duration-200 apple-liquid-pill ${
            isFocused
              ? 'ring-2 ring-white/30 border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
              : 'hover:border-white/30'
          }`}
        >
          <div className="text-white/60 mr-2 shrink-0">
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Search className="w-4 h-4 text-white/60" />
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search any course..."
            className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none text-xs sm:text-sm font-medium"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors mr-1 cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="shrink-0 px-3 py-1 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
          >
            Search
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className={`w-full ${isHero ? 'max-w-2xl mx-auto' : 'max-w-3xl mx-auto'}`}>
      <motion.form
        initial={isHero ? { scale: 0.98, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        onSubmit={handleSubmit}
        className="relative"
      >
        <div
          className={`relative flex items-center transition-all duration-200 apple-liquid-pill ${
            isHero ? 'p-2 sm:p-2.5 rounded-full' : 'p-1.5 sm:p-2 rounded-full'
          } ${
            isFocused
              ? 'ring-2 ring-white/30 border-white/50 shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
              : 'hover:border-white/30'
          }`}
        >
          <div className="pl-3 sm:pl-4 text-white/60">
            {isLoading ? (
              <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-white" />
            ) : (
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white/60 group-hover:text-white transition-colors" />
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search any course, syllabus, or concept..."
            className={`w-full bg-transparent text-white placeholder-white/40 focus:outline-none px-3 sm:px-4 ${
              isHero ? 'text-base sm:text-lg font-medium' : 'text-sm sm:text-base'
            }`}
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors mr-1 cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1 text-xs text-white/50 bg-white/10 border border-white/15 px-2.5 py-1 rounded-full font-mono mr-2 select-none">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>

          {/* Tactile Apple Luminous White Button */}
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className={`cursor-pointer px-6 rounded-full font-semibold transition-all select-none ${
              isHero ? 'py-3 text-sm sm:text-base' : 'py-2.5 text-sm'
            } ${
              query.trim() && !isLoading
                ? 'bg-white text-black hover:bg-white/90 shadow-[0_4px_20px_rgba(255,255,255,0.35)] active:scale-96'
                : 'bg-white/10 text-white/30 cursor-not-allowed border border-white/10'
            }`}
          >
            Search
          </button>
        </div>
      </motion.form>
    </div>
  );
};
