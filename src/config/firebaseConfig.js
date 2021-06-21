import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    apiKey: "AIzaSyBDPsdf-vx20ae3idf_3OrC7k_K2MPUG3Y",
    authDomain: "wireframe11-a0d1a.firebaseapp.com",
    projectId: "wireframe11-a0d1a",
    storageBucket: "wireframe11-a0d1a.appspot.com",
    messagingSenderId: "453959583032",
    appId: "1:453959583032:web:b760e24a001cbb665bedcd",
    measurementId: "G-QE485BV2PL"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;