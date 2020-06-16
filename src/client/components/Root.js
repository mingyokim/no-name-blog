import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '40px 44px 0 44px',
    [theme.breakpoints.up('md')]: {
      margin: '40px 20% 0 20%',
    }
  },
}));

const Root = ({ route }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {renderRoutes(route.routes)}
    </div>
  );
};

Root.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array.isRequired,
  }).isRequired,
};

export default Root;
