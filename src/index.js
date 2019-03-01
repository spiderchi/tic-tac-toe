import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from './state/store';
import App from './views/App.jsx';

import { gameOperations } from './state/tic-tak/game';


const initialState = null;
const store = configureStore(initialState || {});

if (!initialState) {
 
  // redux store to dispatch
  const newGame = gameOperations.newGame();

  store.dispatch(newGame);
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);