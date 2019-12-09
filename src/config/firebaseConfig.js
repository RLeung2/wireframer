import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    apiKey: "AIzaSyCfKwGwCLzqTHn3okZFIV_WgXX2E8222lE",
    authDomain: "wireframe-aa7a1.firebaseapp.com",
    databaseURL: "https://wireframe-aa7a1.firebaseio.com",
    projectId: "wireframe-aa7a1",
    storageBucket: "wireframe-aa7a1.appspot.com",
    messagingSenderId: "591783438283",
    appId: "1:591783438283:web:efc839fd213bd4982c784e",
    measurementId: "G-D377STCL08"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;