import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Resizable } from '../src';

test('Limit with max/min size', async () => {
  render(
    <Resizable direction="bottom" maxSize={400} minSize={10}>
      <div>Resizable Container</div>
    </Resizable>
  );
  const resizable = screen.getByTestId('resizable');
  fireEvent.pointerDown(screen.getByTestId('handle'));
  fireEvent(window, new MouseEvent('pointermove', { clientY: 500 }));
  expect(resizable).toHaveStyle('height: 400px');
  fireEvent(window, new MouseEvent('pointermove', { clientY: 0 }));
  expect(resizable).toHaveStyle('height: 10px');
});

test('Resize by dragging handle', async () => {
  render(
    <Resizable direction="right">
      <div>Resizable Container</div>
    </Resizable>
  );
  const resizable = screen.getByTestId('resizable');
  const moveEvent = new MouseEvent('pointermove', { clientX: 400 });
  fireEvent(window, moveEvent);
  expect(resizable).not.toHaveStyle('width: 400px');
  fireEvent.pointerDown(screen.getByTestId('handle'));
  fireEvent(window, moveEvent);
  fireEvent.pointerUp(window);
  expect(resizable).toHaveStyle('width: 400px');
});

test('Disable resizing', async () => {
  render(
    <Resizable direction="right" resizable={false}>
      <div>Resizable Container</div>
    </Resizable>
  );
  expect(screen.queryByTestId('handle')).not.toBeInTheDocument();
});

test('Apply classes', async () => {
  render(
    <Resizable
      direction="top"
      className="className"
      classes={{ root: 'classes.root', handle: 'classes.handle' }}
    >
      <div>Resizable Container</div>
    </Resizable>
  );
  expect(screen.getByTestId('resizable')).toHaveClass('className classes.root');
  expect(screen.getByTestId('handle')).toHaveClass('classes.handle');
});
