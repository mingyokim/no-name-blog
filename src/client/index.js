import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';
import throttle from 'lodash/throttle';
import { ThemeProvider } from '@material-ui/core/styles';

import App from './components/App';
import blogApp from '../reducers';
import { loadState, saveState } from './storage/localStorage';
import theme from '../theme';

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

const Main = () => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

const renderRouter = (Component) => {
  ReactDOM.hydrate(<Component />, document.querySelector('#root'));
};

loadableReady(() => renderRouter(Main));

// ReactDOM.render(<App />, document.getElementById('root'));
