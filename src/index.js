import React from 'react';
import ReactDOM from 'react-dom';
import AppRoute from './components/routes';
import * as serviceWorker from './serviceWorker';
import './scss/style.scss';

ReactDOM.render(
  <AppRoute />,
  document.getElementById('root')
);

serviceWorker.unregister();
