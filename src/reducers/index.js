import { combineReducers } from 'redux';
import partialBlogs from './partialBlogs';
import authors from './authors';
import authorFilter from './authorFilter';

const blogApp = combineReducers({
  partialBlogs,
  authors,
  authorFilter,
});

export default blogApp;
