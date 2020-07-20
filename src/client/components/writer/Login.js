import React from 'react';
import * as fb from 'firebase/app';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
// import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FirebaseContext from '../../firebase/firebaseContext';
import addAuthorAction from '../../../actions/author/addAuthor';

class Login extends React.Component {
  signInWithProvider = (firebase) => {
    const { addAuthor } = this.props;
    const provider = new fb.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(({ user }) => {
      user.getIdToken(true).then((idToken) => {
        axios.post('/sessionLogin', { idToken }).then(() => {
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
    const { author } = this.props;

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
                onClick={() => this.signInWithProvider(firebase)}
              >
                Sign in with Google
              </Button>
            </Grid>
          </Grid>
        )}
      </FirebaseContext.Consumer>
    );
  }
}

const mapStateToProps = ({ author }) => ({
  author,
});

const mapDispatchToProps = dispatch => ({
  addAuthor: author => dispatch(addAuthorAction(author))
});

Login.propTypes = {
  addAuthor: PropTypes.func.isRequired,
  author: PropTypes.shape({
    uid: PropTypes.string,
    email: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }),
};

Login.defaultProps = {
  author: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
