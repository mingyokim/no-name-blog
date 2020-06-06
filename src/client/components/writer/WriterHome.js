import React from 'react';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
};

const WriterHome = () => (
  <GoogleLogin
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
  />
);

export default WriterHome;
