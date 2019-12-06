import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0vpwqJnq3KdKs4473KVJwlXGKO0r8kw8",
    authDomain: "reel-app-87119.firebaseapp.com",
    databaseURL: "https://reel-app-87119.firebaseio.com",
    projectId: "reel-app-87119",
    storageBucket: "reel-app-87119.appspot.com",
    messagingSenderId: "589598762988",
    appId: "1:589598762988:web:8ae58d6bd833a5064382c9",
    measurementId: "G-0VD1WX77BV"
  };

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// Provider is a way to provide authentication. 
// We have all sorts of providers (Google, Facebook, twitter,...)
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };