import React from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
  title: {
    width: '40%',
  },
  subhead: {
    width: '30%',
  },
  body1: {
    width: '100%',
  },
  body2: {
    width: '95%',
  },
  body3: {
    width: '97.5%',
  }
});

const BlogLoading = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Skeleton height={48} className={classes.title} />
      </Grid>
      <Grid item>
        <Grid container spacing={0} direction="column">
          <Grid item>
            <Skeleton height={32} width={100} />
          </Grid>
          <Grid item>
            <Skeleton height={32} width={80} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Skeleton height={32} className={classes.body1} />
        <Skeleton height={32} className={classes.body2} />
        <Skeleton height={32} className={classes.body1} />
        <Skeleton height={32} className={classes.body3} />
        <Skeleton height={32} className={classes.body2} />
        <Skeleton height={32} className={classes.body1} />
      </Grid>
    </Grid>
  );
};

export default BlogLoading;
