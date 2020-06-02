import React from 'react';
import { Redirect } from 'react-router-dom';

const PageNotFound = () => (
  <h2>404</h2>
);

const RedirectToPageNotFound = () => <Redirect to="/page-not-found" />;

export {
  PageNotFound,
  RedirectToPageNotFound,
};
