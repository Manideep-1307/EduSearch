import fs from 'fs';
import path from 'path';
import { DocumentItem } from '../../src/types';
import { SEED_DOCUMENTS } from '../data/seedDocuments';
import { preprocessText } from './preprocessor';

export interface Posting {
  docId: string;
  tf: number; // raw term frequency in this document
  positions: number[];
}

export interface IndexedDocMeta {
  doc: DocumentItem;
  docLength: number; // number of tokens
  stems: string[];
  termFreqs: Map<string, number>;
}

export class InvertedIndex {
  private dictionary: Map<string, Posting[]> = new Map();
  private documents: Map<string, IndexedDocMeta> = new Map();
  private storagePath: string;

  constructor() {
    // In Vercel serverless environments, only /tmp is writable
    if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
      this.storagePath = path.join('/tmp', 'user_documents.json');
    } else {
      this.storagePath = path.join(process.cwd(), 'server', 'data', 'user_documents.json');
    }
    this.initialize();
  }

  private initialize() {
    // 1. Index Seed Documents
    for (const seed of SEED_DOCUMENTS) {
      this.indexDocument(seed, false);
    }

    // 2. Load any saved user documents
    try {
      if (fs.existsSync(this.storagePath)) {
        const data = fs.readFileSync(this.storagePath, 'utf8');
        const userDocs: DocumentItem[] = JSON.parse(data);
        if (Array.isArray(userDocs)) {
          for (const doc of userDocs) {
            this.indexDocument(doc, false);
          }
        }
      }
    } catch (err) {
      console.warn('Could not read persistent documents store:', err);
    }
  }

  public indexDocument(doc: DocumentItem, persist = true) {
    // Preprocess document text
    const fullText = `${doc.title} ${doc.subject} ${doc.text}`;
    const { stems } = preprocessText(fullText);

    const termFreqs = new Map<string, number>();
    const positionsMap = new Map<string, number[]>();

    stems.forEach((stem, idx) => {
      termFreqs.set(stem, (termFreqs.get(stem) || 0) + 1);
      if (!positionsMap.has(stem)) {
        positionsMap.set(stem, []);
      }
      positionsMap.get(stem)!.push(idx);
    });

    // Save doc metadata
    this.documents.set(doc.id, {
      doc,
      docLength: stems.length,
      stems,
      termFreqs,
    });

    // Add to dictionary
    for (const [stem, tf] of termFreqs.entries()) {
      if (!this.dictionary.has(stem)) {
        this.dictionary.set(stem, []);
      }
      const postings = this.dictionary.get(stem)!;
      // Remove previous posting if updating
      const existingIdx = postings.findIndex((p) => p.docId === doc.id);
      const posting: Posting = {
        docId: doc.id,
        tf,
        positions: positionsMap.get(stem) || [],
      };
      if (existingIdx >= 0) {
        postings[existingIdx] = posting;
      } else {
        postings.push(posting);
      }
    }

    if (persist && !doc.isSeed) {
      this.persistUserDocuments();
    }
  }

  private persistUserDocuments() {
    try {
      const userDocs = Array.from(this.documents.values())
        .map((m) => m.doc)
        .filter((d) => !d.isSeed);
      const dir = path.dirname(this.storagePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.storagePath, JSON.stringify(userDocs, null, 2), 'utf8');
    } catch (err) {
      console.warn('Failed to persist user documents:', err);
    }
  }

  public deleteDocument(id: string): boolean {
    if (!this.documents.has(id)) return false;
    const meta = this.documents.get(id)!;
    if (meta.doc.isSeed) return false; // do not delete seed docs

    // Remove from dictionary
    for (const stem of meta.termFreqs.keys()) {
      const postings = this.dictionary.get(stem);
      if (postings) {
        const filtered = postings.filter((p) => p.docId !== id);
        if (filtered.length === 0) {
          this.dictionary.delete(stem);
        } else {
          this.dictionary.set(stem, filtered);
        }
      }
    }

    this.documents.delete(id);
    this.persistUserDocuments();
    return true;
  }

  public getAllDocuments(): DocumentItem[] {
    return Array.from(this.documents.values()).map((m) => m.doc);
  }

  public getDocument(id: string): DocumentItem | undefined {
    return this.documents.get(id)?.doc;
  }

  public getDocumentMeta(id: string): IndexedDocMeta | undefined {
    return this.documents.get(id);
  }

  public getPostings(stem: string): Posting[] {
    return this.dictionary.get(stem) || [];
  }

  public getDocFrequency(stem: string): number {
    return this.dictionary.get(stem)?.length || 0;
  }

  public getTotalDocs(): number {
    return this.documents.size;
  }

  public getAvgDocLength(): number {
    if (this.documents.size === 0) return 0;
    let totalLen = 0;
    for (const meta of this.documents.values()) {
      totalLen += meta.docLength;
    }
    return totalLen / this.documents.size;
  }

  public getStats() {
    return {
      totalDocuments: this.documents.size,
      vocabularySize: this.dictionary.size,
      avgDocLength: Math.round(this.getAvgDocLength()),
      seedDocsCount: Array.from(this.documents.values()).filter((d) => d.doc.isSeed).length,
      userDocsCount: Array.from(this.documents.values()).filter((d) => !d.doc.isSeed).length,
    };
  }
}

// Singleton Inverted Index instance
export const invertedIndex = new InvertedIndex();
