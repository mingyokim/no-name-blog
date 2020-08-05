import { router, renderWithState } from './router';
import { titleToURL } from './helper';

const favicon = require('serve-favicon');
const path = require('path');

// Initialize the default app
const admin = require('firebase-admin');

// process.env.FIREBASE_CONFIG is defined when using Firebase Hosting
if (process.env.FIREBASE_CONFIG) {
  // Firebase hosting provides the service account credentials internally
  admin.initializeApp();
} else {
  require('dotenv').config();
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}


const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(path.join(__dirname, '..', '..', 'dist')));
app.use('/public', express.static(path.join(__dirname, '..', '..', 'public')));
app.use(favicon(path.join(__dirname, '..', '..', 'public', 'favicon.ico')));
app.use(cookieParser());
app.use(bodyParser.json());
// Support URL-encoded bodies.
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/api/v1/partial-blogs', (req, res) => {
  const db = admin.firestore();
  let partialBlogsRef = db.collection('blogs_partial').orderBy('createdAt', 'desc');
  const authorId = req.query.author_id;
  if (authorId) {
    partialBlogsRef = partialBlogsRef.where('authorId', '=', authorId);
  }
  const { limit } = req.query;
  if (limit) {
    partialBlogsRef = partialBlogsRef.limit(parseInt(limit, 10));
  }
  const { startAfter } = req.query;
  if (startAfter) {
    const startAfterTimestamp = admin.firestore.Timestamp.fromDate(new Date(startAfter));
    partialBlogsRef = partialBlogsRef.startAfter(startAfterTimestamp);
  }
  partialBlogsRef.get().then((snapshot) => {
    const partialBlogs = snapshot.docs.map((doc) => {
      // console.log(doc.id, '=>', doc.data());
      const data = doc.data();
      data.createdAt = data.createdAt.toDate().toJSON();
      return {
        id: doc.id,
        ...data,
      };
    });
    res.send({ partialBlogs });
  })
    .catch((err) => {
      console.log(err);
      res.status(404).send(JSON.stringify(err));
    });
});

app.get('/api/v1/partial-blogs/:id', (req, res) => {
  const db = admin.firestore();
  const { id } = req.params;
  db.collection('blogs_partial').doc(id).get().then((doc) => {
    if (!doc.exists) {
      res.send(404, `Requested partial blog with id ${id} was not found`);
    } else {
      const data = doc.data();
      data.createdAt = data.createdAt.toDate().toJSON();
      const partialBlog = {
        id: doc.id,
        ...data,
      };
      res.send({ partialBlog });
    }
  })
    .catch((err) => {
      console.log(err);
      res.status(404).send('server error');
    });
});

app.get('/api/v1/blogs/:id', (req, res) => {
  const db = admin.firestore();
  const { id } = req.params;
  db.collection('blogs').doc(id).get().then((doc) => {
    if (!doc.exists) {
      res.send(404, `Requested partial blog with id ${id} was not found`);
    } else {
      const data = doc.data();
      data.createdAt = data.createdAt.toDate().toJSON();
      const blog = {
        id: doc.id,
        ...data,
      };
      res.send({ blog });
    }
  })
    .catch((err) => {
      console.log(err);
      res.status(404).send('server error');
    });
});

