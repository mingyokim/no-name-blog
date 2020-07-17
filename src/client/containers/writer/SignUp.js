import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import * as fb from 'firebase/app';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { FirebaseContext } from '../../firebase';

import addAuthorAction from '../../../actions/author/addAuthor';

class SignUp extends React.Component {
  signUpWithProvider = (firebase, signUpToken) => {
    const { addAuthor } = this.props;
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
  }

  render() {
    const {
      author,
      match: {
        params: {
          signUpToken
        }
      }
    } = this.props;

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
                onClick={() => this.signUpWithProvider(firebase, signUpToken)}
              >
                Sign up with Google
              </Button>
            </Grid>
          </Grid>
        )}
      </FirebaseContext.Consumer>
    );
  }
}

const mapStateToProps = ({ author }) => ({
  author
});

const mapDispatchToProps = dispatch => ({
  addAuthor: author => dispatch(addAuthorAction(author)),
});

SignUp.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      signUpToken: PropTypes.string,
    })
  }).isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
