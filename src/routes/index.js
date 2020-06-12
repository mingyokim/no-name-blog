import Root from '../client/components/Root';
import Home from '../client/components/Home';
import { PageNotFound, RedirectToPageNotFound } from '../client/components/PageNotFound';
import WriterHome from '../client/components/writer/WriterHome';
import Login from '../client/components/writer/Login';
import { loadBlogs } from '../server/loadData';

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