app.put('/api/v1/blogs/:id', (req, res) => {
  const sessionCookie = req.cookies.session || '';
  admin.auth().verifySessionCookie(sessionCookie, true)
    .then(() => {
      const db = admin.firestore();
      const { id } = req.params;
      const { title, content } = req.body;

      const batch = db.batch();
      const blogRef = db.collection('blogs').doc(id);
      batch.update(blogRef, { title, content });
      const partialBlogRef = db.collection('blogs_partial').doc(id);
      batch.update(partialBlogRef, { title });

      batch.commit()
        .then(() => {
          res.send(`updated blog ${id}`);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send('server error');
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send('invalid session');
    });
});

app.delete('/api/v1/blogs/:id', (req, res) => {
  const sessionCookie = req.cookies.session || '';
  admin.auth().verifySessionCookie(sessionCookie, true)
    .then(() => {
      const db = admin.firestore();
      const { id } = req.params;

      const batch = db.batch();
      const blogRef = db.collection('blogs').doc(id);
      batch.delete(blogRef);
      const partialBlogRef = db.collection('blogs_partial').doc(id);
      batch.delete(partialBlogRef);
      batch.commit()
        .then(() => {
          res.send(`successfully deleted blog ${id}`);
        })
        .catch((err) => {
          console.log(err);
          res.status(404).send('server error');
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send('unauthorized');
    });
});

app.post('/api/v1/blogs/new', (req, res) => {
  const sessionCookie = req.cookies.session || '';
  let blogID;
  admin.auth().verifySessionCookie(sessionCookie, true)
    .then(({ uid }) => admin.auth().getUser(uid))
    .then(({ uid, displayName }) => {
      const db = admin.firestore();
      const { title, content } = req.body;
      const createdAt = admin.firestore.Timestamp.fromDate(new Date());
      const preview = ''; // TODO: actual preview
      const writePromises = [];

      const blogRef = db.collection('blogs').doc();
      blogID = blogRef.id;
      const url = titleToURL(title, blogID);
      const blog = {
        title,
        author: displayName,
        authorId: uid,
        content,
        createdAt,
        preview,
        url
      };
      writePromises.push(blogRef.set(blog));

      const partialBlog = Object.assign({}, blog);
      delete partialBlog.content;
      writePromises.push(db.collection('blogs_partial').doc(blogID).set(partialBlog));

      return Promise.all(writePromises);
    })
    .then(() => {
      res.end(JSON.stringify({ id: blogID }));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('server error');
    });
});

app.get('/api/v1/authors', (req, res) => {
  admin.auth().listUsers().then((listUsersResult) => {
    const authors = listUsersResult.users.map((user) => {
      console.log(user.toJSON());
      return ({
        id: user.uid,
        display_name: user.displayName,
        photo_URL: user.photoURL,
      });
    });
    res.send({ authors });
  }).catch((err) => {
    console.log(err);
    res.status(404).send('server error');
  });
});

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

app.post('/sessionLogout', (req, res) => {
  const sessionCookie = req.cookies.session || '';
  // console.log('logout session cookie:', sessionCookie);
  // console.log('cookies:', req.cookies);
  res.clearCookie('session');
  admin.auth().verifySessionCookie(sessionCookie)
    .then(decodedClaims => admin.auth().revokeRefreshTokens(decodedClaims.sub))
    .then(() => {
      res.end();
    })
    .catch(() => {
      res.end();
    });
});

app.get(['/writer', '/writer*'], (req, res) => {
  const sessionCookie = req.cookies.session || '';
  // Verify the session cookie. In this case an additional check is added to detect
  // if the user's Firebase session was revoked, user deleted/disabled, etc.
  admin.auth().verifySessionCookie(sessionCookie, true)
    .then(({ uid }) => admin.auth().getUser(uid))
    .then(({
      uid, email, displayName, photoURL
    }) => {
      const preloadedState = {
        author: {
          uid,
          email,
          displayName,
          photoURL,
        }
      };

      renderWithState(req, res, preloadedState);
    })
    .catch(() => {
      // Session cookie is unavailable or invalid. Force user to login.
      res.redirect('/logout');
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
  admin.auth().verifyIdToken(idToken)
    .then(({ uid, email }) => {
      // if email is in authors collection, then create session cookie (same logic as block below)
      const db = admin.firestore();
      db.collection('authors').doc(email).get()
        .then((doc) => {
          if (doc.exists) {
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
          } else {
            admin.auth().deleteUser(uid);
            res.status(401).send('UNAUTHORIZED REQUEST!');
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send('server error');
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send('UNAUTHORIZED REQUEST!');
    });
});

app.post('/api/v1/signup', (req, res) => {
  const idToken = req.body.idToken.toString();
  const { signUpToken } = req.body;
  console.log('token:', signUpToken);
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  admin.auth().verifyIdToken(idToken)
    .then(({ uid, email }) => {
      const db = admin.firestore();
      db.collection('signup_tokens').doc(signUpToken).get()
        .then((doc) => {
          if (doc.exists) {
            admin.auth().createSessionCookie(idToken, { expiresIn })
              .then((sessionCookie) => {
                // console.log('session cookie:', sessionCookie);
                // Set cookie policy for session cookie.
                // const options = { maxAge: expiresIn, httpOnly: true, secure: true };
                const options = { maxAge: expiresIn };
                res.cookie('session', sessionCookie, options);
                return db.collection('authors').doc(email).set({});
              })
              .then(() => {
                res.end(JSON.stringify({ status: 'success' }));
              })
              .catch((err) => {
                console.log(err);
                res.status(401).send('UNAUTHORIZED REQUEST!');
              });
          } else {
            admin.auth().deleteUser(uid);
            res.status(401).send('UNAUTHORIZED REQUEST!');
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send('server error');
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send('UNAUTHORIZED REQUEST!');
    });
});

app.get('*', router);

const defaultPort = 8000;

app.listen(process.env.PORT || defaultPort, () => console.log(`Listening on port ${process.env.PORT || defaultPort}!`));

export default app;
