import { combineReducers } from 'redux';
import { ADD_BLOGS } from '../actions';

const blogs = (state = [], action) => {
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
  blogs,
});

export default blogApp;
