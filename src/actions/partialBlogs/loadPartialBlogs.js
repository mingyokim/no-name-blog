import { LOAD_PARTIAL_BLOGS } from '../actionTypes';

const loadPartialBlogs = filter => ({
  type: LOAD_PARTIAL_BLOGS,
  filter,
});

export default loadPartialBlogs;
