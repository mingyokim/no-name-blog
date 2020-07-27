import React, { useCallback, useContext, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone'
import TextField from '@material-ui/core/TextField';
import RootRef from '@material-ui/core/RootRef';
import { uuid } from 'uuidv4';
// import { makeStyles } from '@material-ui/core/styles';

import FirebaseContext from '../../firebase/firebaseContext';

const getImageTag = (filename, downloadURL) => `![${filename}](${downloadURL})`;

const BlogContentEditor = ({ content, onContentChange }) => {
  const contentRef = useRef();

  useEffect(() => {
    contentRef.current = content;
  });

  const [uploading, setUploading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const onDrop = useCallback((acceptedFiles) => {
    setUploading(true);
    acceptedFiles.map((file) => {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${uuid()}`);
      return imageRef.put(file)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then((downloadURL) => {
          const newContent = `${contentRef.current} ${getImageTag(file.name, downloadURL)}`;
          onContentChange(newContent);
        })
        .catch((err) => {
          console.log(err);
          setUploading(false);
        });
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
    noClick: true
  });
  const { ref, ...rootProps } = getRootProps();

  return (
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
        {...rootProps}
      >
        <input {...getInputProps()} />
      </TextField>
    </RootRef>
  );
};

BlogContentEditor.propTypes = {
  content: PropTypes.string.isRequired,
  onContentChange: PropTypes.func.isRequired,
};

export default BlogContentEditor;
