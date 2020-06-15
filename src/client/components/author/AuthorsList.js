import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
  avatar: {
    width: '24px',
    height: '24px',
  },
  nameSkeleton: {
    width: '40%',
  }
});

const Author = ({ loading, displayName, photoURL }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        {loading
          ? <Skeleton variant="circle" width={24} height={24} />
          : <Avatar src={photoURL} className={classes.avatar} />}
      </Grid>
      <Grid item sm={8}>
        {loading
          ? <Skeleton height={32} className={classes.nameSkeleton} />
          : <Typography variant="subtitle1">{displayName}</Typography>}
      </Grid>
    </Grid>
  );
};

Author.propTypes = {
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

Author.defaultProps = {
  displayName: '',
  photoURL: '',
};

const AuthorsList = ({ loaded, authors }) => (
  <>
    {loaded
      ? authors.map(({ display_name: displayName, photo_URL: photoURL, id }) => (
        <Author
          key={id}
          displayName={displayName}
          photoURL={photoURL}
          loading={false}
        />
      ))
      : <Author loading />}
  </>
);

AuthorsList.propTypes = {
  loaded: PropTypes.bool.isRequired,
  authors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    display_name: PropTypes.string,
    photo_URL: PropTypes.string,
  })).isRequired,
};

export default AuthorsList;
