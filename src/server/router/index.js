import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
// import { matchRoutes } from 'react-router-config';
import { ServerStyleSheets } from '@material-ui/core/styles';
import serialize from 'serialize-javascript';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootRoutes from '../../routes';
import App from '../../client/components/App';
import blogApp from '../../reducers';

const admin = require('firebase-admin');

const renderFullPage = (app, css, preloadedState) => `
<!doctype html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="google-signin-client_id" content="772543796000-a6b7e276bb2gk0ur38rsloua99a9kf54.apps.googleusercontent.com">
    <title>Bloggo</title>
    <style id="jss-server-side">${css}</style>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <script src="https://apis.google.com/js/platform.js" async defer></script>
  </head>

  <body>
    <div id="root">${app}</div>
    <script>
      // WARNING: See the following for security issues around embedding JSON in HTML:
      // https://redux.js.org/recipes/server-rendering/#security-considerations
      window.__PRELOADED_STATE__ = ${serialize(preloadedState)}
    </script>
    <script src="/bundle.js"></script>
  </body>

</html>
`;

export default function renderRoute(req, res) {
  console.log('rendering', req.url, 'from server');
  const sheets = new ServerStyleSheets();
  const rootRoute = rootRoutes[0];
  const { routes } = rootRoute;
  const currentRoute = routes.find(route => matchPath(req.url, route)) || {};
  let promise = {};

  // console.log('current route:', currentRoute);

  if (currentRoute.loadData) {
    promise = currentRoute.loadData(admin);
  } else {
    promise = Promise.resolve({});
  }

  promise.then((preloadedState) => {
    const context = {};
    const store = createStore(blogApp, preloadedState);
    const html = renderToString(
      sheets.collect(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      ),
    );

    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      console.log('Found a redirect to:', context.url);
      return res.redirect(301, context.url);
    }
    // we're good, send the response

    // Grab the CSS from the sheets.
    const css = sheets.toString();

    const finalState = store.getState();

    console.log('preloaded state:', finalState);

    return res.send(renderFullPage(html, css, finalState));
  });
}
