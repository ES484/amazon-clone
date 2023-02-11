import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC0uICEm7Q2oEZn_0vsWMdKXbltQHG123s",
    authDomain: "clone-a2e0d.firebaseapp.com",
    projectId: "clone-a2e0d",
    storageBucket: "clone-a2e0d.appspot.com",
    messagingSenderId: "621563810007",
    appId: "1:621563810007:web:f056c262e4bf75a8526092",
    measurementId: "G-S1W53BCB9T"
  };
  const app = !firebase.apps.length 
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();
  const db = app.firestore();
  export default db;