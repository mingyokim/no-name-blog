import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { connect } from 'react-redux';

import displayDate from '../../helper/displayDate';
import loadPartialBlogsAction from '../../../actions/partialBlogs/loadPartialBlogs';

class AuthorPartialBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      isDeleting: false,
    };
  }

  closeDialog = () => {
    this.setState({ isDialogOpen: false });
  }

  openDialog = () => {
    this.setState({ isDialogOpen: true });
  }

  deleteBlog = () => {
    this.setState({ isDeleting: true });

    const {
      id,
      loadPartialBlogs,
      author: {
        uid
      }
    } = this.props;

    axios.delete(`/api/v1/blogs/${id}`)
      .then(() => {
        this.setState({ isDeleting: false, isDialogOpen: false });
        loadPartialBlogs(uid);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isDeleting: false, isDialogOpen: false });
      });
  }

  render() {
    const {
      authorDisplayName,
      title,
      preview,
      createdAt,
      url
    } = this.props;
    const { isDialogOpen, isDeleting } = this.state;

    const date = new Date(createdAt);
    return (
      <>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Grid container spacing={0} direction="column">
              <Grid item>
                <Link
                  to={`/blogs/${url}`}
                  variant="h2"
                  component={RouterLink}
                  color="inherit"
                >
                  {title}
                </Link>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" color="textSecondary">{`${displayDate(date)} · ${authorDisplayName}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="outlined"
                  color="default"
                >
                  Edit
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={this.openDialog}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          open={isDialogOpen}
          onClose={this.closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            disableTypography
          >
            <Typography variant="h4">
              {`Delete the blog "${title}"?`}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you delete it, then it's gone forever!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteBlog} color="secondary" disabled={isDeleting}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

// const AuthorPartialBlog = ({
//   author,
//   title,
//   preview,
//   createdAt,
//   url
// }) => {
//   const date = new Date(createdAt);
//   return (
//     <Grid container spacing={2} direction="column">
//       <Grid item>
//         <Grid container spacing={0} direction="column">
//           <Grid item>
//             <Link
//               to={`/blogs/${url}`}
//               variant="h2"
//               component={RouterLink}
//               color="inherit"
//             >
//               {title}
//             </Link>
//           </Grid>
//           <Grid item>
//             <Typography variant="subtitle1" color="textSecondary">{`${displayDate(date)} · ${author}`}</Typography>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item>
//         <Grid container spacing={2}>
//           <Grid item>
//             <Button
//               variant="outlined"
//               color="default"
//             >
//               Edit
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="outlined"
//               color="secondary"
//             >
//               Delete
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

AuthorPartialBlog.propTypes = {
  authorDisplayName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  author: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({ author }) => ({ author });

const mapDispatchToProps = dispatch => ({
  loadPartialBlogs: filter => dispatch(loadPartialBlogsAction(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPartialBlog);
