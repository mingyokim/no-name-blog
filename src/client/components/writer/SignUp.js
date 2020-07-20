import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import * as fb from 'firebase/app';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import FirebaseContext from '../../firebase/firebaseContext';

const signUpWithProvider = (firebase, signUpToken, addAuthor) => {
  const provider = new fb.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(({ user }) => {
    user.getIdToken(true).then((idToken) => {
      axios.post('/api/v1/signup', { idToken, signUpToken }).then(() => {
        addAuthor(user);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  }).catch((error) => {
    console.log(error);
  });
};

const SignUp = ({
  author,
  addAuthor,
  signUpToken
}) => {
  if (author) {
    return (<Redirect to="/writer" />);
  }

  return (
    <FirebaseContext.Consumer>
      {firebase => (
        <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => signUpWithProvider(firebase, signUpToken, addAuthor)}
            >
              Sign up with Google
            </Button>
          </Grid>
        </Grid>
      )}
    </FirebaseContext.Consumer>
  );
};

SignUp.propTypes = {
  signUpToken: PropTypes.string.isRequired,
  author: PropTypes.shape({
    uid: PropTypes.string,
    email: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }),
  addAuthor: PropTypes.func.isRequired,
};

SignUp.defaultProps = {
  author: null,
};

export default SignUp;
