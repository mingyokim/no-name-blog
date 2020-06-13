import React from 'react';
import TextField from '@material-ui/core/TextField';
// import { connect } from 'react-redux';
// import { firebaseConnect } from 'react-redux-firebase';
// import PropTypes from 'prop-types';
// import { compose } from 'redux';
import * as fb from 'firebase/app';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { FirebaseContext } from '../firebase';

// const Login = () => {
//   const provider = new fb.auth.GoogleAuthProvider();
//   // console.log(firebase);
//   const signInWithProvider = () => {
//     firebase.auth().signInWithPopup(provider).then((result) => {
//       console.log(result);
//     }).catch((error) => {
//       console.log(error);
//     });
//   };

//   const user = firebase.auth().currentUser;

//   if (!user) {
//     return (
//       <>
//         <TextField label="Email" variant="outlined" />
//         <TextField label="Password" variant="outlined" />
//         <button type="submit" onClick={signInWithProvider}>Sign in with Google</button>
//       </>
//     );
//   }

//   return (
//     <Redirect to="/writer" />
//   );
// };

// export default Login;

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
    // const {
    //   auth: {
    //     isLoaded: isAuthLoaded,
    //     isEmpty: needLogin,
    //   },
    // } = this.props;

    const { sessionCreated } = this.state;

    if (sessionCreated) {
      return (<Redirect to="/writer" />);
    }

    return (
      <>
        <TextField label="Email" variant="outlined" />
        <TextField label="Password" variant="outlined" />
        <FirebaseContext.Consumer>
          {firebase => <button type="submit" onClick={() => this.signInWithProvider(firebase)}>Sign in with Google</button>}
        </FirebaseContext.Consumer>
      </>
    );
    // console.log(auth);
    // if (!isAuthLoaded) return (<span>Loading...</span>);

    // if (needLogin) {
    //   return (
    //     <>
    //       <TextField label="Email" variant="outlined" />
    //       <TextField label="Password" variant="outlined" />
    //       <button type="submit" onClick={this.signInWithProvider}>Sign in with Google</button>
    //     </>
    //   );
    // }

    // return (
    //   <Redirect to="/writer" />
    // );
  }
}

// const Login = ({
//   firebase,
//   auth,
//   auth: {
//     isLoaded: isAuthLoaded,
//     isEmpty: needLogin,
//   },
// }) => {
//   const provider = new fb.auth.GoogleAuthProvider();
//   console.log(auth);
//   const signInWithProvider = () => {
//     firebase.auth().signInWithPopup(provider).then((result) => {
//       const { idToken } = result.credential;
//       axios.post("/sessionLogin", { idToken }).
//     }).catch((error) => {
//         console.log(error);
//       });
//   };

//   if (!isAuthLoaded) return (<span>Loading...</span>);

//   if (needLogin) {
//     return (
//       <>
//         <TextField label="Email" variant="outlined" />
//         <TextField label="Password" variant="outlined" />
//         <button type="submit" onClick={signInWithProvider}>Sign in with Google</button>
//       </>
//     );
//   }

//   return (
//     <Redirect to="/writer" />
//   );
// };

// Login.propTypes = {
//   firebase: PropTypes.shape({
//     auth: PropTypes.func,
//   }).isRequired,
//   // auth: PropTypes.shape({
//   //   isLoaded: PropTypes.bool,
//   //   isEmpty: PropTypes.bool,
//   // }).isRequired,
// };

// const enhance = connect(
//   // Map redux state to component props
//   ({ firebase: { auth, profile } }) => ({
//     auth,
//     profile
//   })
// );

// enhance(Login);

// export default Login;

// const mapStateToProps = ({ firebase }) => ({ firebase });

// export default compose(
//   firebaseConnect(),
//   connect(mapStateToProps),
// )(Login);

export default Login;
