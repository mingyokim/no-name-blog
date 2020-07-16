import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import addBlogAction from '../../../actions/blog/addBlog';
import BlogComponent from '../../components/blog/Blog';
import Loading from '../../components/blog/BlogLoading';

class Blog extends React.Component {
  componentDidMount() {
    const {
      id,
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
      id,
      blogs
    } = this.props;

    if (id in blogs) {
      return (
        <BlogComponent
          {...blogs[id]}
        />
      );
    }

    return <Loading />;
  }
}

const mapStateToProps = ({ blogs }) => ({
  blogs,
});

const mapDispatchToProps = dispatch => ({
  addBlog: blog => dispatch(addBlogAction(blog))
});

Blog.propTypes = {
  blogs: PropTypes.objectOf(PropTypes.shape({
    author: PropTypes.string,
    authorId: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
  addBlog: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
