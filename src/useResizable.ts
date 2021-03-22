import { MutableRefObject, useEffect, useRef } from 'react';

export enum Direction {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
}

export interface ResizableOptions {
  direction: keyof typeof Direction;
  maxSize?: number;
  minSize?: number;
}

type UseResizable = (
  options: ResizableOptions
) => {
  container: MutableRefObject<HTMLDivElement | null>;
  handle: MutableRefObject<HTMLSpanElement | null>;
};

export const useResizable: UseResizable = options => {
  const { direction, maxSize = Number.MAX_SAFE_INTEGER, minSize = 0 } = options;
  const isResizing = useRef(false);
  const container = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handlePointerDown = () => {
      isResizing.current = true;
    };
    handle.current?.addEventListener('pointerdown', handlePointerDown);
  }, []);

  useEffect(() => {
    const getPanelHeight = (clientY: number, rect: ClientRect): number => {
      const position = rect[direction];
      let newHeight = rect.height;
      if (direction === Direction.top) newHeight -= clientY - position;
      else if (direction === Direction.bottom) newHeight -= position - clientY;

      if (newHeight < minSize) return minSize;
      if (newHeight > maxSize) return maxSize;
      return newHeight;
    };
    const getPanelWidth = (clientX: number, rect: ClientRect): number => {
      const position = rect[direction];
      let newWidth = rect.width;
      if (direction === Direction.left) newWidth -= clientX - position;
      else if (direction === Direction.right) newWidth -= position - clientX;

      if (newWidth < minSize) return minSize;
      if (newWidth > maxSize) return maxSize;
      return newWidth;
    };
    const handlePointerUp = () => {
      isResizing.current = false;
    };
    const handlePointerMove = (event: MouseEvent) => {
      if (isResizing.current && container.current) {
        const rect = container.current.getBoundingClientRect();
        if (direction === Direction.top || direction === Direction.bottom) {
          container.current.style.height = `${getPanelHeight(event.clientY, rect)}px`;
        } else if (direction === Direction.left || direction === Direction.right) {
          container.current.style.width = `${getPanelWidth(event.clientX, rect)}px`;
        }
      }
    };
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [direction, maxSize, minSize]);

  return { container, handle };
};
