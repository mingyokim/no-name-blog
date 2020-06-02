import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import routes from '../../routes';
import App from '../../client/components/App';

const renderHTML = app => `
<!doctype html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Bloggo</title>
  </head>

  <body>
    <div id="root">${app}</div>
    <script src="/bundle.js"></script>
  </body>

</html>
`;

export default function renderRoute(req, res) {
  const branch = matchRoutes(routes, req.url);
  const promises = [];

  branch.forEach(({ route, match }) => {
    if (route.loadData) {
      promises.push(route.loadData(match));
    }
  });

  Promise.all(promises).then((data) => {
    // data will be an array[] of datas returned by each promises.
    // // console.log(data)

    const context = data.reduce((c, d) => Object.assign(c, d), {});

    const router = <StaticRouter location={req.url} context={context}><App /></StaticRouter>;

    const app = renderToString(router);

    const html = renderHTML(app);

    // console.log(chalk.green(`<!DOCTYPE html>${html}`));

    return res.status(200).send(html);
  });
}
