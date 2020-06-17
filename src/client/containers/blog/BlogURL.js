import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import addBlogURLsAction from '../../../actions/blogURLs/addBlogURLs';

const INVALID_ID = 0;
const EXACT_MATCH = 1;
const PARTIAL_MATCH = 2;

class BlogURL extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // loaded: false,
      loading: true,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: {
          blog_url: currentBlogURL,
        }
      },
      // blogURLs,
      addBlogURLs,
    } = this.props;

    const id = currentBlogURL.split('-').slice(-1)[0];

    // if (id in blogURLs) {
    //   if (blogURLs[id] === currentBlogURL) {
    //     this.setState({ loaded: true, status: EXACT_MATCH });
    //   } else {
    //     this.setState({ loaded: true, status: PARTIAL_MATCH });
    //   }
    // } else {
    axios.get(`/api/v1/partial-blogs/${id}`).then(({
      data: {
        partialBlog: {
          url,
        },
        partialBlog,
      }
    }) => {
      // this.setState({ loading: false });
      addBlogURLs([partialBlog]);
      if (url === currentBlogURL) {
        this.setState({ loading: false, status: EXACT_MATCH });
      } else {
        this.setState({ loading: false, status: PARTIAL_MATCH });
      }
      // }).catch((err) => {
    }).catch(() => {
      // this.setState({ loading: false });
      // console.log(err);
      this.setState({ loading: false, status: INVALID_ID });
    });
    // }
  }

  render() {
    const { loading, status } = this.state;

    const {
      match: {
        params: {
          blog_url: currentBlogURL,
        }
      },
      blogURLs,
    } = this.props;

    const id = currentBlogURL.split('-').slice(-1)[0];
    const trueBlogURL = blogURLs[id];

    if (id in blogURLs) {
      if (trueBlogURL === currentBlogURL) {
        return <p>exact match</p>;
      }
      return <Redirect to={`/blogs/${trueBlogURL}`} />;
    }

    if (loading) {
      return <p>loading</p>;
    }

    switch (status) {
      case EXACT_MATCH:
        return <p>exact match</p>;
      case PARTIAL_MATCH:
        return <Redirect to={`/blogs/${trueBlogURL}`} />;
      default:
        return <Redirect to="page-not-found" />;
    }
  }
}

const mapStateToProps = ({ blogURLs }) => ({
  blogURLs,
});

const mapDispatchToProps = dispatch => ({
  addBlogURLs: userId => dispatch(addBlogURLsAction(userId))
});

BlogURL.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      blog_url: PropTypes.string
    })
  }).isRequired,
  blogURLs: PropTypes.objectOf(PropTypes.string).isRequired,
  addBlogURLs: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogURL);
