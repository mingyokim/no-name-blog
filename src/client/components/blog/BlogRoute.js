import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BlogURL from '../../containers/blog/BlogURL';

const useStyles = makeStyles(() => ({
  root: {
    color: '#7D7D7D',
  },
}));

const BlogRoute = ({
  match: {
    params: {
      blog_url: currentBlogURL,
    }
  },
}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={10} direction="column">
      <Grid item>
        <Typography variant="h1" className={classes.root}>Blog</Typography>
      </Grid>
      <Grid item>
        <BlogURL currentBlogURL={currentBlogURL} />
      </Grid>
    </Grid>
  );
};

BlogRoute.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      blog_url: PropTypes.string,
    })
  }).isRequired
};

export default BlogRoute;
