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
      <Grid container spacing={6}>
        <Grid item xs={12} md={3} />
        <Grid item xs={12} md={9}>
          <Link
            to="/"
            variant="h1"
            component={RouterLink}
            color="textSecondary"
          >
            Blog
          </Link>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      <Grid container spacing={6}>
        <Grid item xs={12} md={3}>
          <Link
            to="/"
            variant="overline"
            component={RouterLink}
            color="textSecondary"
          >
            ← back
          </Link>
        </Grid>
        <Grid item xs={12} md={9}>
          <BlogURL currentBlogURL={currentBlogURL} />
        </Grid>
      </Grid>
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
