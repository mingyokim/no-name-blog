import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '40px 44px 40px 44px',
    [theme.breakpoints.up('md')]: {
      padding: '40px 20% 40px 20%',
    },
    height: '100vh'
  },
}));

const Root = ({ route }) => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
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
