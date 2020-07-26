import React from 'react';
import Grid from '@material-ui/core/Grid';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

import Navbar from '../../containers/writer/Navbar';

const WriterRoot = ({ route }) => (
  <Grid container direction="column" spacing={10}>
    <Grid item>
      <Navbar />
    </Grid>
    <Grid item>
      {renderRoutes(route.routes)}
    </Grid>
  </Grid>
);

WriterRoot.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array.isRequired,
  }).isRequired,
};

export default WriterRoot;
