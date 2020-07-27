import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

// console.log(FB_CLIENT);
// console.log(JSON.parse(FB_CLIENT));
try {
  firebase.initializeApp(JSON.parse(FB_CLIENT));
} catch (err) {
  fetch('/__/firebase/init.json').then(async response => {
    firebase.initializeApp(await response.json());
  });
}

export default firebase;
