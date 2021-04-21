import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    apiKey: "AIzaSyA3OmCRNTamZVb6UQumY-0D9vC31jkYehU",
    authDomain: "wireframe9-64ecf.firebaseapp.com",
    projectId: "wireframe9-64ecf",
    storageBucket: "wireframe9-64ecf.appspot.com",
    messagingSenderId: "689680180508",
    appId: "1:689680180508:web:a0b43120912f40f57f46d9",
    measurementId: "G-QV42DBZPYE"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;