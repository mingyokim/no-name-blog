import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import Navbar from '../../containers/writer/Navbar';

const WriterHome = () => (
  <Grid container direction="column" alignItems="flex-end" spacing={10}>
    <Grid item>
      <Navbar />
    </Grid>
    <Grid item>
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
);

export default WriterHome;
