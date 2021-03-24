import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import { Resizable } from '../../.';
import { theme } from './theme';
import './styles.css';

const code = `const Wrapper = ({ children }) => (
  <div style={{
    background: 'papayawhip',
    padding: '2rem'
  }}>
    {children}
  </div>
)

const Title = () => (
  <h3 style={{ color: 'palevioletred', textAlign: 'center' }}>
    Hello World!
  </h3>
)

render(
  <Wrapper>
    <Title />
  </Wrapper>
)`;

const App = () => {
  return (
    <LiveProvider code={code} theme={theme} noInline>
      <div className="code-editor">
        <Resizable className="resizable-editor" direction="right" minSize={200}>
          <LiveEditor className="editor" />
        </Resizable>
        <LivePreview className="preview" />
        <Resizable
          className="resizable-error"
          direction="top"
          minSize={100}
          maxSize={500}
        >
          <div className="error">
            <h2>Errors</h2>
            <LiveError />
          </div>
        </Resizable>
      </div>
    </LiveProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
