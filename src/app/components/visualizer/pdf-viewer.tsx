'use client';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';


import React, { useState, useRef } from 'react';
import { pdfjs, Document } from 'react-pdf';
import useResizeObserver from '@react-hook/resize-observer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast';
import { usePDFSearch } from '@/hooks/use-pdf-search';
import { PDFToolbar } from './pdf-toolbar';
import { PDFContent } from './pdf-content';
import type { PDFViewerProps, DocumentLoadSuccess } from './utils/types';
import { ZOOM_LEVELS, ZoomLevel } from './utils/constants';
import { LoadingState } from '../loading/loading-state';
import { ErrorState } from '../error/error-state';
import { DocumentCallback } from 'react-pdf/dist/esm/shared/types.js';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ file, open, onOpenChange }: PDFViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState<ZoomLevel>(ZOOM_LEVELS[2]); // Default to 100%
  const [rotation, setRotation] = useState<0 | 90 | 180 | 270>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [viewMode, setViewMode] = useState<'single' | 'double'>('single');
  const [pdfDocument, setPdfDocument] = useState<DocumentCallback | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const { toast } = useToast();

  const { searchText, searchResults, handleSearch } = usePDFSearch(pdfDocument);

  useResizeObserver(containerRef, (entry) => {
    setContainerWidth(entry.contentRect.width);
  });

  const handleDownload = (): void => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = async (): Promise<void> => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    try {
      const printWindow = window.open(url);
      if (!printWindow) throw new Error('Could not open print window');

      printWindow.onload = () => {
        printWindow.print();
      };
    } catch (error) {
      toast({
        title: "Erro ao imprimir",
        description: "Não foi possível abrir a janela de impressão.",
        variant: "destructive",
      });
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: DocumentLoadSuccess): void => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error: Error): void => {
    setError(error);
    setLoading(false);
    toast({
      title: "Erro ao carregar PDF",
      description: "Não foi possível carregar o documento PDF.",
      variant: "destructive",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:max-w-[800px] max-h-[90vh] h-full flex flex-col">
        <DialogHeader>
          <DialogTitle>Pré-visualização do arquivo</DialogTitle>

        </DialogHeader>
        <div className="flex flex-col overflow-y-scroll h-full">
          <PDFToolbar
            scale={scale}
            pageNumber={pageNumber}
            numPages={numPages}
            viewMode={viewMode}
            searchText={searchText}
            onZoomIn={() => {
              const currentIndex = ZOOM_LEVELS.indexOf(scale);
              if (currentIndex < ZOOM_LEVELS.length - 1) {
                setScale(ZOOM_LEVELS[currentIndex + 1]);
              }
            }}
            onZoomOut={() => {
              const currentIndex = ZOOM_LEVELS.indexOf(scale);
              if (currentIndex > 0) {
                setScale(ZOOM_LEVELS[currentIndex - 1]);
              }
            }}
            onRotate={() => setRotation((prev) => ((prev + 90) % 360) as 0 | 90 | 180 | 270)}
            onPageChange={(delta) => {
              setPageNumber((prev) => Math.max(1, Math.min(prev + delta, numPages)));
            }}
            onDownload={handleDownload}
            onPrint={handlePrint}
            onViewModeChange={(mode) => setViewMode(mode)}
            onScaleChange={(newScale) => setScale(newScale)}
            onSearch={handleSearch}
          />

          <Card className="flex-1 overflow-auto" ref={containerRef}>
            <CardContent className="h-full p-4">
              {/* loading ? <LoadingState /> : <></> */}
              {error ? <ErrorState /> : <></>}

              {!error && file
                ? (<div className="w-full h-full flex items-center justify-center bg-neutral-100 rounded-lg">
                  <Document
                    file={file}
                    onLoadSuccess={(doc) => {
                      console.log('doc', doc)
                      onDocumentLoadSuccess(doc);
                      setPdfDocument(doc);
                    }}
                    onLoadError={onDocumentLoadError}
                    loading={<LoadingState />}
                  >
                    <PDFContent
                      pageNumber={pageNumber}
                      numPages={numPages}
                      scale={scale}
                      rotation={rotation}
                      viewMode={viewMode}
                      containerWidth={containerWidth}
                      searchResults={searchResults}
                    />
                  </Document>
                </div>
                )
                : <></>
              }
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
