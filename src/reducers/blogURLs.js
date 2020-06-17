import { ADD_BLOG_URLS } from '../actions/actionTypes';

const initialState = {};

const blogURLs = (state = initialState, action) => {
  const { type, blogURLs: newURLs } = action;
  switch (type) {
    case ADD_BLOG_URLS:
      return Object.assign(
        {},
        state,
        newURLs.reduce((stateAcc, { id, url }) => Object.assign({}, stateAcc, {
          [id]: url
        }, {}))
      );
    default:
      return state;
  }
};

export default blogURLs;
