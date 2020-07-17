import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AuthorsList from '../containers/author/AuthorsList';
import PartialBlogsList from '../containers/blog/PartialBlogsList';

const Home = () => (
  <Grid container spacing={10} direction="column">
    <Grid item>
      <Grid container spacing={6}>
        <Grid item xs={12} md={3} />
        <Grid item xs={12} md={9}>
          <Typography variant="h1">Blog</Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      <Grid container spacing={6}>
        <Grid item xs={12} md={3}>
          <AuthorsList />
        </Grid>
        <Grid item xs={12} md={9}>
          <PartialBlogsList />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default Home;
