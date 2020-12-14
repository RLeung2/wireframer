import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    apiKey: "AIzaSyDKJ6cWU4rBSnI4Ok12NigsjKplevTqzrY",
    authDomain: "wireframe5.firebaseapp.com",
    projectId: "wireframe5",
    storageBucket: "wireframe5.appspot.com",
    messagingSenderId: "615814302937",
    appId: "1:615814302937:web:a0ba7d0e2bd165991bc2c8",
    measurementId: "G-C0F7SN33KV"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;