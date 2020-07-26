import loadable from '@loadable/component';

import Root from '../client/components/Root';
import WriterRoot from '../client/components/writer/WriterRoot';

const Blog = loadable(() => import('../client/components/blog/BlogRoute'));
const Home = loadable(() => import('../client/components/Home'));
const PageNotFound = loadable(() => import('../client/components/PageNotFound'));
const WriterHome = loadable(() => import('../client/components/writer/WriterHome'));
const Login = loadable(() => import('../client/components/writer/Login'));
const RedirectToPageNotFound = loadable(() => import('../client/components/RedirectToPageNotFound'));
const Logout = loadable(() => import('../client/containers/writer/Logout'));
const NewBlog = loadable(() => import('../client/components/writer/NewBlog'));
const SignUp = loadable(() => import('../client/containers/writer/SignUp'));
const UpdateBlog = loadable(() => import('../client/containers/writer/UpdateBlog'));

// const WriterRoot = loadable(() => import('../client/components/writer/WriterRoot'));

const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/logout',
        component: Logout,
      },
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/signup/:signUpToken',
        component: SignUp,
      },
      {
        path: '/writer',
        component: WriterRoot,
        routes: [
          {
            path: '/writer/new-blog',
            component: NewBlog,
          },
          {
            path: '/writer/blogs/:blog_id/update',
            component: UpdateBlog,
          },
          {
            path: '/writer',
            exact: true,
            component: WriterHome,
          },
          {
            component: RedirectToPageNotFound,
          },
        ]
      },
      {
        path: '/page-not-found',
        exact: true,
        component: PageNotFound,
      },
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
        component: RedirectToPageNotFound,
      },
      // {
      //   component: BlogRoot,
      //   routes: [
      //     {
      //       path: '/',
      //       exact: true,
      //       component: Home,
      //       // loadDataFromClient: loadBlogs,
      //     },
      //     {
      //       path: '/blogs/:blog_url',
      //       exact: true,
      //       component: Blog,
      //     },
      //     {
      //       component: RedirectToPageNotFound,
      //     },
      //   ],
      // },
    ]
  }
];

export default routes;
