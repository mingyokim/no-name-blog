import { CLEAR_AUTHOR_FILTER, UPDATE_AUTHOR_FILTER } from '../actions/actionTypes';

const initialState = {
  isFilterOn: false,
  userId: null,
};

const authorFilter = (state = initialState, action) => {
  const { type, userId } = action;
  switch (type) {
    case CLEAR_AUTHOR_FILTER:
      return initialState;
    case UPDATE_AUTHOR_FILTER:
      return {
        isFilterOn: true,
        userId,
      };
    default:
      return state;
  }
};

export default authorFilter;
