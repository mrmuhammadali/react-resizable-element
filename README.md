![react-resizable-element](https://muhammadali.dev/react-resizable-element/demo.gif)

![npm](https://img.shields.io/npm/v/react-resizable-element?style=flat-square)
![bundle size](https://img.shields.io/bundlephobia/minzip/react-resizable-element?style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/mrmuhammadali/react-resizable-element/CI?style=flat-square)
![Coveralls branch](https://img.shields.io/coveralls/github/mrmuhammadali/react-resizable-element/main?style=flat-square)
![dependencies status](https://img.shields.io/librariesio/release/npm/react-resizable-element?style=flat-square)
![npm](https://img.shields.io/npm/dm/react-resizable-element?style=flat-square)

The above [demo](https://muhammadali.dev/react-resizable-element/) is hosted through [`example`](https://github.com/mrmuhammadali/react-resizable-element/tree/main/example) directory on github pages.

## Installation

```bash
yarn add react-resizable-element # or npm i --save react-resizable-element
```

## Usage

```js
import { Resizable } from 'react-resizable-element';

const App = () => {
  return (
    <Resizable direction="right">
      <div>Resizable Content</div>
    </Resizable>
  );
};
```

```js
import { useResizable } from 'react-resizable-element';

const App = () => {
  const { container, handle } = useResizable({ direction: 'right' });
  return (
    <div className="container" ref={container}>
      <span className="handle" ref={handle} />
      <div>Resizable Content</div>
    </div>
  );
};
```

## `Resizable`

| Prop          | Type                                                       | Default | Description                                   |
| ------------- | ---------------------------------------------------------- | ------- | --------------------------------------------- |
| classes       | `{ root: string; handle: string }`                         | `{}`    | CSS class applied to root and handle elements |
| className     | `string`                                                   |         | CSS class applied to root element             |
| **direction** | `'top'` &vert; `'bottom'` &vert; `'right'` &vert; `'left'` |         | Direction of resize                           |
| minSize       | `number`                                                   | 0       | Minimum threshold in pixels                   |
| maxSize       | `number`                                                   | 10000   | Maximum threshold in pixels                   |
| resizable     | `boolean`                                                  | `true`  | Enable/disable resizing of elements           |
| style         | `React.CSSProperties`                                      | `{}`    | `style` applied to root element               |

## `useResizable`

### Parameters: _an object of options for this Resizable hook_

| Name          | Type                                                       | Default | Description                 |
| ------------- | ---------------------------------------------------------- | ------- | --------------------------- |
| **direction** | `'top'` &vert; `'bottom'` &vert; `'right'` &vert; `'left'` |         | Direction of resize         |
| minSize       | `number`                                                   | 0       | Minimum threshold in pixels |
| maxSize       | `number`                                                   | 10000   | Maximum threshold in pixels |

### Return Values

| Name       | Type               | Description                                                         |
| ---------- | ------------------ | ------------------------------------------------------------------- |
| container  | `MutableRefObject` | Pass it to resizable container element                              |
| handle     | `MutableRefObject` | Pass it to handle element to add `onPointerDown` event for resizing |
| isResizing | `boolean`          | Flag for determining if container is being resized                  |

## Optimizations

`react-resizable-element` ensures that your app has:

- no unnecessary code imported:

  The package is tree shakeable which means if you are importing `useResizable` hook only, it'll make sure unused `Resizable` component won't be bundled in your application.

- no unnecessary re-renders:

  Core of the package works without any re-renders even when you use `useResizable`. But if you have any use-case where you have to use `isResizing` flag then you will get 2 re-renders on demand, i.e. when user start and stop resizing.

without any code changes from you.

## Contribution

### Commands

[TSDX](https://github.com/formium/tsdx) has been used to scaffold this package inside `/src`, and also sets up a [Parcel-based](https://parceljs.org) playground for it inside `/example`.

The recommended workflow is to run TSDX in one terminal:

```bash
yarn start # or npm start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run the example inside another:

```bash
cd example
yarn # or npm i to install dependencies
yarn start # or npm start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**, we use [Parcel's aliasing](https://parceljs.org/module_resolution.html#aliases).

To do a one-off build, use `npm run build` or `yarn build`.

### Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

#### Jest

Jest tests are set up to run with `yarn test` or `npm test`.

#### Bundle analysis

Calculates the real cost of your library using [size-limit](https://github.com/ai/size-limit) with `npm run size` and visulize it with `npm run analyze`.

#### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings.
