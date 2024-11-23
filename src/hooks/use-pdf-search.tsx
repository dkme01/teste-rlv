import { SearchResult } from '@/app/components/visualizer/utils/types';
import { useState } from 'react';
import { DocumentCallback } from 'react-pdf/dist/esm/shared/types.js';

export const usePDFSearch = (pdfDocument: DocumentCallback | null) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async (text: string): Promise<void> => {
    setSearchText(text);
    if (!pdfDocument || !text) {
      setSearchResults([]);
      return;
    }

    const results: SearchResult[] = [];
    for (let pageIndex = 1; pageIndex <= pdfDocument.numPages; pageIndex++) {
      const page = await pdfDocument.getPage(pageIndex);
      const textContent = await page.getTextContent();
      const pageResults: SearchResult = {
        pageNumber: pageIndex,
        matches: [],
      };

      textContent.items.forEach((item: any) => {
        if ('str' in item && item.str.toLowerCase().includes(text.toLowerCase())) {
          pageResults.matches.push({
            text: item.str,
            position: {
              x: item.transform[4],
              y: item.transform[5],
              width: item.width,
              height: item.height,
            },
          });
        }
      });

      if (pageResults.matches.length > 0) {
        results.push(pageResults);
      }
    }

    setSearchResults(results);
  };

  return {
    searchText,
    searchResults,
    handleSearch,
  };
};
