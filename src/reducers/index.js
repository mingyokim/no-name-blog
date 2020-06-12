import { combineReducers } from 'redux';
import { ADD_BLOGS } from '../actions';

const partialBlogs = (state = [], action) => {
  const { type } = action;
  switch (type) {
    case ADD_BLOGS:
      return [
        ...state,
        ...action.blogs,
      ];
    default:
      return state;
  }
};

const blogApp = combineReducers({
  partialBlogs,
});

export default blogApp;
