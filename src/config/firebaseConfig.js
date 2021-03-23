import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    apiKey: "AIzaSyAABksBtmqD7XFIsRRnY-tXtusBGpG5MW8",
    authDomain: "wireframe8-5dd31.firebaseapp.com",
    projectId: "wireframe8-5dd31",
    storageBucket: "wireframe8-5dd31.appspot.com",
    messagingSenderId: "294085002449",
    appId: "1:294085002449:web:400a6497061e54c6db31f0",
    measurementId: "G-83B74JWMKB"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;