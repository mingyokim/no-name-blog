import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

const Root = ({ route }) => (
  <div>
    {renderRoutes(route.routes)}
  </div>
);

Root.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array.isRequired,
  }).isRequired,
};

export default Root;
