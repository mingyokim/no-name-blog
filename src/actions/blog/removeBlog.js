import { REMOVE_BLOG } from '../actionTypes';

const removeBlog = id => ({
  type: REMOVE_BLOG,
  id,
});

export default removeBlog;
