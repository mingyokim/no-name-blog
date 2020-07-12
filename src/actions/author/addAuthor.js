import { ADD_AUTHOR } from '../actionTypes';

const addAuthor = author => ({
  type: ADD_AUTHOR,
  author,
});

export default addAuthor;
