import { UPDATE_PARTIAL_BLOGS } from '../actionTypes';

const updatePartialBlogs = partialBlogs => ({
  type: UPDATE_PARTIAL_BLOGS,
  partialBlogs
});

export default updatePartialBlogs;
