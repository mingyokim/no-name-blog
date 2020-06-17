import { combineReducers } from 'redux';
import partialBlogs from './partialBlogs';
import authors from './authors';
import authorFilter from './authorFilter';
import blogURLs from './blogURLs';
import blogs from './blogs';

const blogApp = combineReducers({
  partialBlogs,
  blogURLs,
  blogs,
  authors,
  authorFilter,
});

export default blogApp;
