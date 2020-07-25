import { ADD_BLOG, REMOVE_BLOG } from '../actions/actionTypes';

const initialState = {};

const blogs = (state = initialState, action) => {
  const {
    type,
  } = action;
  switch (type) {
    case ADD_BLOG:
      const { blog } = action;
      return Object.assign({}, state, {
        [blog.id]: blog,
      });
    case REMOVE_BLOG:
      const { id } = action;
      const { [id]: val, ...restOfBlogs } = state;
      return restOfBlogs;
    default:
      return state;
  }
};

export default blogs;
