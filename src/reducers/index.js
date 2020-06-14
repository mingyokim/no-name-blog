import { combineReducers } from 'redux';
import { ADD_PARTIAL_BLOGS } from '../actions/actionTypes';

const initialPartialBlogsState = {
  loaded: false,
  data: [],
};

const partialBlogs = (state = initialPartialBlogsState, action) => {
  const { type, partialBlogs: newPartialBlogs } = action;
  const { loaded, data } = state;
  switch (type) {
    case ADD_PARTIAL_BLOGS:
      if (loaded) {
        return {
          loaded,
          data: data.concat(newPartialBlogs)
        };
      }
      return {
        loaded: true,
        data: newPartialBlogs,
      };
    default:
      return state;
  }
};

const blogApp = combineReducers({
  partialBlogs,
});

export default blogApp;
