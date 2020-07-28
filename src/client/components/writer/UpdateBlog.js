import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import loadPartialBlogsAction from '../../../actions/partialBlogs/loadPartialBlogs';
import removeBlogAction from '../../../actions/blog/removeBlog';
import BlogComponent from '../blog/Blog';
import BlogContentEditor from './BlogContentEditor';

class UpdateBlog extends React.Component {
  constructor(props) {
    super(props);

    const {
      title,
      content
    } = this.props;

    this.state = {
      publishing: false,
      published: false,
      title,
      content,
      tabValue: 0,
    };
  }

  updateTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  updateContent = (newContent) => {
    this.setState({ content: newContent });
  }

  publish = () => {
    const {
      loadPartialBlogs,
      author: {
        uid
      },
      id,
      removeBlog,
    } = this.props;

    const {
      title,
      content
    } = this.state;

    const payload = {
      title,
      content,
    };

    this.setState({ publishing: true });
    axios.put(`/api/v1/blogs/${id}`, payload).then(() => {
      loadPartialBlogs(uid);
      this.setState({ published: true });
      removeBlog(id);
    }).catch((err) => {
      console.log(err);
    });
  }

  changeTab = (event, newTabValue) => {
    this.setState({ tabValue: newTabValue });
  }

  render() {
    const {
      publishing,
      published,
      title,
      content,
      tabValue
    } = this.state;

    const {
      author: {
        uid,
        displayName,
      },
    } = this.props;

    if (published) {
      return <Redirect to="/writer" />;
    }

    const editorComponent = (
      <Grid container spacing={5} direction="column">
        <Grid item>
          <TextField
            variant="outlined"
            label="Title"
            onChange={this.updateTitle}
            value={title}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <BlogContentEditor
            content={content}
            onContentChange={this.updateContent}
          />
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="flex-end">
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.publish}
                disabled={publishing}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );

    const previewComponent = (
      <BlogComponent
        author={displayName}
        authorId={uid}
        content={content}
        createdAt={new Date().toString()}
        title={title}
      />
    );

    const tabComponents = [
      editorComponent,
      previewComponent,
    ];

    return (
      <Grid container spacing={7} direction="column">
        <Grid item>
          <Tabs
            value={tabValue}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.changeTab}
            aria-label="tabs"
          >
            <Tab label="Write" />
            <Tab label="Preview" />
          </Tabs>
        </Grid>
        <Grid item>
          {tabComponents[tabValue]}
        </Grid>
      </Grid>
    );
  }
}

UpdateBlog.propTypes = {
  authorDisplayName: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  author: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({ author }) => ({ author });

const mapDispatchToProps = dispatch => ({
  loadPartialBlogs: filter => dispatch(loadPartialBlogsAction(filter)),
  removeBlog: (id) => dispatch(removeBlogAction(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBlog);
