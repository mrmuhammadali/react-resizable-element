import * as React from 'react';

import { ResizableOptions, useResizable } from './useResizable';
import styles from './Resizable.module.css';

type ResizableProps = ResizableOptions & {
  className?: string;
  classes?: { root?: string; handle?: string };
  children: JSX.Element;
  resizable?: boolean;
};

export const Resizable: React.FC<ResizableProps> = props => {
  const {
    className,
    classes = {},
    children,
    direction,
    maxSize,
    minSize,
    resizable = true,
  } = props;
  const { container, handle } = useResizable({ direction, maxSize, minSize });

  return (
    <div
      className={[styles.root, classes.root, className].filter(Boolean).join(' ')}
      data-testid="resizable"
      ref={container}
    >
      {resizable && (
        <span
          className={[styles.handle, classes.handle].filter(Boolean).join(' ')}
          data-direction={direction}
          data-testid="handle"
          ref={handle}
        />
      )}
      {children}
    </div>
  );
};
