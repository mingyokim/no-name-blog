import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';
import App from './components/App';
import blogApp from '../reducers';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// console.log('preloaded state:', preloadedState);

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(blogApp, preloadedState);

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
