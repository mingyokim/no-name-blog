import * as firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';

import FirebaseContext from './firebaseContext';
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

const FirebaseProvider = ({ children }) => (
  <FirebaseContext.Provider value={firebase}>
    {children}
  </FirebaseContext.Provider>
);

export default FirebaseProvider;
