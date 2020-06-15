import { combineReducers } from 'redux';
import partialBlogs from './partialBlogs';
import authors from './authors';

const blogApp = combineReducers({
  partialBlogs,
  authors,
});

export default blogApp;
