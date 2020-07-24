import { UPDATE_PARTIAL_BLOGS } from '../actionTypes';

const updatePartialBlogs = ({ partialBlogs, filter, hasMore }) => ({
  type: UPDATE_PARTIAL_BLOGS,
  partialBlogs,
  filter,
  hasMore,
});

export default updatePartialBlogs;
