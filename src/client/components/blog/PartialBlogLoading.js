import React from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
  titleSkeleton: {
    width: '40%',
  }
});

const PartialBlogLoading = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={0} direction="column">
      <Grid item>
        <Skeleton height={48} className={classes.titleSkeleton} />
      </Grid>
      {/* <Grid item>
        {loading
          ? <Skeleton height={32} className={classes.nameSkeleton} />
          : <Typography variant="body2">{preview}</Typography>}
      </Grid> */}
      <Grid item>
        <Skeleton height={32} width={100} />
      </Grid>
    </Grid>
  );
};

export default PartialBlogLoading;