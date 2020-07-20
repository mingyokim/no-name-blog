import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import addPartialBlogsAction from '../../../actions/partialBlogs/addPartialBlogs';
import updatePartialBlogsAction from '../../../actions/partialBlogs/updatePartialBlogs';
import loadPartialBlogsAction from '../../../actions/partialBlogs/loadPartialBlogs';
import addBlogURLsAction from '../../../actions/blogURLs/addBlogURLs';
import Loading from '../../components/blog/PartialBlogLoading';
import PartialBlog from '../../components/blog/PartialBlog';

const styles = () => ({
  root: {
    overflow: 'hidden !important',
  }
});

const getFilter = ({ isFilterOn, userId }) => {
  if (isFilterOn) return userId;
  return 'all';
};

const needsFetching = (partialBlogsByFilter, filter) => {
  if (!(filter in partialBlogsByFilter)) return true;
  const { loaded } = partialBlogsByFilter[filter];
  return !loaded;
};

const BATCH_SIZE = 8;

class PartialBlogsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
    };
  }

  componentDidMount() {
    const {
      authorFilter,
      partialBlogsByFilter,
      updatePartialBlogs,
      addBlogURLs,
    } = this.props;

    const filter = getFilter(authorFilter);

    if (needsFetching(partialBlogsByFilter, filter)) {
      axios.get('/api/v1/partial-blogs/', {
        params: {
          limit: BATCH_SIZE,
        }
      }).then(({ data: { partialBlogs: loadedBlogs } }) => {
        const hasMore = loadedBlogs.length === BATCH_SIZE;
        this.setState({ hasMore });
        updatePartialBlogs(loadedBlogs, filter);
        addBlogURLs(loadedBlogs);
      }).catch((err) => {
        console.log(err);
      });
    } else {
      this.setState({ hasMore: false });
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
      const params = {
        limit: BATCH_SIZE,
      };

      if (newIsFilterOn) {
        params.author_id = newUserId;
      }

      axios.get('/api/v1/partial-blogs', { params })
        .then(({ data: { partialBlogs: newPartialBlogs } }) => {
          updatePartialBlogs(newPartialBlogs, filter);
          addBlogURLs(newPartialBlogs);
          const hasMore = newPartialBlogs.length === BATCH_SIZE;
          this.setState({ hasMore });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  fetchMorePartialBlogs = () => {
    const {
      authorFilter: {
        isFilterOn,
        userId,
      },
      authorFilter,
      partialBlogsByFilter,
      addPartialBlogs,
      addBlogURLs,
    } = this.props;

    const filter = getFilter(authorFilter);

    const { data: partialBlogs } = partialBlogsByFilter[filter];
    const lastPartialBlog = partialBlogs[partialBlogs.length - 1];
    const { createdAt: lastCreatedAt } = lastPartialBlog;

    const params = {
      limit: BATCH_SIZE,
      startAfter: lastCreatedAt,
    };

    if (isFilterOn) {
      params.author_id = userId;
    }

    axios.get('api/v1/partial-blogs', { params })
      .then(({ data: { partialBlogs: loadedBlogs } }) => {
        const hasMore = loadedBlogs.length === BATCH_SIZE;
        this.setState({ hasMore });
        addPartialBlogs(loadedBlogs, filter);
        addBlogURLs(loadedBlogs);
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      partialBlogsByFilter,
      authorFilter,
      classes,
    } = this.props;

    const { hasMore } = this.state;

    const filter = getFilter(authorFilter);

    if (needsFetching(partialBlogsByFilter, filter)) {
      return <Loading />;
    }

    const { data: partialBlogs } = partialBlogsByFilter[filter];

    if (partialBlogs.length === 0) {
      return <Typography variant="body1" color="textSecondary">No blogs yet</Typography>;
    }

    return (
      <InfiniteScroll
        dataLength={partialBlogs.length}
        next={this.fetchMorePartialBlogs}
        hasMore={hasMore}
        loader={<Loading />}
        className={classes.root}
      >
        <Grid container spacing={2} direction="column">
          {partialBlogs.map(({
            id,
            author,
            title,
            preview,
            createdAt,
            url,
          }) => (
              <>
                <Grid item>
                  <PartialBlog
                    author={author}
                    title={title}
                    preview={preview}
                    createdAt={createdAt}
                    url={url}
                  />
                </Grid>
                <Grid item>
                  <Divider />
                </Grid>
              </>
            ))}
        </Grid>
      </InfiniteScroll>
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
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PartialBlogsList));
