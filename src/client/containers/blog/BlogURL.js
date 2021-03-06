import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import addBlogURLsAction from '../../../actions/blogURLs/addBlogURLs';
import Blog from './Blog';
import Loading from '../../components/blog/BlogLoading';

class BlogURL extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const {
      currentBlogURL,
      blogURLs,
      addBlogURLs,
    } = this.props;

    const id = currentBlogURL.split('-').slice(-1)[0];

    if (id in blogURLs) {
      return;
    }

    axios.get(`/api/v1/partial-blogs/${id}`).then(({
      data: {
        partialBlog: {
          url,
        },
        partialBlog,
      }
    }) => {
      addBlogURLs([partialBlog]);
      if (url === currentBlogURL) {
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
    }).catch(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { loading } = this.state;

    const {
      currentBlogURL,
      blogURLs,
    } = this.props;

    const id = currentBlogURL.split('-').slice(-1)[0];
    const trueBlogURL = blogURLs[id];

    if (id in blogURLs) {
      if (trueBlogURL === currentBlogURL) {
        return <Blog id={id} />;
      }
      return <Redirect to={`/blogs/${trueBlogURL}`} />;
    }

    if (loading) {
      return <Loading />;
    }

    return <Redirect to="page-not-found" />;
  }
}

const mapStateToProps = ({ blogURLs }) => ({
  blogURLs,
});

const mapDispatchToProps = dispatch => ({
  addBlogURLs: blogURL => dispatch(addBlogURLsAction(blogURL))
});

BlogURL.propTypes = {
  currentBlogURL: PropTypes.string.isRequired,
  blogURLs: PropTypes.objectOf(PropTypes.string).isRequired,
  addBlogURLs: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogURL);
