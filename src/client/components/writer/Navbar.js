import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';

const Navbar = ({
  author: {
    photoURL,
  }
}) => {
  const {
    pathname
  } = useLocation();
  const isWriterHome = pathname === '/writer';
  return (
    <Grid justify={isWriterHome ? 'flex-end' : 'space-between'} container>
      {isWriterHome ?
        null :
        (
          <Grid item>
            <IconButton
              aria-label="back"
              component={Link}
              to="/writer"
            >
              <NavigateBeforeRoundedIcon fontSize="large" />
            </IconButton>
          </Grid>
        )
      }
      <Grid item>
        <Avatar src={photoURL} />
      </Grid>
    </Grid>
  )
};

Navbar.propTypes = {
  author: PropTypes.shape({
    photoURL: PropTypes.string,
  }).isRequired,
};

export default Navbar;
