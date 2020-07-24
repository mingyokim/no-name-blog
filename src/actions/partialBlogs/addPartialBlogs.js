import { ADD_PARTIAL_BLOGS } from '../actionTypes';

const addPartialBlogs = ({ partialBlogs, filter, hasMore }) => ({
  type: ADD_PARTIAL_BLOGS,
  partialBlogs,
  filter,
  hasMore,
});

export default addPartialBlogs;
