import { ADD_BLOG } from '../actionTypes';

const addBlog = blog => ({
  type: ADD_BLOG,
  blog,
});

export default addBlog;
