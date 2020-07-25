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
import addBlogURLsAction from '../../../actions/blogURLs/addBlogURLs';
import Loading from '../../components/blog/PartialBlogLoading';
import PartialBlog from '../../components/writer/AuthorPartialBlog';

const styles = () => ({
  root: {
    overflow: 'hidden !important',
  }
});

const needsFetching = (partialBlogsByFilter, filter) => {
  if (!(filter in partialBlogsByFilter)) return true;
  const { loaded } = partialBlogsByFilter[filter];
  return !loaded;
};

const BATCH_SIZE = 8;

class AdminPartialBlogsList extends React.Component {
  componentDidMount() {
    const {
      author: {
        uid
      },
      partialBlogsByFilter,
      updatePartialBlogs,
      addBlogURLs,
    } = this.props;

    if (needsFetching(partialBlogsByFilter, uid)) {
      axios.get('/api/v1/partial-blogs/', {
        params: {
          limit: BATCH_SIZE,
          author_id: uid,
        }
      }).then(({ data: { partialBlogs: loadedBlogs } }) => {
        const hasMore = loadedBlogs.length === BATCH_SIZE;
        updatePartialBlogs({ partialBlogs: loadedBlogs, filter: uid, hasMore });
        addBlogURLs(loadedBlogs);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      updatePartialBlogs,
      partialBlogsByFilter,
      author: {
        uid
      },
    } = this.props;

    const {
      partialBlogsByFilter: prevPartialBlogsByFilter
    } = prevProps;

    const {
      loaded: newLoaded
    } = partialBlogsByFilter[uid];

    const prevPartialBlogs = prevPartialBlogsByFilter[uid];
    if (!prevPartialBlogs) return;
    const {
      loaded: prevLoaded
    } = prevPartialBlogs;

    if (newLoaded || newLoaded === prevLoaded) return;

    axios.get('/api/v1/partial-blogs/', {
      params: {
        limit: BATCH_SIZE,
        author_id: uid,
      }
    }).then(({ data: { partialBlogs: loadedBlogs } }) => {
      const hasMore = loadedBlogs.length === BATCH_SIZE;
      updatePartialBlogs({ partialBlogs: loadedBlogs, filter: uid, hasMore });
      addBlogURLs(loadedBlogs);
    }).catch((err) => {
      console.log(err);
    });
  }

  fetchMorePartialBlogs = () => {
    const {
      author: {
        uid,
      },
      partialBlogsByFilter,
      addPartialBlogs,
      addBlogURLs,
    } = this.props;

    const { data: partialBlogs } = partialBlogsByFilter[uid];
    const lastPartialBlog = partialBlogs[partialBlogs.length - 1];
    const { createdAt: lastCreatedAt } = lastPartialBlog;

    const params = {
      limit: BATCH_SIZE,
      startAfter: lastCreatedAt,
      author_id: uid,
    };

    axios.get('api/v1/partial-blogs', { params })
      .then(({ data: { partialBlogs: loadedBlogs } }) => {
        const hasMore = loadedBlogs.length === BATCH_SIZE;
        addPartialBlogs({ partialBlogs: loadedBlogs, filter: uid, hasMore });
        addBlogURLs(loadedBlogs);
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      partialBlogsByFilter,
      classes,
      author: {
        uid,
      },
    } = this.props;

    if (needsFetching(partialBlogsByFilter, uid)) {
      return <Loading />;
    }

    const {
      data: partialBlogs,
      hasMore,
    } = partialBlogsByFilter[uid];

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
        <Grid container spacing={3} direction="column">
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
                    authorDisplayName={author}
                    title={title}
                    preview={preview}
                    createdAt={createdAt}
                    url={url}
                    id={id}
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

AdminPartialBlogsList.propTypes = {
  partialBlogsByFilter: PropTypes.objectOf(PropTypes.shape({
    loaded: PropTypes.bool,
    hasMore: PropTypes.bool,
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
  addBlogURLs: PropTypes.func.isRequired,
  author: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({ partialBlogsByFilter, author }) => ({
  partialBlogsByFilter,
  author,
});

const mapDispatchToProps = dispatch => ({
  addPartialBlogs: ({ partialBlogs, filter, hasMore }) => dispatch(addPartialBlogsAction({ partialBlogs, filter, hasMore })),
  updatePartialBlogs: ({ partialBlogs, filter, hasMore }) => dispatch(updatePartialBlogsAction({ partialBlogs, filter, hasMore })),
  addBlogURLs: partialBlogs => dispatch(addBlogURLsAction(partialBlogs))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminPartialBlogsList));
