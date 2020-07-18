import { UPDATE_PARTIAL_BLOGS } from '../actionTypes';

const updatePartialBlogs = (partialBlogs, filter = 'all') => ({
  type: UPDATE_PARTIAL_BLOGS,
  partialBlogs,
  filter,
});

export default updatePartialBlogs;
