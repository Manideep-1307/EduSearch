import React from 'react';
import { BookOpen, Compass, FileUp, Sparkles } from 'lucide-react';
import { SearchBar } from './SearchBar';

interface NavbarProps {
  activeTab: 'search' | 'notes' | 'irlab';
  setActiveTab: (tab: 'search' | 'notes' | 'irlab') => void;
  onOpenUpload: () => void;
  hasActiveNotes: boolean;
  activeTopic?: string;
  isViewingCourse: boolean;
  query: string;
  setQuery: (q: string) => void;
  onSearch: (q: string) => void;
  isSearching: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenUpload,
  hasActiveNotes,
  activeTopic,
  isViewingCourse,
  query,
  setQuery,
  onSearch,
  isSearching,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-3xl bg-[#090c12]/60 border-b border-white/[0.12] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3">
        {/* Apple Brand Logo & Title */}
        <button
          onClick={() => setActiveTab('search')}
          className="flex items-center gap-2.5 shrink-0 group text-left cursor-pointer focus:outline-none select-none"
        >
          <div className="w-9 h-9 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-xs backdrop-blur-xl group-hover:scale-105 transition-all duration-200">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-base sm:text-lg tracking-tight text-white drop-shadow-xs">
              EduSearch
            </span>
            <span className="text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/15 font-semibold hidden sm:inline-block">
              IR Engine
            </span>
          </div>
        </button>

        {/* Dynamic Center Section:
            - If user is viewing any course: Show Liquid Glass Search Bar at top!
            - If user is on home screen: Show iOS Liquid Glass Segmented Tab Bar!
        */}
        <div className="flex-1 flex items-center justify-center max-w-xl">
          {isViewingCourse ? (
            <div className="w-full px-2">
              <SearchBar
                query={query}
                setQuery={setQuery}
                onSearch={onSearch}
                isLoading={isSearching}
                variant="nav"
              />
            </div>
          ) : (
            /* Apple iOS 18 Segmented Liquid Glass Tab Bar */
            <nav className="apple-glass-tab-bar flex items-center gap-1">
              <button
                onClick={() => setActiveTab('search')}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none ${
                  activeTab === 'search'
                    ? 'apple-glass-tab-active'
                    : 'apple-glass-tab-inactive'
                }`}
              >
                Search
              </button>

              {hasActiveNotes && (
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none ${
                    activeTab === 'notes'
                      ? 'apple-glass-tab-active'
                      : 'apple-glass-tab-inactive'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="max-w-[120px] truncate">{activeTopic || 'Study Notes'}</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('irlab')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none ${
                  activeTab === 'irlab'
                    ? 'apple-glass-tab-active'
                    : 'apple-glass-tab-inactive'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>IR Lab</span>
              </button>
            </nav>
          )}
        </div>

        {/* Right Section: Compact Liquid Glass Tabs (when viewing course) and Add Document */}
        <div className="flex items-center gap-2.5 shrink-0">
          {isViewingCourse && (
            <div className="hidden md:flex items-center apple-glass-tab-bar gap-1">
              <button
                onClick={() => setActiveTab('search')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'search'
                    ? 'apple-glass-tab-active'
                    : 'apple-glass-tab-inactive'
                }`}
              >
                Results
              </button>

              {hasActiveNotes && (
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    activeTab === 'notes'
                      ? 'apple-glass-tab-active'
                      : 'apple-glass-tab-inactive'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Notes</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('irlab')}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'irlab'
                    ? 'apple-glass-tab-active'
                    : 'apple-glass-tab-inactive'
                }`}
              >
                <Compass className="w-3 h-3" />
                <span>Lab</span>
              </button>
            </div>
          )}

          {/* Apple iOS Liquid Glass Button: Add Document */}
          <button
            onClick={onOpenUpload}
            className="apple-glass-button flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-xs font-semibold cursor-pointer select-none"
            title="Upload PDF or TXT Lecture Notes"
          >
            <FileUp className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">Add Document</span>
          </button>
        </div>
      </div>
    </header>
  );
};
