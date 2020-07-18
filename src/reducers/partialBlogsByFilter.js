import { ADD_PARTIAL_BLOGS, UPDATE_PARTIAL_BLOGS, LOAD_PARTIAL_BLOGS } from '../actions/actionTypes';

const initialState = {
  all: {
    loaded: false,
    data: [],
  },
};

const partialBlogsByFilter = (state = initialState, action) => {
  const { type, partialBlogs: newPartialBlogs, filter } = action;
  switch (type) {
    case ADD_PARTIAL_BLOGS:
      return Object.assign({}, state, {
        [filter]: {
          loaded: true,
          data: (filter in newPartialBlogs ? newPartialBlogs[filter].data : [])
            .concat(newPartialBlogs),
        }
      });
    case UPDATE_PARTIAL_BLOGS:
      return Object.assign({}, state, {
        [filter]: {
          loaded: true,
          data: newPartialBlogs,
        }
      });
    case LOAD_PARTIAL_BLOGS:
      return Object.assign({}, state, {
        [filter]: {
          loaded: false,
          data: filter in state ? state[filter].data : [],
        }
      });
    default:
      return state;
  }
};

export default partialBlogsByFilter;
