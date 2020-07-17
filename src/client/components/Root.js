import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(() => ({
  root: {
    padding: '40px 28px 40px 28px',
  },
}));

const Root = ({ route }) => {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth="md" style={{ overflowX: "hidden" }}>
      {renderRoutes(route.routes)}
    </Container>
  );
};

Root.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array.isRequired,
  }).isRequired,
};

export default Root;
