import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    apiKey: "AIzaSyBXjxbgtyfimmoHxpmpUje-jdCYwyNLYEY",
    authDomain: "wireframe6-de1ba.firebaseapp.com",
    projectId: "wireframe6-de1ba",
    storageBucket: "wireframe6-de1ba.appspot.com",
    messagingSenderId: "774763065338",
    appId: "1:774763065338:web:ccb838c691212f3faa7e43",
    measurementId: "G-5ZTPJLDN55"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;