import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
   apiKey: "AIzaSyB3JhD7NATmExuzkG5MvpcLwCqU8JSUtSE",
   authDomain: "mychat-60198.firebaseapp.com",
   projectId: "mychat-60198",
   storageBucket: "mychat-60198.appspot.com",
   messagingSenderId: "1093645290247",
   appId: "1:1093645290247:web:a54b19c14a6e2619c053a2",
   measurementId: "G-Y6G32RM9W5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();  //authentication handler

//Google authentification
const provider = new firebase.auth.GoogleAuthProvider(); 

export {auth, provider};
export default db; 