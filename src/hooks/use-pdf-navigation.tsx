import { useState } from 'react';

interface UsePDFNavigationProps {
  initialPage?: number;
  totalPages: number;
}

export const usePDFNavigation = ({ initialPage = 1, totalPages }: UsePDFNavigationProps) => {
  const [pageNumber, setPageNumber] = useState(initialPage);

  const goToPage = (page: number) => {
    setPageNumber(Math.max(1, Math.min(page, totalPages)));
  };

  const nextPage = () => {
    goToPage(pageNumber + 1);
  };

  const previousPage = () => {
    goToPage(pageNumber - 1);
  };

  return {
    pageNumber,
    goToPage,
    nextPage,
    previousPage,
    canGoNext: pageNumber < totalPages,
    canGoPrevious: pageNumber > 1,
  };
};
