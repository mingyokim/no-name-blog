import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown';

const Blog = ({
  author,
  authorId,
  content,
  createdAt,
  title,
}) => {
  const date = new Date(createdAt);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Typography variant="h1">{title}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">{`By ${author}`}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">{`${month}/${day}/${year}`}</Typography>
      </Grid>
      <Grid item>
        <ReactMarkdown source={content} />
      </Grid>
    </Grid>
  );
};

Blog.propTypes = {
  author: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Blog;
