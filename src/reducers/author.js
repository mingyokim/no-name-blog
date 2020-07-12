import { CLEAR_AUTHOR, ADD_AUTHOR } from '../actions/actionTypes';

const initialState = null;

const author = (state = initialState, action) => {
  const { type, author: newAuthor } = action;
  switch (type) {
    case CLEAR_AUTHOR:
      return initialState;
    case ADD_AUTHOR:
      return newAuthor;
    default:
      return state;
  }
};

export default author;
