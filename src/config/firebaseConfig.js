import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    apiKey: "AIzaSyDmdewT3Bich9GMdNQKxV13ubRo701-Vfo",
    authDomain: "todo-hw3-316-949e5.firebaseapp.com",
    databaseURL: "https://todo-hw3-316-949e5.firebaseio.com",
    projectId: "todo-hw3-316-949e5",
    storageBucket: "todo-hw3-316-949e5.appspot.com",
    messagingSenderId: "488018967136",
    appId: "1:488018967136:web:c718fc1a2df171de4ae105",
    measurementId: "G-WZFY6TPREN"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;