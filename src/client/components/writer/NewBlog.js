import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import loadPartialBlogsAction from '../../../actions/partialBlogs/loadPartialBlogs';
import BlogComponent from '../blog/Blog';
import Dropzone from './Dropzone';

class NewBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      publishing: false,
      published: false,
      tabValue: 0,
    };
  }

  updateTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  updateContent = (event) => {
    this.setState({ content: event.target.value });
  }

  publish = () => {
    const { title, content } = this.state;
    const {
      loadPartialBlogs,
      author: {
        uid
      },
    } = this.props;

    const payload = {
      title,
      content
    };

    this.setState({ publishing: true });
    axios.post('/api/v1/blogs/new', payload).then(() => {
      loadPartialBlogs(uid);
      this.setState({ published: true });
    }).catch((err) => {
      console.log(err);
    });
  }

  changeTab = (event, newTabValue) => {
    this.setState({ tabValue: newTabValue });
  }

  render() {
    const {
      title,
      content,
      publishing,
      published,
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
        <Grid item>
          <TextField
            variant="outlined"
            label="Content"
            onChange={this.updateContent}
            value={content}
            multiline
            fullWidth
            rows={10}
          />
        </Grid>
        <Grid item xs={12}>
          <Dropzone />
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
                Publish
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

const mapStateToProps = ({ author }) => ({ author });

const mapDispatchToProps = dispatch => ({
  loadPartialBlogs: filter => dispatch(loadPartialBlogsAction(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewBlog);
