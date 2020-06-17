import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import addBlogURLsAction from '../../../actions/blogURLs/addBlogURLs';

class BlogURL extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
      }
      // }).catch((err) => {
    }).catch(() => {
      // this.setState({ loading: false });
      // console.log(err);
      this.setState({ loading: false });
    });
    // }
  }

  render() {
    const { loading } = this.state;

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

    return <Redirect to="page-not-found" />;
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
