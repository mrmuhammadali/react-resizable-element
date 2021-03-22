import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Resizable } from '../.';

const App = () => {
  return (
    <div>
      <Resizable direction="bottom">
        <div>Resizable</div>
      </Resizable>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
