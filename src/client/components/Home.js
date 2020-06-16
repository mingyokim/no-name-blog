import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AuthorsList from '../containers/author/AuthorsList';
import PartialBlogsList from '../containers/blog/PartialBlogsList';

// const Home = () => (
//   <Grid container spacing={10} direction="column">
//     <Grid item xs={12}>
//       <Grid container spacing={3}>
//         <Grid item xs={3} />
//         <Grid item xs={9}>
//           <Typography variant="h3">Blog</Typography>
//         </Grid>
//       </Grid>
//     </Grid>
//     <Grid item xs={12}>
//       <Grid container spacing={3}>
//         <Grid item xs={3}>
//           <AuthorsList />
//         </Grid>
//         <Grid item xs={9}>
//           <PartialBlogsList />
//         </Grid>
//       </Grid>
//     </Grid>
//   </Grid>
// );

const Home = () => (
  <Grid container spacing={10} direction="column">
    <Grid item>
      <Typography variant="h3">Blog</Typography>
    </Grid>
    <Grid item>
      <Grid container spacing={3} direction="column" alignItems="stretch">
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
