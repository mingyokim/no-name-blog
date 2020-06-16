import { UPDATE_AUTHOR_FILTER } from '../actionTypes';

const updateAuthorFilter = userId => ({
  type: UPDATE_AUTHOR_FILTER,
  userId,
});

export default updateAuthorFilter;
