import React from 'react';
import * as fb from 'firebase/app';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
// import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { FirebaseContext } from '../../firebase';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionCreated: false
    };
  }

  signInWithProvider = (firebase) => {
    // const { firebase } = this.props;
    console.log('firebase:', firebase);
    const provider = new fb.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      console.log('Result after sign in: ', result);
      firebase.auth().currentUser.getIdToken(true).then((idToken) => {
        axios.post('/sessionLogin', { idToken }).then((res) => {
          console.log('session login success:', res);
          this.setState({ sessionCreated: true });
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
    const { sessionCreated } = this.state;

    if (sessionCreated) {
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

export default Login;
