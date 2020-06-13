import loadable from '@loadable/component';

import Root from '../client/components/Root';
// import { PageNotFound, RedirectToPageNotFound } from '../client/components/PageNotFound';
// import WriterHome from '../client/components/writer/WriterHome';
// import Login from '../client/components/writer/Login';
import { loadBlogs } from '../server/loadData';
// import Home from '../client/components/Home';
const Home = loadable(() => import('../client/components/Home'));
const { PageNotFound, RedirectToPageNotFound } = loadable(() => import('../client/components/PageNotFound'));
const WriterHome = loadable(() => import('../client/components/writer/WriterHome'));
const Login = loadable(() => import('../client/components/writer/Login'));

const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
        loadData: loadBlogs,
      },
      {
        path: '/page-not-found',
        exact: true,
        component: PageNotFound
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/writer',
        component: WriterHome,
      },
      {
        component: RedirectToPageNotFound,
      },
    ]
  }
];

export default routes;
