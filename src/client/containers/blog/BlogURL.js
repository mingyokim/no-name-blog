import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import addBlogURLsAction from '../../../actions/blogURLs/addBlogURLs';

const INVALID_ID = 0;
const EXACT_MATCH = 1;
const PARTIAL_MATCH = 2;

class BlogURL extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: {
          blog_url: currentBlogURL,
        }
      },
      blogURLs,
      addBlogURLs,
    } = this.props;

    const id = currentBlogURL.split('-').slice(-1)[0];

    if (id in blogURLs) {
      if (blogURLs[id] === currentBlogURL) {
        this.setState({ loaded: true, status: EXACT_MATCH });
      } else {
        this.setState({ loaded: true, status: PARTIAL_MATCH });
      }
    } else {
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
          this.setState({ loaded: true, status: EXACT_MATCH });
        } else {
          this.setState({ loaded: true, status: PARTIAL_MATCH });
        }
      }).catch((err) => {
        console.log(err);
        this.setState({ loaded: true, status: INVALID_ID });
      });
    }
  }

  render() {
    const { loaded, status } = this.state;

    const {
      match: {
        params: {
          blog_url: currentBlogURL,
        }
      },
      blogURLs,
    } = this.props;

    const id = currentBlogURL.split('-').slice(-1)[0];

    if (id in blogURLs) {
      if (blogURLs[id] === currentBlogURL) {
        return <p>{EXACT_MATCH}</p>;
      }
      return <p>{PARTIAL_MATCH}</p>;
    }

    if (loaded) {
      return <p>{status}</p>;
    }

    return <p>loading</p>;
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
