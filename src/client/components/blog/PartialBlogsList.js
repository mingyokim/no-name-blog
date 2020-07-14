import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Divider from '@material-ui/core/Divider';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  titleSkeleton: {
    width: '40%',
  }
});

const PartialBlog = ({
  loading,
  author,
  title,
  preview,
  createdAt,
  url
}) => {
  const classes = useStyles();
  const date = new Date(createdAt);
  const month = date.getMonth();
  const day = date.getDate();
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        {loading
          ? <Skeleton height={48} className={classes.titleSkeleton} />
          : (
            <Link
              to={`/blogs/${url}`}
              variant="h1"
              component={RouterLink}
              color="inherit"
            >
              {title}
            </Link>
          )}
      </Grid>
      {/* <Grid item>
        {loading
          ? <Skeleton height={32} className={classes.nameSkeleton} />
          : <Typography variant="body2">{preview}</Typography>}
      </Grid> */}
      <Grid item>
        {loading
          ? <Skeleton height={32} width={100} />
          : <Typography variant="body2">{`${month}/${day} · ${author}`}</Typography>}
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
    </Grid>
  );
};

PartialBlog.propTypes = {
  loading: PropTypes.bool.isRequired,
  author: PropTypes.string,
  title: PropTypes.string,
  preview: PropTypes.string,
  createdAt: PropTypes.string,
  url: PropTypes.string,
};

PartialBlog.defaultProps = {
  author: '',
  title: '',
  preview: '',
  createdAt: new Date().toJSON(),
  url: '',
};

const PartialBlogsList = ({ loaded, partialBlogs }) => (
  <>
    {loaded
      ? partialBlogs.map(({
        id,
        author,
        title,
        preview,
        createdAt,
        url,
      }) => (
        <PartialBlog
            key={id}
            author={author}
            title={title}
            preview={preview}
            createdAt={createdAt}
            url={url}
            loading={false}
          />
      ))
      : <PartialBlog loading />}
  </>
);

PartialBlogsList.propTypes = {
  loaded: PropTypes.bool.isRequired,
  partialBlogs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
    preview: PropTypes.string,
    createdAt: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
};

export default PartialBlogsList;
