import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    apiKey: "AIzaSyDMOj4b-5WhJzCfx6HbYsLGbME3vAIvle8",
    authDomain: "wireframe7-a1986.firebaseapp.com",
    projectId: "wireframe7-a1986",
    storageBucket: "wireframe7-a1986.appspot.com",
    messagingSenderId: "616257059007",
    appId: "1:616257059007:web:fa8a95acb3a853b1b0ae0a",
    measurementId: "G-Q3H72EM8SC"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;