import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown';

import displayDate from '../../helper/displayDate';

const Blog = ({
  author,
  authorId,
  content,
  createdAt,
  title,
}) => {
  const date = new Date(createdAt);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Typography variant="h1">{title}</Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={0} direction="column">
          <Grid item>
            <Typography variant="subtitle2">{`By ${author}`}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">{displayDate(date)}</Typography>
          </Grid>
        </Grid>
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
