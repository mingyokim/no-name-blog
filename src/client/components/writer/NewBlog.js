import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class NewBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      publishing: false,
      published: false,
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

    const payload = {
      title,
      content
    };

    this.setState({ publishing: true });
    axios.post('/api/v1/blogs/new', payload).then(() => {
      this.setState({ published: true });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const {
      title, content, publishing, published
    } = this.state;
    if (published) {
      return <Redirect to="/writer" />;
    }
    return (
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
  }
}

export default NewBlog;
