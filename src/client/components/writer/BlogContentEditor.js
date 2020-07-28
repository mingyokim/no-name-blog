import React, {
  useCallback,
  useContext,
  useState,
  useRef,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import TextField from '@material-ui/core/TextField';
import RootRef from '@material-ui/core/RootRef';
import { uuid } from 'uuidv4';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import FirebaseContext from '../../firebase/firebaseContext';

const getImageTag = (filename, downloadURL) => `![${filename}](${downloadURL})`;

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
}));

const BlogContentEditor = ({ content, onContentChange }) => {
  const classes = useStyles();

  const contentRef = useRef();
  const inputRef = useRef();
  const selectionStartRef = useRef();
  const [selectionStart, setSelectionStart] = React.useState();

  useEffect(() => {
    contentRef.current = content;
    selectionStartRef.current = selectionStart;
  });

  const [uploading, setUploading] = useState(false);
  const firebase = useContext(FirebaseContext);

  const uploadImage = (file) => {
    setUploading(true);
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`images/${uuid()}`);
    return imageRef.put(file)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then((downloadURL) => {
        const currentContent = contentRef.current;
        const currentSelectionStart = selectionStartRef.current;
        const newContent = [
          currentContent.slice(0, currentSelectionStart),
          getImageTag(file.name, downloadURL),
          currentContent.slice(currentSelectionStart),
        ].join('');
        onContentChange(newContent);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  const buttonUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    files.map(uploadImage);
  });

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map(uploadImage);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
    noClick: true
  });
  const { ref, ...rootProps } = getRootProps();

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <RootRef rootRef={ref}>
          <TextField
            variant="outlined"
            label="Content"
            onChange={event => onContentChange(event.target.value)}
            value={content}
            multiline
            fullWidth
            rows={10}
            disabled={uploading}
            inputRef={inputRef}
            onSelect={() => setSelectionStart(inputRef.current.selectionStart)}
            {...rootProps}
          >
            <input {...getInputProps()} />
          </TextField>
        </RootRef>
      </Grid>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item>
            <div>
              <label htmlFor="upload-image-button">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<PhotoCamera />}
                  disabled={uploading}
                >
                  { uploading ? 'Uploading...' : 'Insert' }
                </Button>
              </label>
              <input
                accept="image/*"
                id="upload-image-button"
                type="file"
                className={classes.input}
                onChange={buttonUpload}
              />
            </div>
          </Grid>
          {
            uploading
              ? (
                <Grid item>
                  <CircularProgress />
                </Grid>
              )
              : null
          }
        </Grid>
      </Grid>
    </Grid>
  );
};

BlogContentEditor.propTypes = {
  content: PropTypes.string.isRequired,
  onContentChange: PropTypes.func.isRequired,
};

export default BlogContentEditor;
