import { ADD_PARTIAL_BLOGS } from '../actionTypes';

const addPartialBlogs = partialBlogs => ({
  type: ADD_PARTIAL_BLOGS,
  partialBlogs
});

export default addPartialBlogs;
