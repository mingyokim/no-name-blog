import * as firebase from 'firebase';
import 'firebase/auth';

console.log(JSON.parse(FB_CLIENT));

// let config = {
//     apiKey: "XXXXXXX",
//     authDomain: "XXXXX",
//     databaseURL: "XXXXX",
//     projectId: "XXXXX",
//     storageBucket: "XXXX",
//     messagingSenderId: "XXXX"
// };

firebase.initializeApp(JSON.parse(FB_CLIENT));

export default firebase;
