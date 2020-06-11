import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PageNotFound = ({ staticContext = {} }) => {
  staticContext.status = 404;
  return <h2>404</h2>;
};

const RedirectToPageNotFound = () => <Redirect to="/page-not-found" />;

PageNotFound.propTypes = {
  staticContext: PropTypes.shape({}),
};

PageNotFound.defaultProps = {
  staticContext: {},
};

export {
  PageNotFound,
  RedirectToPageNotFound,
};
