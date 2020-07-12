import { combineReducers } from 'redux';
import partialBlogs from './partialBlogs';
import authors from './authors';
import authorFilter from './authorFilter';
import blogURLs from './blogURLs';
import blogs from './blogs';
import author from './author';

const blogApp = combineReducers({
  partialBlogs,
  blogURLs,
  blogs,
  authors,
  authorFilter,
  author,
});

export default blogApp;
