export const ZOOM_LEVELS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] as const;
export type ZoomLevel = typeof ZOOM_LEVELS[number];
export type Rotation = 0 | 90 | 180 | 270;
export type ViewMode = 'single' | 'double';
