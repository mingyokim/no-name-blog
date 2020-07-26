import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import Navbar from '../../containers/writer/Navbar';
import PartialBlogsList from '../../containers/writer/AuthorPartialBlogsList';

const WriterHome = () => (
  <Grid container direction="column" spacing={10}>
    <Grid item>
      <Grid container justify="space-between" spacing={3}>
        <Grid item xs={12} md="auto">
          <Typography variant="h1">Your blogs</Typography>
        </Grid>
        <Grid item xs={12} md="auto">
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/writer/new-blog"
          >
            Create a blog
          </Button>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      <PartialBlogsList />
    </Grid>
  </Grid>
);

export default WriterHome;
