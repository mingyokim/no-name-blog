import React from 'react';
import { renderRoutes } from 'react-router-config';
import CssBaseline from '@material-ui/core/CssBaseline';
// import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import loadable from '@loadable/component';

// import { Provider } from 'react-redux';
// import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
// import { store, rrfProps } from './store';
// import * as firebase from 'firebase/app';
import routes from '../../routes';
// import { FirebaseContext, firebaseConfig } from './firebase';
const FirebaseProvider = loadable(() => import('../firebase/FirebaseProvider'));

// const theme = createMuiTheme({
//   palette: {
//     type: 'dark',
//     primary: {
//       light: '#a6d4fa',
//       main: '#90caf9',
//       dark: '#648dae',
//     },
//     background: {
//       paper: '#343638',
//       default: '#131415',
//     }
//   }
// });

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
// };

// firebase.initializeApp(firebaseConfig);

// export default function App() {
//   return (
//     <FirebaseContext.Provider value={firebase}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         {renderRoutes(routes)}
//       </ThemeProvider>
//     </FirebaseContext.Provider>
//   );
//   // return (
//   //   <Provider store={store}>
//   //     <ReactReduxFirebaseProvider {...rrfProps}>
//   //       <FirebaseContext.Provider>
//   //         <ThemeProvider theme={theme}>
//   //           <CssBaseline />
//   //           {renderRoutes(routes)}
//   //         </ThemeProvider>
//   //       </FirebaseContext.Provider>
//   //     </ReactReduxFirebaseProvider>
//   //   </Provider>
//   // );
// }

const App = () => (
  <FirebaseProvider>
    <CssBaseline />
    {renderRoutes(routes)}
  </FirebaseProvider>
);

export default App;
