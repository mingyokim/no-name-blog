import { INIT_AUTHORS } from '../actionTypes';

const initAuthors = authors => ({
  type: INIT_AUTHORS,
  authors,
});

export default initAuthors;
