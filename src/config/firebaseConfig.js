import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    apiKey: "AIzaSyCNi1QDVgssDDJJmJqw5jlECbbvcWrt_Ms",
    authDomain: "wireframe10-6cd48.firebaseapp.com",
    projectId: "wireframe10-6cd48",
    storageBucket: "wireframe10-6cd48.appspot.com",
    messagingSenderId: "958930971337",
    appId: "1:958930971337:web:2de28b043f3a6f5802bb18",
    measurementId: "G-E5N40LH10T"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;