import { DocumentItem, SearchResponse, StudyNotes } from '../types';
import {
  clientInvertedIndex,
  generateStudyNotesClient,
  searchAllSourcesClient,
} from './clientIR';

export async function fetchDocumentsApi(): Promise<DocumentItem[]> {
  try {
    const res = await fetch('/api/documents');
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    }
  } catch (err) {
    console.warn('Backend documents API unavailable, using in-browser collection:', err);
  }
  return clientInvertedIndex.getAllDocuments();
}

export async function fetchDocumentByIdApi(docId: string): Promise<DocumentItem | null> {
  try {
    const res = await fetch(`/api/documents/${docId}`);
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        return await res.json();
      }
    }
  } catch (err) {
    console.warn('Backend document detail API unavailable, looking up in-browser:', err);
  }
  return clientInvertedIndex.getDocument(docId) || null;
}

export async function executeSearchApi(query: string): Promise<SearchResponse> {
  const trimmed = query.trim();
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data: SearchResponse = await res.json();
        if (data && Array.isArray(data.results)) {
          return data;
        }
      }
    }
  } catch (err) {
    console.warn('Server search API unavailable, executing client IR pipeline:', err);
  }

  // Graceful client-side fallback
  return searchAllSourcesClient(trimmed);
}

export async function generateStudyNotesApi(
  topic: string,
  results: any[] = []
): Promise<StudyNotes> {
  const trimmed = topic.trim();
  try {
    const res = await fetch('/api/study-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: trimmed,
        results,
      }),
    });

    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data: StudyNotes = await res.json();
        if (data && data.keyConcepts) {
          return data;
        }
      }
    }
  } catch (err) {
    console.warn('Server study notes API unavailable, using client synthesis:', err);
  }

  // Client-side synthesis fallback
  return generateStudyNotesClient(trimmed, results);
}

export async function uploadDocumentApi(doc: {
  title: string;
  subject: string;
  filename?: string;
  text: string;
}): Promise<DocumentItem> {
  const cleanText = doc.text.replace(/\s+/g, ' ').trim();
  const wordCount = cleanText.split(/\s+/).length;
  const newDocId = `doc-user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  const newDoc: DocumentItem = {
    id: newDocId,
    title: doc.title.trim(),
    subject: doc.subject.trim() || 'General Computer Science',
    filename: doc.filename || 'uploaded_notes.txt',
    uploadDate: new Date().toISOString().split('T')[0],
    text: cleanText,
    wordCount,
    isSeed: false,
  };

  // Always index into client memory & localStorage first for 100% instant reliability
  clientInvertedIndex.indexDocument(newDoc, true);

  // Also attempt to notify server if reachable
  try {
    fetch('/api/documents/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newDoc.title,
        subject: newDoc.subject,
        filename: newDoc.filename,
        text: newDoc.text,
      }),
    }).catch(() => {});
  } catch {}

  return newDoc;
}
