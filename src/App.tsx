import React, { useEffect, useState } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { AboutIRLab } from './components/AboutIRLab';
import { DocumentReaderModal } from './components/DocumentReaderModal';
import { IRExplainModal } from './components/IRExplainModal';
import { Navbar } from './components/Navbar';
import { ResultsList } from './components/ResultsList';
import { SearchBar } from './components/SearchBar';
import { StudyNotesView } from './components/StudyNotesView';
import { UploadModal } from './components/UploadModal';
import {
  executeSearchApi,
  fetchDocumentByIdApi,
  fetchDocumentsApi,
  generateStudyNotesApi,
} from './services/api';
import { DocumentItem, IRBreakdown, SearchResponse, StudyNotes } from './types';

export default function App() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'notes' | 'irlab'>('search');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null);

  // Study Notes state
  const [studyNotes, setStudyNotes] = useState<StudyNotes | null>(null);
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);
  const [activeTopic, setActiveTopic] = useState('');

  // Documents state
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [activeReadingDoc, setActiveReadingDoc] = useState<DocumentItem | null>(null);

  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [explainModalData, setExplainModalData] = useState<{
    breakdown: IRBreakdown;
    title: string;
  } | null>(null);

  // Load initial documents
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const data = await fetchDocumentsApi();
      setDocuments(data);
    } catch (err) {
      console.warn('Failed to load documents:', err);
    }
  };

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setActiveTab('search');

    try {
      const data = await executeSearchApi(searchQuery.trim());
      setSearchResponse(data);
      setActiveTopic(searchQuery.trim());
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleGenerateStudyNotes = async (topic: string) => {
    if (!topic.trim()) return;
    setIsGeneratingNotes(true);
    setActiveTopic(topic);

    try {
      const notesData = await generateStudyNotesApi(topic, searchResponse?.results || []);
      setStudyNotes(notesData);
      setActiveTab('notes');
    } catch (err) {
      console.error('Study notes generation failed:', err);
    } finally {
      setIsGeneratingNotes(false);
    }
  };

  const handleViewDocument = async (docId: string) => {
    try {
      const doc = await fetchDocumentByIdApi(docId);
      if (doc) {
        setActiveReadingDoc(doc);
      }
    } catch (err) {
      console.error('Failed to load document content:', err);
    }
  };

  // Determining whether the user is actively viewing a course
  const isViewingCourse = Boolean(searchResponse) || activeTab === 'notes';

  return (
    <div className="min-h-screen flex flex-col bg-[#090c12] text-white antialiased selection:bg-white selection:text-black relative">
      {/* Apple iOS Wallpaper Ambient Backdrop */}
      <div className="apple-ios-wallpaper">
        <div className="apple-wallpaper-rings"></div>
      </div>

      {/* Liquid Glass Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenUpload={() => setIsUploadOpen(true)}
        hasActiveNotes={Boolean(studyNotes)}
        activeTopic={activeTopic}
        isViewingCourse={isViewingCourse}
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        isSearching={isSearching}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* VIEW 1: SEARCH TAB */}
        {activeTab === 'search' && (
          <div className="space-y-8">
            {/* If no search has been executed, display clean minimalist Hero with search in the middle of screen */}
            {!searchResponse ? (
              <div className="max-w-2xl mx-auto text-center space-y-7 pt-12 sm:pt-24">
                {/* Brand Hero */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full apple-liquid-pill text-white/90 text-xs font-mono font-medium apple-glass-refract">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Information Retrieval & Academic Synthesis</span>
                  </div>
                  <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md">
                    EduSearch
                  </h1>
                  <p className="text-sm sm:text-base text-white/70 font-normal max-w-md mx-auto leading-relaxed">
                    Search any course notes, authoritative textbooks, and academic papers with instantaneous relevance.
                  </p>
                </div>

                {/* Search Bar in Middle of Screen */}
                <SearchBar
                  query={query}
                  setQuery={setQuery}
                  onSearch={handleSearch}
                  isLoading={isSearching}
                  variant="hero"
                />

                {/* Subtle Collection Indicator */}
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full apple-liquid-pill text-xs text-white/75">
                    <BookOpen className="w-3.5 h-3.5 text-white" />
                    <span>{documents.length} Course Documents Indexed</span>
                  </div>
                </div>
              </div>
            ) : (
              /* RESULTS VIEW: Search bar is now available at top in the sticky header */
              <div className="space-y-6">
                <ResultsList
                  query={searchResponse.query}
                  results={searchResponse.results}
                  retrievalTimeMs={searchResponse.retrievalTimeMs}
                  localCount={searchResponse.localResultsCount}
                  webCount={searchResponse.webResultsCount}
                  academicCount={searchResponse.academicResultsCount}
                  onGenerateStudyNotes={handleGenerateStudyNotes}
                  isGeneratingNotes={isGeneratingNotes}
                  onViewDocument={handleViewDocument}
                  onExplainIR={(breakdown, title) => setExplainModalData({ breakdown, title })}
                />
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: STUDY NOTES TAB (VIEW-ONLY DETAILED STUDY) */}
        {activeTab === 'notes' && studyNotes && (
          <StudyNotesView
            notes={studyNotes}
            onBackToSearch={() => setActiveTab('search')}
            onExploreSuggestion={(suggestionTopic) => {
              setQuery(suggestionTopic);
              handleSearch(suggestionTopic);
            }}
          />
        )}

        {/* VIEW 3: IR PIPELINE & ACADEMIC VIVA LAB TAB */}
        {activeTab === 'irlab' && <AboutIRLab />}
      </main>

      {/* MODALS */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadSuccess={(newDoc) => {
          setDocuments((prev) => [newDoc, ...prev]);
        }}
      />

      <DocumentReaderModal
        document={activeReadingDoc}
        searchTerms={searchResponse?.queryProcessed?.tokens || []}
        onClose={() => setActiveReadingDoc(null)}
      />

      <IRExplainModal
        breakdown={explainModalData?.breakdown || null}
        docTitle={explainModalData?.title || ''}
        onClose={() => setExplainModalData(null)}
      />
    </div>
  );
}
