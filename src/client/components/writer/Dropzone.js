import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import Paper from '@material-ui/core/Paper';
import RootRef from '@material-ui/core/RootRef';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(16),
  },
  container: {
    height: '100%',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    cursor: 'pointer',
  }
}));

const Dropzone = () => {
  const classes = useStyles();

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*', multiple: false });
  const { ref, ...rootProps } = getRootProps();

  return (
    <RootRef rootRef={ref}>
      <Paper {...rootProps} className={classes.root}>
        <input {...getInputProps()} />
        <Grid container justify="center" alignItems="center" className={classes.container}>
          <Grid item>
            <Typography variant="body1">Drag 'n' drop images here, or click to select images</Typography>
          </Grid>
        </Grid>
      </Paper>
    </RootRef>
  )
}

export default Dropzone;
