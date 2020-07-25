import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import addBlogAction from '../../../actions/blog/addBlog';
import UpdateBlogComponent from '../../components/writer/UpdateBlog';

class UpdateBlog extends React.Component {
  componentDidMount() {
    const {
      match: {
        params: {
          blog_id: id,
        }
      },
      blogs,
      addBlog
    } = this.props;

    if (id in blogs) {
      return;
    }

    axios.get(`/api/v1/blogs/${id}`).then(({
      data: {
        blog,
      }
    }) => {
      addBlog(blog);
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const {
      blogs,
      match: {
        params: {
          blog_id: id,
        }
      },
    } = this.props;

    if (id in blogs) {
      const {
        author,
        content,
        title
      } = blogs[id];
      return (
        <UpdateBlogComponent
          authorDisplayName={author}
          id={id}
          content={content}
          title={title}
        />
      );
    }

    return (
      <Grid container justify="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ blogs }) => ({
  blogs,
});

const mapDispatchToProps = dispatch => ({
  addBlog: blog => dispatch(addBlogAction(blog))
});

UpdateBlog.propTypes = {
  blogs: PropTypes.objectOf(PropTypes.shape({
    author: PropTypes.string,
    authorId: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
  addBlog: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      blog_id: PropTypes.string,
    })
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBlog);
