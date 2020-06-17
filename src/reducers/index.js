import { combineReducers } from 'redux';
import partialBlogs from './partialBlogs';
import authors from './authors';
import authorFilter from './authorFilter';
import blogURLs from './blogURLs';

const blogApp = combineReducers({
  partialBlogs,
  blogURLs,
  authors,
  authorFilter,
});

export default blogApp;
