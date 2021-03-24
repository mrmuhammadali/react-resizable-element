import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';

export enum Direction {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
}

type Element = HTMLDivElement | HTMLSpanElement | HTMLElement | null;

export interface ResizableOptions {
  direction: keyof typeof Direction;
  maxSize?: number;
  minSize?: number;
}

export interface UseResizable {
  container: MutableRefObject<Element> | undefined;
  handle: MutableRefObject<Element> | undefined;
  isResizing: boolean;
}

export const useResizable = (options: ResizableOptions): UseResizable => {
  const { direction, maxSize = Number.MAX_SAFE_INTEGER, minSize = 0 } = options;
  const container = useRef<Element>(null);
  const handle = useRef<Element>(null);
  const isResizingRef = useRef(false);
  const [isResizing, setResizing] = useState(false);
  const shouldUpdateResizing = useRef(false);

  useEffect(() => {
    const handlePointerDown = () => {
      isResizingRef.current = true;
      if (shouldUpdateResizing.current) setResizing(true);
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
      isResizingRef.current = false;
      if (shouldUpdateResizing.current) setResizing(false);
    };
    const handlePointerMove = (event: MouseEvent) => {
      if (isResizingRef.current && container.current) {
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

  return useMemo(() => {
    const refs = { container, handle } as UseResizable;
    Object.defineProperty(refs, 'isResizing', {
      get: () => {
        shouldUpdateResizing.current = true;
        return isResizing;
      },
      enumerable: true,
    });
    return refs;
  }, [isResizing]);
};
