import router from './router';

require('dotenv').config();

// console.log('firebase config:', process.env.FIREBASE_CONFIG);
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
console.log('service account:', serviceAccount);

// Initialize the default app
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const express = require('express');
const os = require('os');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('dist'));
app.use(cookieParser());
app.use(bodyParser.json());
// Support URL-encoded bodies.
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/login', (req, res) => {
  // console.log('cookie: ', req.cookies);
  const sessionCookie = req.cookies.session || '';
  // Verify the session cookie. In this case an additional check is added to detect
  // if the user's Firebase session was revoked, user deleted/disabled, etc.
  admin.auth().verifySessionCookie(sessionCookie, true)
    .then(() => {
      res.redirect('/writer');
    })
    .catch(() => {
      router(req, res);
    });
});

app.get('/logout', (req, res) => {
  const sessionCookie = req.cookies.session || '';
  // console.log('logout session cookie:', sessionCookie);
  // console.log('cookies:', req.cookies);
  res.clearCookie('session');
  admin.auth().verifySessionCookie(sessionCookie)
    .then(decodedClaims => admin.auth().revokeRefreshTokens(decodedClaims.sub))
    .then(() => {
      res.redirect('/login');
    })
    .catch(() => {
      res.redirect('/login');
    });
});

app.post('/sessionLogin', (req, res) => {
  // console.log('server session login');
  // console.log('body:', req.body);
  // console.log('cookies:', req.body.cookies);
  // Get the ID token passed and the CSRF token.
  const idToken = req.body.idToken.toString();
  // console.log('id token:', idToken);
  // const csrfToken = req.body.csrfToken.toString();
  // // Guard against CSRF attacks.
  // if (csrfToken !== req.cookies.csrfToken) {
  //   res.status(401).send('UNAUTHORIZED REQUEST!');
  //   return;
  // }
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  admin.auth().createSessionCookie(idToken, { expiresIn })
    .then((sessionCookie) => {
      // console.log('session cookie:', sessionCookie);
      // Set cookie policy for session cookie.
      // const options = { maxAge: expiresIn, httpOnly: true, secure: true };
      const options = { maxAge: expiresIn };
      res.cookie('session', sessionCookie, options);
      res.end(JSON.stringify({ status: 'success' }));
    }, (err) => {
      console.log(err);
      res.status(401).send('UNAUTHORIZED REQUEST!');
    });
});


app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('*', router);

const defaultPort = 8000;

app.listen(process.env.PORT || defaultPort, () => console.log(`Listening on port ${process.env.PORT || defaultPort}!`));
