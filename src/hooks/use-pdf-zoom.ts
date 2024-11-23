import { useState } from 'react';
import { ZOOM_LEVELS, type ZoomLevel } from '@/app/components/visualizer/utils/constants';

export const usePDFZoom = (initialZoom: ZoomLevel = ZOOM_LEVELS[2]) => {
  const [scale, setScale] = useState<ZoomLevel>(initialZoom);

  const zoomIn = () => {
    const currentIndex = ZOOM_LEVELS.indexOf(scale);
    if (currentIndex < ZOOM_LEVELS.length - 1) {
      setScale(ZOOM_LEVELS[currentIndex + 1]);
    }
  };

  const zoomOut = () => {
    const currentIndex = ZOOM_LEVELS.indexOf(scale);
    if (currentIndex > 0) {
      setScale(ZOOM_LEVELS[currentIndex - 1]);
    }
  };

  const setZoom = (newScale: ZoomLevel) => {
    setScale(newScale);
  };

  return {
    scale,
    zoomIn,
    zoomOut,
    setZoom,
    canZoomIn: ZOOM_LEVELS.indexOf(scale) < ZOOM_LEVELS.length - 1,
    canZoomOut: ZOOM_LEVELS.indexOf(scale) > 0,
  };
};
