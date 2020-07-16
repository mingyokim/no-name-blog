import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AuthorsList from '../containers/author/AuthorsList';
import PartialBlogsList from '../containers/blog/PartialBlogsList';

const Home = () => (
  <Grid container spacing={10} direction="column">
    <Grid item>
      <Typography variant="h1">Blog</Typography>
    </Grid>
    <Grid item>
      <Grid container spacing={6} direction="column">
        <Grid item>
          <AuthorsList />
        </Grid>
        <Grid item>
          <PartialBlogsList />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default Home;
