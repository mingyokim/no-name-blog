import loadable from '@loadable/component';

import Root from '../client/components/Root';
// import Logout from '../client/containers/writer/Logout';

const Blog = loadable(() => import('../client/containers/blog/BlogURL'));
// import Blog from '../client/containers/blog/BlogURL';
// import { PageNotFound, RedirectToPageNotFound } from '../client/components/PageNotFound';
// import WriterHome from '../client/components/writer/WriterHome';
// import Login from '../client/components/writer/Login';
// import { loadBlogs } from '../server/loadData';
// import Home from '../client/components/Home';
const Home = loadable(() => import('../client/components/Home'));
const PageNotFound = loadable(() => import('../client/components/PageNotFound'));
const WriterHome = loadable(() => import('../client/components/writer/WriterHome'));
const Login = loadable(() => import('../client/components/writer/Login'));
const RedirectToPageNotFound = loadable(() => import('../client/components/RedirectToPageNotFound'));
const Logout = loadable(() => import('../client/containers/writer/Logout'));
const NewBlog = loadable(() => import('../client/components/writer/NewBlog'));

const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
        // loadDataFromClient: loadBlogs,
      },
      {
        path: '/blogs/:blog_url',
        exact: true,
        component: Blog,
      },
      {
        path: '/logout',
        component: Logout,
      },
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/writer/new-blog',
        component: NewBlog,
      },
      {
        path: '/writer',
        component: WriterHome,
      },
      {
        path: '/page-not-found',
        exact: true,
        component: PageNotFound,
      },
      {
        component: RedirectToPageNotFound,
      },
    ]
  }
];

export default routes;
