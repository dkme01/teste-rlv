import type { PDFDocumentProxy } from 'pdfjs-dist';

export interface SearchMatch {
  text: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface SearchResult {
  pageNumber: number;
  matches: SearchMatch[];
}

export interface PDFViewerProps {
  file: File;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface DocumentLoadSuccess {
  numPages: number;
}
