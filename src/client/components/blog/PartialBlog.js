import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import displayDate from '../../helper/displayDate';

const PartialBlog = ({
  author,
  title,
  preview,
  createdAt,
  url
}) => {
  const date = new Date(createdAt);
  return (
    <Grid container spacing={0} direction="column">
      <Grid item>
        <Link
          to={`/blogs/${url}`}
          variant="h1"
          component={RouterLink}
          color="inherit"
        >
          {title}
        </Link>
      </Grid>
      {/* <Grid item>
        {loading
          ? <Skeleton height={32} className={classes.nameSkeleton} />
          : <Typography variant="body2">{preview}</Typography>}
      </Grid> */}
      <Grid item>
        <Typography variant="subtitle1" color="textSecondary">{`${displayDate(date)} · ${author}`}</Typography>
      </Grid>
    </Grid>
  );
};

PartialBlog.propTypes = {
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default PartialBlog;
