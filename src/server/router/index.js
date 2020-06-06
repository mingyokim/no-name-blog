import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { ServerStyleSheets } from '@material-ui/core/styles';
import routes from '../../routes';
import App from '../../client/components/App';

const renderFullPage = (app, css) => `
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
    <script src="/bundle.js"></script>
  </body>

</html>
`;

export default function renderRoute(req, res) {
  console.log('rendering', req.url, 'from server');
  const sheets = new ServerStyleSheets();
  const branch = matchRoutes(routes, req.url);
  const promises = [];

  branch.forEach(({ route, match }) => {
    if (route.loadData) {
      promises.push(route.loadData(match));
    }
  });

  Promise.all(promises).then((data) => {
    // data will be an array[] of datas returned by each promises.

    const context = data.reduce((c, d) => Object.assign(c, d), {});

    const html = renderToString(
      sheets.collect(
        <StaticRouter location={req.url} context={context}><App /></StaticRouter>
      ),
    );

    // Grab the CSS from the sheets.
    const css = sheets.toString();

    return res.send(renderFullPage(html, css));
  });
}
