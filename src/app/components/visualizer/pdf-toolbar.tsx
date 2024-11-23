'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  ChevronLeft,
  ChevronRight,
  Search,
  Printer,
  AlignJustify,
} from 'lucide-react';
import { ZOOM_LEVELS, type ZoomLevel, type ViewMode } from './utils/constants';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PDFToolbarProps {
  scale: ZoomLevel;
  pageNumber: number;
  numPages: number;
  viewMode: ViewMode;
  searchText: string;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotate: () => void;
  onPageChange: (delta: number) => void;
  onDownload: () => void;
  onPrint: () => void;
  onViewModeChange: (mode: ViewMode) => void;
  onScaleChange: (scale: ZoomLevel) => void;
  onSearch: (text: string) => void;
}

export const PDFToolbar: React.FC<PDFToolbarProps> = ({
  scale,
  pageNumber,
  numPages,
  viewMode,
  searchText,
  onZoomIn,
  onZoomOut,
  onRotate,
  onPageChange,
  onDownload,
  onPrint,
  onViewModeChange,
  onScaleChange,
  onSearch,
}) => (
  <Card className="mb-4">
    <CardContent className="p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={onZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Select
            value={String(scale)}
            onValueChange={(value) => onScaleChange(Number(value) as ZoomLevel)}
          >
            <SelectTrigger className="w-24">
              <SelectValue>{Math.round(scale * 100)}%</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {ZOOM_LEVELS.map((level) => (
                <SelectItem key={level} value={String(level)}>
                  {Math.round(level * 100)}%
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={onZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onRotate}>
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(-1)}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Página {pageNumber} de {numPages || '?'}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(1)}
            disabled={pageNumber >= numPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onViewModeChange(viewMode === 'single' ? 'double' : 'single')}
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onPrint}>
            <Printer className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            onClick={onDownload}
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </Button>
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar no documento..."
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            value={searchText}
            onChange={(e) => onSearch(e.target.value)}
          />
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </CardContent>
  </Card>
);
