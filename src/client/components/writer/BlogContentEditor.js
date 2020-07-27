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

import FirebaseContext from '../../firebase/firebaseContext';

const getImageTag = (filename, downloadURL) => `![${filename}](${downloadURL})`;

const BlogContentEditor = ({ content, onContentChange }) => {
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
  const onDrop = useCallback((acceptedFiles) => {
    setUploading(true);
    acceptedFiles.map((file) => {
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
          ].join(' ');
          onContentChange(newContent);
          setUploading(false);
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
        inputRef={inputRef}
        onSelect={() => setSelectionStart(inputRef.current.selectionStart)}
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
