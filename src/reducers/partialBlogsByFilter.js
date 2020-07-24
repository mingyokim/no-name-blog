import { ADD_PARTIAL_BLOGS, UPDATE_PARTIAL_BLOGS, LOAD_PARTIAL_BLOGS } from '../actions/actionTypes';

const initialState = {
  all: {
    loaded: false,
    data: [],
    hasMore: true,
  },
};

const partialBlogsByFilter = (state = initialState, action) => {
  const { type, partialBlogs: newPartialBlogs, filter, hasMore } = action;
  switch (type) {
    case ADD_PARTIAL_BLOGS:
      return Object.assign({}, state, {
        [filter]: {
          loaded: true,
          data: (filter in state ? state[filter].data : [])
            .concat(newPartialBlogs),
          hasMore,
        }
      });
    case UPDATE_PARTIAL_BLOGS:
      return Object.assign({}, state, {
        [filter]: {
          loaded: true,
          data: newPartialBlogs,
          hasMore,
        }
      });
    case LOAD_PARTIAL_BLOGS:
      return Object.assign({}, state, {
        [filter]: {
          loaded: false,
          data: filter in state ? state[filter].data : [],
          hasMore: true,
        }
      });
    default:
      return state;
  }
};

export default partialBlogsByFilter;
