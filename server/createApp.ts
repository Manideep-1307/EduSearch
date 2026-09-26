import express, { Express } from 'express';
import { invertedIndex } from './ir/indexer';
import { preprocessText } from './ir/preprocessor';
import { searchLocalCollection } from './ir/retrieval';
import { generateStudyNotes } from './notes/notesGenerator';
import { FAMOUS_BOOKS_DATABASE } from './notes/famousBooksData';
import { searchAcademicPapers } from './sources/academic';
import { searchWikipedia } from './sources/wikipedia';
import { DocumentItem, SearchResponse, SearchResultItem } from '../src/types';

export function createExpressApp(): Express {
  const app = express();

  // JSON payload parser (increase limit for PDF base64 payloads)
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'EduSearch IR Engine',
      stats: invertedIndex.getStats(),
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Global Collection Statistics
  app.get('/api/stats', (req, res) => {
    res.json(invertedIndex.getStats());
  });

  // Multi-Source Search Endpoint
  app.get('/api/search', async (req, res) => {
    const startTime = Date.now();
    const query = (req.query.q as string || '').trim();

    if (!query) {
      return res.status(400).json({ error: 'Search query string (q) is required' });
    }

    const preprocessed = preprocessText(query);

    try {
      // Execute multi-source queries concurrently for maximum responsiveness
      const [localResults, webResults, academicResults] = await Promise.all([
        Promise.resolve().then(() => searchLocalCollection(query)),
        searchWikipedia(query, 6).catch((err) => {
          console.warn('Wikipedia search error:', err);
          return [] as SearchResultItem[];
        }),
        searchAcademicPapers(query, 5).catch((err) => {
          console.warn('Academic search error:', err);
          return [] as SearchResultItem[];
        }),
      ]);

      const totalResults = localResults.length + webResults.length + academicResults.length;
      const retrievalTimeMs = Date.now() - startTime;

      const response: SearchResponse = {
        query,
        queryProcessed: {
          raw: query,
          tokens: preprocessed.tokens,
          stopwordsRemoved: preprocessed.stopwordsRemoved,
          stemmed: preprocessed.stems,
        },
        totalResults,
        localResultsCount: localResults.length,
        webResultsCount: webResults.length,
        academicResultsCount: academicResults.length,
        results: [...localResults, ...webResults, ...academicResults],
        retrievalTimeMs,
      };

      res.json(response);
    } catch (err: any) {
      console.error('Search retrieval pipeline error:', err);
      res.status(500).json({
        error: 'Error executing search retrieval pipeline',
        message: err.message || 'Internal error',
      });
    }
  });

  // Generate Structured Study Notes Endpoint
  app.post('/api/study-notes', async (req, res) => {
    const { topic, results } = req.body;

    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: 'Topic parameter is required' });
    }

    try {
      let searchContext = results as SearchResultItem[] | undefined;
      // If client didn't supply search results, perform rapid retrieval on the topic
      if (!searchContext || searchContext.length === 0) {
        const local = searchLocalCollection(topic);
        const web = await searchWikipedia(topic, 3).catch(() => []);
        const acad = await searchAcademicPapers(topic, 3).catch(() => []);
        searchContext = [...local, ...web, ...acad];
      }

      const notes = await generateStudyNotes(topic.trim(), searchContext);
      res.json(notes);
    } catch (err: any) {
      console.error('Study notes generation error:', err);
      res.status(500).json({
        error: 'Failed to generate study notes',
        message: err.message || 'Internal synthesis failure',
      });
    }
  });

  // Recommended Famous Books Catalog
  app.get('/api/famous-books', (req, res) => {
    const subjectQuery = (req.query.subject as string || '').toLowerCase().trim();
    if (subjectQuery) {
      const filtered = FAMOUS_BOOKS_DATABASE.filter(
        (cat) =>
          cat.subject.toLowerCase().includes(subjectQuery) ||
          cat.category.toLowerCase().includes(subjectQuery) ||
          cat.books.some(
            (b) =>
              b.title.toLowerCase().includes(subjectQuery) ||
              b.author.toLowerCase().includes(subjectQuery) ||
              (b.famousAlias && b.famousAlias.toLowerCase().includes(subjectQuery))
          )
      );
      return res.json(filtered);
    }
    res.json(FAMOUS_BOOKS_DATABASE);
  });

  // Documents Listing Endpoint
  app.get('/api/documents', (req, res) => {
    const docs = invertedIndex.getAllDocuments();
    res.json(docs);
  });

  // Single Document Details
  app.get('/api/documents/:id', (req, res) => {
    const doc = invertedIndex.getDocument(req.params.id);
    if (!doc) {
      return res.status(400).json({ error: 'Document not found' });
    }
    res.json(doc);
  });

  // Document Upload & Dynamic Indexing Endpoint
  app.post('/api/documents/upload', async (req, res) => {
    try {
      const { title, subject, filename, text, base64Content, fileType } = req.body;

      if (!title || !title.trim()) {
        return res.status(400).json({ error: 'Document title is required' });
      }

      let extractedContent = '';

      if (fileType === 'pdf' && base64Content) {
        try {
          const pdfParseModule: any = await import('pdf-parse');
          const pdfParse = pdfParseModule.default || pdfParseModule;
          const buffer = Buffer.from(base64Content, 'base64');
          const pdfData = await pdfParse(buffer);
          extractedContent = pdfData.text || '';
        } catch (pdfErr: any) {
          console.error('PDF parsing error:', pdfErr);
          return res.status(400).json({
            error: 'Failed to extract text from PDF document',
            details: pdfErr.message,
          });
        }
      } else if (text) {
        extractedContent = text;
      } else {
        return res.status(400).json({ error: 'Document text or PDF content is required' });
      }

      const cleanText = extractedContent.replace(/\s+/g, ' ').trim();
      if (cleanText.length < 20) {
        return res.status(400).json({
          error: 'Document content is too short or empty (must contain at least 20 characters of text).',
        });
      }

      const wordCount = cleanText.split(/\s+/).length;
      const newDocId = `doc-user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

      const newDoc: DocumentItem = {
        id: newDocId,
        title: title.trim(),
        subject: subject?.trim() || 'General Computer Science',
        filename: filename || 'uploaded_document.txt',
        uploadDate: new Date().toISOString().split('T')[0],
        text: cleanText,
        wordCount,
        isSeed: false,
      };

      // Dynamically update Inverted Index & persistent store
      invertedIndex.indexDocument(newDoc, true);

      res.status(201).json({
        success: true,
        message: 'Document successfully uploaded and indexed into EduSearch IR pipeline',
        document: newDoc,
        stats: invertedIndex.getStats(),
      });
    } catch (err: any) {
      console.error('Document upload error:', err);
      res.status(500).json({
        error: 'Failed to upload and index document',
        message: err.message,
      });
    }
  });

  // Delete User Document Endpoint
  app.delete('/api/documents/:id', (req, res) => {
    const success = invertedIndex.deleteDocument(req.params.id);
    if (!success) {
      return res.status(400).json({
        error: 'Document cannot be deleted (seed documents are protected, or document ID does not exist).',
      });
    }
    res.json({
      success: true,
      message: 'Document removed from search index',
      stats: invertedIndex.getStats(),
    });
  });

  return app;
}
