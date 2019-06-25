import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  //const script = document.createElement('script');
  //script.type = 'ohm-js';
  //document.getElementsByTagName('head')[0].appendChild(script);
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
