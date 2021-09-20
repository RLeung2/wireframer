import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    apiKey: "AIzaSyBwZRLHxBfMo4FMIs0dyrNjKha9bxfpHws",
    authDomain: "wireframe-d5608.firebaseapp.com",
    projectId: "wireframe-d5608",
    storageBucket: "wireframe-d5608.appspot.com",
    messagingSenderId: "713155157735",
    appId: "1:713155157735:web:ea8df5676cf16522874c42",
    measurementId: "G-3KRSJPRS38"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;