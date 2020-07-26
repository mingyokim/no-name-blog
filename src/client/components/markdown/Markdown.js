import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'markdown-to-jsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  h1: {
    fontSize: '2rem',
    marginTop: theme.spacing(7),
  },
  header: {
    marginTop: theme.spacing(7),
  },
  listItem: {
    marginTop: theme.spacing(1),
  },
}));

const options = () => {
  const classes = useStyles();
  return {
    overrides: {
      h1: {
        component: Typography,
        props: {
          gutterBottom: true,
          variant: 'h1',
          classes: {
            root: classes.h1
          }
        },
      },
      h2: {
        component: Typography,
        props: {
          gutterBottom: true,
          variant: 'h2',
          classes: {
            root: classes.header
          }
        }
      },
      h3: {
        component: Typography,
        props: {
          gutterBottom: true,
          variant: 'h3',
          classes: {
            root: classes.header
          }
        }
      },
      h4: {
        component: Typography,
        props: {
          gutterBottom: true,
          variant: 'h4',
          classes: {
            root: classes.header
          }
        }
      },
      h5: {
        component: Typography,
        props: {
          gutterBottom: true,
          variant: 'h5',
          classes: {
            root: classes.header
          }
        }
      },
      h6: {
        component: Typography,
        props: {
          gutterBottom: true,
          variant: 'h6',
          classes: {
            root: classes.header
          }
        }
      },
      p: { component: Typography, props: { paragraph: true, variant: 'body1' } },
      span: { component: Typography, props: { variant: 'body1' } },
      a: { component: Link },
      li: {
        component: props => (
          <li className={classes.listItem}>
            <Typography component="span" {...props} />
          </li>
        ),
      },
      img: {
        component: props => (
          <img style={{ maxWidth: '100%' }} {...props} />
        ),
      }
    },
  };
};

const Markdown = ({ source }) => <ReactMarkdown options={options()}>{source}</ReactMarkdown>;

Markdown.propTypes = {
  source: PropTypes.string.isRequired,
};

export default Markdown;
