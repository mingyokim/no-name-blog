import React from 'react';
import { Link } from 'react-router-dom';
// import GoogleLogin from 'react-google-login';

// const responseGoogle = (response) => {
//   console.log(response);
// };

// const WriterHome = () => (
//   <GoogleLogin
//     buttonText="Login"
//     onSuccess={responseGoogle}
//     onFailure={responseGoogle}
//   />
// );

const WriterHome = () => (
  <Link to="/logout">Logout!</Link>
);

export default WriterHome;
