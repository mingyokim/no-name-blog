import { INIT_AUTHORS } from '../actions/actionTypes';

const initialState = {
  loaded: false,
  data: [],
};

const authors = (state = initialState, action) => {
  const { type, authors: newAuthors } = action;
  switch (type) {
    case INIT_AUTHORS:
      return {
        loaded: true,
        data: newAuthors,
      };
    default:
      return state;
  }
};

export default authors;
