import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
// import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
  avatar: {
    width: '24px',
    height: '24px',
  },
  nameSkeleton: {
    width: '100px',
  }
});

const AuthorLoading = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Skeleton variant="circle" width={24} height={24} />
      </Grid>
      <Grid item sm={8}>
        <Skeleton height={32} className={classes.nameSkeleton} />
      </Grid>
    </Grid>
  );
};

const Author = ({
  displayName, photoURL, isFilterOn, userId, clearFilter, updateFilter
}) => {
  if (isFilterOn) {
    return (
      <Chip
        variant="default"
        label={displayName}
        avatar={<Avatar src={photoURL} />}
        onDelete={clearFilter}
      />
    );
  }
  return (
    <Chip
      clickable
      variant="outlined"
      label={displayName}
      avatar={<Avatar src={photoURL} />}
      onClick={() => updateFilter(userId)}
    />
  );
};

// return (
//   <Grid container spacing={2} alignItems="center">
//     <Grid item>
//       {loading
//         ? <Skeleton variant="circle" width={24} height={24} />
//         : <Avatar src={photoURL} className={classes.avatar} />}
//     </Grid>
//     <Grid item sm={8}>
//       {loading
//         ? <Skeleton height={32} className={classes.nameSkeleton} />
//         : <Typography variant="subtitle1">{displayName}</Typography>}
//     </Grid>
//   </Grid>
// );

Author.propTypes = {
  displayName: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  isFilterOn: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  clearFilter: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
};

const AuthorsList = ({
  loaded, authors, filterUserId, clearFilter, updateFilter
}) => {
  if (loaded) {
    return (
      <Grid container spacing={2}>
        {authors.map(({ display_name: displayName, photo_URL: photoURL, id }) => (
          <Grid item key={id}>
            <Author
              displayName={displayName}
              photoURL={photoURL}
              isFilterOn={id === filterUserId}
              userId={id}
              clearFilter={clearFilter}
              updateFilter={updateFilter}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
  return <AuthorLoading />;
};

AuthorsList.propTypes = {
  loaded: PropTypes.bool.isRequired,
  authors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    display_name: PropTypes.string,
    photo_URL: PropTypes.string,
  })).isRequired,
  filterUserId: PropTypes.string,
  clearFilter: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
};

AuthorsList.defaultProps = {
  filterUserId: null,
};

export default AuthorsList;
