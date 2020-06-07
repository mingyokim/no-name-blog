import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { createStore, combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

const configureStore = (initialState = {}) => {
  // Pick between dev and prod firebase configurations
  const firebaseConfig = {
    apiKey: 'AIzaSyA0Ji8-_r96VyZfl6bLUrwV0b6EpeQn9LQ',
    authDomain: 'blog-dev-564da.firebaseapp.com',
    databaseURL: 'https://blog-dev-564da.firebaseio.com',
    projectId: 'blog-dev-564da',
    storageBucket: 'blog-dev-564da.appspot.com',
    messagingSenderId: '106761700363',
    appId: '1:106761700363:web:986b06e94be495f04bb30e',
  };

  // Initialize firebase instance
  firebase.initializeApp(firebaseConfig);

  const rrfConfig = {
    // userProfile: 'users'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
  };

  // Add firebase to reducers (uses persistReducer and hardSet)
  const rootReducer = combineReducers({
    firebase: firebaseReducer,
  });

  const store = createStore(rootReducer, initialState);

  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
    // createFirestoreInstance // <- needed if using firestore
  };

  return { store, rrfProps };
};

export const { store, rrfProps } = configureStore({});
