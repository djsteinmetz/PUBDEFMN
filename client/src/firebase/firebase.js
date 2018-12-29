import firebase from "firebase/app";
import "firebase/auth";

const prodConfig = {
  apiKey: "AIzaSyC5-63ZKiQH5FyaBU8WkvqFAucaesdH85M",
  authDomain: "mnpubdef.firebaseapp.com",
  databaseURL: "https://mnpubdef.firebaseio.com",
  projectId: "mnpubdef",
  storageBucket: "mnpubdef.appspot.com",
  messagingSenderId: "146734736317"
};

const devConfig = {
  apiKey: "AIzaSyC5-63ZKiQH5FyaBU8WkvqFAucaesdH85M",
  authDomain: "mnpubdef.firebaseapp.com",
  databaseURL: "https://mnpubdef.firebaseio.com",
  projectId: "mnpubdef",
  storageBucket: "mnpubdef.appspot.com",
  messagingSenderId: "146734736317"
};

const config = process.env.NODE_ENV === "production"
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};