import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';
import throttle from 'lodash/throttle';

import App from './components/App';
import blogApp from '../reducers';
import { loadState, saveState } from './storage/localStorage';

// Scrapping preloaded state: just load the stuff in client side only
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const persistedState = loadState();

const mergedInitialState = Object.assign({}, preloadedState, persistedState);

// Create Redux store with initial state
const store = createStore(blogApp, mergedInitialState);

store.subscribe(throttle(() => {
  saveState({
    author: store.getState().author
  });
}, 1000));

const renderRouter = (Component) => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>, document.getElementById('root')
  );
};

loadableReady(() => renderRouter(App));

// ReactDOM.render(<App />, document.getElementById('root'));
