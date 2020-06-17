import { ADD_BLOG } from '../actions/actionTypes';

const initialState = {};

const blogs = (state = initialState, action) => {
  const {
    type,
    blog,
  } = action;
  switch (type) {
    case ADD_BLOG:
      return Object.assign({}, state, {
        [blog.id]: blog,
      });
    default:
      return state;
  }
};

export default blogs;
