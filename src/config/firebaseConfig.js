import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    apiKey: "AIzaSyBZSyuFbjzk9edqyony9QUjVOfhe5cJj2g",
    authDomain: "wireframe4-ecce8.firebaseapp.com",
    databaseURL: "https://wireframe4-ecce8.firebaseio.com",
    projectId: "wireframe4-ecce8",
    storageBucket: "wireframe4-ecce8.appspot.com",
    messagingSenderId: "413361951397",
    appId: "1:413361951397:web:351330f1a86412c73d334c",
    measurementId: "G-WKRC9HH4S3"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;