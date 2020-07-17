import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import BlogURL from '../../containers/blog/BlogURL';

const BlogRoute = ({
  match: {
    params: {
      blog_url: currentBlogURL,
    }
  },
}) => (
  <Grid container spacing={10} direction="column">
    <Grid item>
      <Link
        to="/"
        variant="h1"
        component={RouterLink}
        color="textSecondary"
      >
        Blog
      </Link>
    </Grid>
    <Grid item>
      <BlogURL currentBlogURL={currentBlogURL} />
    </Grid>
  </Grid>
);

BlogRoute.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      blog_url: PropTypes.string,
    })
  }).isRequired
};

export default BlogRoute;
