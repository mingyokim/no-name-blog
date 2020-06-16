import { ADD_PARTIAL_BLOGS, UPDATE_PARTIAL_BLOGS, LOAD_PARTIAL_BLOGS } from '../actions/actionTypes';

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
    case UPDATE_PARTIAL_BLOGS:
      return {
        loaded: true,
        data: newPartialBlogs,
      };
    case LOAD_PARTIAL_BLOGS:
      return {
        loaded: false,
        data,
      };
    default:
      return state;
  }
};

export default partialBlogs;
