import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import loadPartialBlogsAction from '../../../actions/partialBlogs/loadPartialBlogs';
import removeBlogAction from '../../../actions/blog/removeBlog';

class UpdateBlog extends React.Component {
  constructor(props) {
    super(props);

    const {
      title,
      content
    } = this.props;

    this.state = {
      publishing: false,
      published: false,
      title,
      content,
    };
  }

  updateTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  updateContent = (event) => {
    this.setState({ content: event.target.value });
  }

  publish = () => {
    const {
      loadPartialBlogs,
      author: {
        uid
      },
      id,
      removeBlog,
    } = this.props;

    const {
      title,
      content
    } = this.state;

    const payload = {
      title,
      content,
    };

    this.setState({ publishing: true });
    axios.put(`/api/v1/blogs/${id}`, payload).then(() => {
      loadPartialBlogs(uid);
      this.setState({ published: true });
      removeBlog(id);
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const {
      publishing,
      published,
      title,
      content
    } = this.state;

    if (published) {
      return <Redirect to="/writer" />;
    }
    return (
      <Grid container spacing={5} direction="column">
        <Grid item>
          <TextField
            variant="outlined"
            label="Title"
            onChange={this.updateTitle}
            value={title}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Content"
            onChange={this.updateContent}
            value={content}
            multiline
            fullWidth
            rows={10}
          />
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="flex-end">
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.publish}
                disabled={publishing}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

UpdateBlog.propTypes = {
  authorDisplayName: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  author: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({ author }) => ({ author });

const mapDispatchToProps = dispatch => ({
  loadPartialBlogs: filter => dispatch(loadPartialBlogsAction(filter)),
  removeBlog: (id) => dispatch(removeBlogAction(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBlog);
