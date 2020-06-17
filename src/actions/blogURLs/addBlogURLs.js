import { ADD_BLOG_URLS } from '../actionTypes';

const addBlogURLs = blogs => ({
  type: ADD_BLOG_URLS,
  blogURLs: blogs.map(({ id, url }) => ({ id, url })),
});

export default addBlogURLs;
