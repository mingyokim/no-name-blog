import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import addPartialBlogsAction from '../../../actions/partialBlogs/addPartialBlogs';
import updatePartialBlogsAction from '../../../actions/partialBlogs/updatePartialBlogs';
import loadPartialBlogsAction from '../../../actions/partialBlogs/loadPartialBlogs';
import addBlogURLsAction from '../../../actions/blogURLs/addBlogURLs';
import PartialBlogsListComponent from '../../components/blog/PartialBlogsList';

class PartialBlogsList extends React.Component {
  componentDidMount() {
    const {
      partialBlogs: {
        loaded
      },
      addPartialBlogs,
      addBlogURLs,
    } = this.props;

    if (!loaded) {
      axios.get('/api/v1/partial-blogs/').then(({ data: { partialBlogs } }) => {
        addPartialBlogs(partialBlogs);
        addBlogURLs(partialBlogs);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      authorFilter: {
        isFilterOn,
        userId: newUserId,
      },
      updatePartialBlogs,
      loadPartialBlogs,
      addBlogURLs,
    } = this.props;

    const {
      authorFilter: {
        userId: prevUserId,
      }
    } = prevProps;

    if (newUserId !== prevUserId) {
      loadPartialBlogs();
      if (isFilterOn) {
        axios.get('/api/v1/partial-blogs', {
          params: {
            author_id: newUserId,
          }
        }).then(({ data: { partialBlogs } }) => {
          updatePartialBlogs(partialBlogs);
          addBlogURLs(partialBlogs);
        }).catch((err) => {
          console.log(err);
        });
      } else {
        axios.get('/api/v1/partial-blogs/').then(({ data: { partialBlogs } }) => {
          updatePartialBlogs(partialBlogs);
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  }

  render() {
    const {
      partialBlogs: {
        loaded,
        data: partialBlogs
      },
    } = this.props;

    return (
      <PartialBlogsListComponent loaded={loaded} partialBlogs={partialBlogs} />
    );
  }
}

PartialBlogsList.propTypes = {
  partialBlogs: PropTypes.shape({
    loaded: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      author: PropTypes.string,
      title: PropTypes.string,
      preview: PropTypes.string,
      createdAt: PropTypes.string,
      url: PropTypes.string,
    })),
  }).isRequired,
  addPartialBlogs: PropTypes.func.isRequired,
  updatePartialBlogs: PropTypes.func.isRequired,
  loadPartialBlogs: PropTypes.func.isRequired,
  addBlogURLs: PropTypes.func.isRequired,
  authorFilter: PropTypes.shape({
    isFilterOn: PropTypes.bool,
    userId: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({ partialBlogs, authorFilter }) => ({
  partialBlogs,
  authorFilter
});

const mapDispatchToProps = dispatch => ({
  addPartialBlogs: partialBlogs => dispatch(addPartialBlogsAction(partialBlogs)),
  updatePartialBlogs: partialBlogs => dispatch(updatePartialBlogsAction(partialBlogs)),
  loadPartialBlogs: () => dispatch(loadPartialBlogsAction()),
  addBlogURLs: partialBlogs => dispatch(addBlogURLsAction(partialBlogs))
});

export default connect(mapStateToProps, mapDispatchToProps)(PartialBlogsList);
