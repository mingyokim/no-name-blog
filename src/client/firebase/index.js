import * as firebase from 'firebase';
import 'firebase/auth';

// console.log(FB_CLIENT);
// console.log(JSON.parse(FB_CLIENT));

firebase.initializeApp(JSON.parse(FB_CLIENT));

export default firebase;
