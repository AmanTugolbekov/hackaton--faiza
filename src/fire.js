// Import the functions you need from the SDKs you need
import "firebase/compat/auth";
import "firebase/compat/app";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa83sUVo6aAlaFJ8fu3Q_G17SLQKu7v2M",
  authDomain: "faiza-4f861.firebaseapp.com",
  projectId: "faiza-4f861",
  storageBucket: "faiza-4f861.appspot.com",
  messagingSenderId: "42995748350",
  appId: "1:42995748350:web:55cb5a832844be0ab284af",
  measurementId: "G-KPC8ZCZJVM",
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
