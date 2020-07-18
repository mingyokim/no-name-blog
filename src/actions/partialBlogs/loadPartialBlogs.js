import { LOAD_PARTIAL_BLOGS } from '../actionTypes';

const loadPartialBlogs = (filter = 'all') => ({
  type: LOAD_PARTIAL_BLOGS,
  filter,
});

export default loadPartialBlogs;
