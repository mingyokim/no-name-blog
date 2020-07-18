import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import addPartialBlogsAction from '../../../actions/partialBlogs/addPartialBlogs';
import updatePartialBlogsAction from '../../../actions/partialBlogs/updatePartialBlogs';
import loadPartialBlogsAction from '../../../actions/partialBlogs/loadPartialBlogs';
import addBlogURLsAction from '../../../actions/blogURLs/addBlogURLs';
import PartialBlogsListComponent from '../../components/blog/PartialBlogsList';

const getFilter = ({ isFilterOn, userId }) => {
  if (isFilterOn) return userId;
  return 'all';
};

const needsFetching = (partialBlogsByFilter, filter) => {
  if (!(filter in partialBlogsByFilter)) return true;
  const { loaded } = partialBlogsByFilter[filter];
  return !loaded;
};

class PartialBlogsList extends React.Component {
  componentDidMount() {
    const {
      authorFilter,
      partialBlogsByFilter,
      addPartialBlogs,
      addBlogURLs,
    } = this.props;

    const filter = getFilter(authorFilter);

    if (needsFetching(partialBlogsByFilter, filter)) {
      axios.get('/api/v1/partial-blogs/').then(({ data: { partialBlogs: loadedBlogs } }) => {
        addPartialBlogs(loadedBlogs, filter);
        addBlogURLs(loadedBlogs);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      authorFilter: {
        isFilterOn: newIsFilterOn,
        userId: newUserId,
      },
      authorFilter,
      partialBlogsByFilter,
      updatePartialBlogs,
      loadPartialBlogs,
      addBlogURLs,
    } = this.props;

    const {
      authorFilter: {
        userId: prevUserId,
        isFilterOn: prevIsFilterOn,
      }
    } = prevProps;

    if (newIsFilterOn === prevIsFilterOn && newUserId === prevUserId) {
      return;
    }

    const filter = getFilter(authorFilter);

    if (needsFetching(partialBlogsByFilter, filter)) {
      loadPartialBlogs(filter);
      let promise;
      if (newIsFilterOn) {
        promise = axios.get('/api/v1/partial-blogs', {
          params: {
            author_id: newUserId,
          }
        });
      } else {
        promise = axios.get('/api/v1/partial-blogs/');
      }

      promise
        .then(({ data: { partialBlogs: newPartialBlogs } }) => {
          updatePartialBlogs(newPartialBlogs, filter);
          addBlogURLs(newPartialBlogs);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    const {
      partialBlogsByFilter,
      authorFilter,
    } = this.props;

    const filter = getFilter(authorFilter);

    if (needsFetching(partialBlogsByFilter, filter)) {
      return <PartialBlogsListComponent loaded={false} partialBlogs={[]} />;
    }

    const { data: partialBlogs } = partialBlogsByFilter[filter];

    return (
      <PartialBlogsListComponent loaded partialBlogs={partialBlogs} />
    );
  }
}

PartialBlogsList.propTypes = {
  partialBlogsByFilter: PropTypes.objectOf(PropTypes.shape({
    loaded: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      author: PropTypes.string,
      title: PropTypes.string,
      preview: PropTypes.string,
      createdAt: PropTypes.string,
      url: PropTypes.string,
    })),
  })).isRequired,
  addPartialBlogs: PropTypes.func.isRequired,
  updatePartialBlogs: PropTypes.func.isRequired,
  loadPartialBlogs: PropTypes.func.isRequired,
  addBlogURLs: PropTypes.func.isRequired,
  authorFilter: PropTypes.shape({
    isFilterOn: PropTypes.bool,
    userId: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({ partialBlogsByFilter, authorFilter }) => ({
  partialBlogsByFilter,
  authorFilter
});

const mapDispatchToProps = dispatch => ({
  addPartialBlogs: (partialBlogs, filter) => dispatch(addPartialBlogsAction(partialBlogs, filter)),
  updatePartialBlogs: (partialBlogs, filter) => dispatch(
    updatePartialBlogsAction(partialBlogs, filter)
  ),
  loadPartialBlogs: filter => dispatch(loadPartialBlogsAction(filter)),
  addBlogURLs: partialBlogs => dispatch(addBlogURLsAction(partialBlogs))
});

export default connect(mapStateToProps, mapDispatchToProps)(PartialBlogsList);
