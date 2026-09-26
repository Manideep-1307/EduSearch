import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, FileText, FileUp, Loader2, UploadCloud, X } from 'lucide-react';
import { uploadDocumentApi } from '../services/api';
import { DocumentItem } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (newDoc: DocumentItem) => void;
}

const SUBJECT_OPTIONS = [
  'Operating Systems',
  'DBMS',
  'Computer Networks',
  'Data Structures',
  'Machine Learning',
  'Information Retrieval',
  'Artificial Intelligence',
  'Software Engineering',
  'Custom Subject',
];

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0]);
  const [customSubject, setCustomSubject] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (selectedFile: File) => {
    const isTxt = selectedFile.name.endsWith('.txt') || selectedFile.type === 'text/plain';
    const isPdf = selectedFile.name.endsWith('.pdf') || selectedFile.type === 'application/pdf';

    if (!isTxt && !isPdf) {
      setErrorMsg('Unsupported file format. Please upload a PDF or TXT file.');
      return;
    }

    if (selectedFile.size > 15 * 1024 * 1024) {
      setErrorMsg('File exceeds 15MB limit. Please upload a smaller document.');
      return;
    }

    setFile(selectedFile);
    if (!title) {
      const cleanName = selectedFile.name
        .replace(/\.(pdf|txt)$/i, '')
        .replace(/[-_]/g, ' ')
        .trim();
      setTitle(cleanName);
    }

    // If TXT, preview text immediately
    if (isTxt) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setText(event.target.result as string);
        }
      };
      reader.readAsText(selectedFile);
    } else if (isPdf) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const raw = String(event.target.result);
          // Extract text strings from binary
          const textMatches = raw.match(/[a-zA-Z0-9.,;:?!' -]{5,}/g);
          if (textMatches && textMatches.length > 5) {
            setText(textMatches.join(' ').slice(0, 4000));
          }
        }
      };
      reader.readAsBinaryString(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setErrorMsg('');

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!title.trim()) {
      setErrorMsg('Please specify a document title.');
      return;
    }

    if (!file && !text.trim()) {
      setErrorMsg('Please upload a file or paste document content.');
      return;
    }

    setIsUploading(true);

    try {
      const chosenSubject = subject === 'Custom Subject' ? customSubject.trim() : subject;
      const contentToUse = text.trim() || `${title.trim()} ${chosenSubject}. Foundational syllabus content and core concepts for ${chosenSubject}.`;

      const createdDoc = await uploadDocumentApi({
        title: title.trim(),
        subject: chosenSubject || 'General CS',
        filename: file?.name || 'document_notes.txt',
        text: contentToUse,
      });

      setSuccessMsg(`"${createdDoc.title}" indexed into Inverted Index successfully.`);
      onUploadSuccess(createdDoc);
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      console.error('Upload error:', err);
      setErrorMsg(err.message || 'Failed to upload and index document.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xl">
      <div className="relative w-full max-w-xl apple-liquid-glass p-6 sm:p-7 max-h-[92vh] overflow-y-auto text-white space-y-4">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center">
            <FileUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Add to Course Collection
            </h3>
            <p className="text-xs text-white/60">
              Upload PDF or TXT notes to index them in the Information Retrieval engine.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-200">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Drag & Drop Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-white bg-white/10'
                : 'border-white/20 hover:border-white/40 bg-white/5'
            }`}
          >
            <input
              type="file"
              id="file-upload"
              accept=".pdf,.txt,text/plain,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer block">
              <UploadCloud className="w-8 h-8 mx-auto text-white mb-2" />
              {file ? (
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-white font-mono">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>{file.name}</span>
                  <span className="text-white/50 font-normal">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
              ) : (
                <>
                  <p className="text-xs font-medium text-white">
                    Drop PDF or TXT here, or <span className="font-semibold underline text-amber-300">browse file</span>
                  </p>
                  <p className="text-[11px] text-white/50 mt-0.5">
                    Supports syllabus chapters, lecture slides (PDF), or study notes (up to 15MB)
                  </p>
                </>
              )}
            </label>
          </div>

          {/* Title input */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1">
              Document Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Operating Systems: Process Scheduling"
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 text-xs sm:text-sm"
              required
            />
          </div>

          {/* Subject selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1">
                Subject Category
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#111622] border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
              >
                {SUBJECT_OPTIONS.map((sub) => (
                  <option key={sub} value={sub} className="bg-[#111622] text-white">
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {subject === 'Custom Subject' && (
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1">
                  Custom Subject Name
                </label>
                <input
                  type="text"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  placeholder="e.g. Theory of Computation"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
              </div>
            )}
          </div>

          {/* Direct Text Editor / Preview */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1">
              Document Content (Extracted Text or Notes)
            </label>
            <textarea
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste lecture notes here, or upload a file above..."
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 text-xs font-mono leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-medium text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="cursor-pointer px-5 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 active:scale-97 transition-all flex items-center gap-2 shadow-[0_4px_16px_rgba(255,255,255,0.3)] select-none disabled:opacity-40"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Indexing...</span>
                </>
              ) : (
                <>
                  <FileUp className="w-3.5 h-3.5" />
                  <span>Index Document</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
