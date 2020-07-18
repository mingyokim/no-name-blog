import { ADD_PARTIAL_BLOGS } from '../actionTypes';

const addPartialBlogs = (partialBlogs, filter = 'all') => ({
  type: ADD_PARTIAL_BLOGS,
  partialBlogs,
  filter,
});

export default addPartialBlogs;
