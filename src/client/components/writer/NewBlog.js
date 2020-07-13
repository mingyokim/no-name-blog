import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class NewBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }

  updateTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  updateContent = (event) => {
    this.setState({ content: event.target.value });
  }

  render() {
    const { title, content } = this.state;
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
