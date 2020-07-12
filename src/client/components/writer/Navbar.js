import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const Navbar = ({
  author: {
    photoURL,
  }
}) => (
  <Grid justify="flex-end" container>
      <Grid item>
        <Avatar src={photoURL} />
      </Grid>
    </Grid>
);

Navbar.propTypes = {
  author: PropTypes.shape({
    photoURL: PropTypes.string,
  }).isRequired,
};

export default Navbar;
