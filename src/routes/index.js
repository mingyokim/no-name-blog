import Root from '../client/components/Root';
import Home from '../client/components/Home';
import { PageNotFound, RedirectToPageNotFound } from '../client/components/PageNotFound';
import WriterHome from '../client/components/writer/WriterHome';
import Login from '../client/components/writer/Login';

const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/page-not-found',
        exact: true,
        component: PageNotFound
      },
      {
        path: '/writer/login',
        component: Login
      },
      {
        path: '/writer',
        component: WriterHome,
        exact: true
      },
      {
        component: RedirectToPageNotFound,
      },
    ]
  }
];

export default routes;
