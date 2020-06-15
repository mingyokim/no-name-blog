import React from 'react';
import Grid from '@material-ui/core/Grid';
import AuthorsList from '../containers/author/AuthorsList';

const Home = () => (
  <Grid container spacing={3} direction="column">
    <Grid item xs={12}>
      <Grid container spacing={3}>
        <Grid item xs={3} />
        <Grid item xs={9}>
          <p>Bloggo</p>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <AuthorsList />
        </Grid>
        <Grid item xs={9}>
          <p>Blogs</p>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

// const Home = () => (
//   <Grid container spacing={3}>
//     <Grid item xs={3}>
//       <Grid container spacing={3} direction="column">
//         <Grid item xs={3} />
//         <Grid item xs={9}>
//           <p>Authors</p>
//         </Grid>
//       </Grid>
//     </Grid>
//     <Grid item xs={9}>
//       <Grid container spacing={3} direction="column">
//         <Grid item xs={3}>
//           <p>Blog</p>
//         </Grid>
//         <Grid item xs={9}>
//           <p>Blogs</p>
//         </Grid>
//       </Grid>
//     </Grid>
//   </Grid>
// );

export default Home;

// class Home extends React.Component {
//   componentDidMount() {
//     const {
//       partialBlogs,
//       partialBlogs: {
//         loaded
//       },
//       addPartialBlogs
//     } = this.props;

//     if (!loaded) {
//       axios.get('/api/v1/partial-blogs/').then(({ data: { partialBlogs: newPartialBLogs } }) => {
//         addPartialBlogs(newPartialBLogs);
//       }).catch((err) => {
//         console.log(err);
//       });
//     }
//   }

//   render() {
//     const {
//       partialBlogs: {
//         data
//       }
//     } = this.props;
//     return (
//       <>
//         <h2>Home</h2>
//         <Link to="writer">Go to writer</Link>
//         <Toggle />
//         {data.map(({ id }) => (<p key={id}>{id}</p>))}
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ partialBlogs }) => ({
//   partialBlogs
// });

// const mapDispatchToProps = dispatch => ({
//   addPartialBlogs: partialBlogs => dispatch(addPartialBlogsAction(partialBlogs)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
