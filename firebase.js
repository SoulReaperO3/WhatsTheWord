import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1Yd_sCy23R-UuMpAwoZcsA8uU3WB9-Lc",
  authDomain: "whatstheword-b8073.firebaseapp.com",
  projectId: "whatstheword-b8073",
  storageBucket: "whatstheword-b8073.appspot.com",
  messagingSenderId: "282465159899",
  appId: "1:282465159899:web:6afc4870d3cd003f881afe"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const auth = firebase.auth()

export { auth };
