import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    apiKey: "AIzaSyCa8OdF7RCG8kuXyfPVNTVukB_PnD0A41Q",
    authDomain: "wireframe12-303dd.firebaseapp.com",
    projectId: "wireframe12-303dd",
    storageBucket: "wireframe12-303dd.appspot.com",
    messagingSenderId: "559765256404",
    appId: "1:559765256404:web:66a6b3f69053de8718e341",
    measurementId: "G-96QP6SKP5Y"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;