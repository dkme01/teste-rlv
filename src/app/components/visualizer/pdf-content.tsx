'use client';

import React from 'react';
import { Page } from 'react-pdf';
import type { SearchResult } from './utils/types';
import type { ViewMode, ZoomLevel } from "./utils/constants"

interface PDFContentProps {
  pageNumber: number;
  numPages: number;
  scale: ZoomLevel;
  rotation: number;
  viewMode: ViewMode;
  containerWidth: number;
  searchResults: SearchResult[];
}

export const PDFContent: React.FC<PDFContentProps> = ({
  pageNumber,
  numPages,
  scale,
  rotation,
  viewMode,
  containerWidth,
  searchResults,
}) => {
  const renderPages = (): JSX.Element | JSX.Element[] => {
    if (viewMode === 'single') {
      return (
        <Page
          pageNumber={pageNumber}
          scale={scale}
          rotate={rotation}
          width={containerWidth * 0.9}
          renderTextLayer={true}
          renderAnnotationLayer={true}
        />
      );
    }

    const pages: JSX.Element[] = [];
    const startPage = pageNumber % 2 === 0 ? pageNumber - 1 : pageNumber;

    for (let i = 0; i < 2; i++) {
      const currentPage = startPage + i;
      if (currentPage <= numPages) {
        pages.push(
          <Page
            key={currentPage}
            pageNumber={currentPage}
            scale={scale}
            rotate={rotation}
            width={containerWidth * 0.45}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        );
      }
    }

    return (
      <div className="flex justify-between w-full">
        {pages}
      </div>
    );
  };

  const renderSearchHighlights = (): JSX.Element[] => {
    return searchResults
      .filter(result => result.pageNumber === pageNumber)
      .flatMap(result =>
        result.matches.map((match, index) => (
          <div
            key={`highlight-${index}`}
            className="absolute bg-yellow-200 opacity-50"
            style={{
              left: `${match.position.x}px`,
              top: `${match.position.y}px`,
              width: `${match.position.width}px`,
              height: `${match.position.height}px`,
            }}
          />
        ))
      );
  };

  return (
    <div className="relative">
      {renderPages()}
      {renderSearchHighlights()}
    </div>
  );
};
