import { combineReducers } from 'redux';
import partialBlogsByFilter from './partialBlogsByFilter';
import authors from './authors';
import authorFilter from './authorFilter';
import blogURLs from './blogURLs';
import blogs from './blogs';
import author from './author';

const blogApp = combineReducers({
  partialBlogsByFilter,
  blogURLs,
  blogs,
  authors,
  authorFilter,
  author,
});

export default blogApp;
