import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    apiKey: "AIzaSyCRG0MRGtuyA0lhw95daVBs95JxAP8mU9s",
    authDomain: "wireframe-7ba73.firebaseapp.com",
    databaseURL: "https://wireframe-7ba73.firebaseio.com",
    projectId: "wireframe-7ba73",
    storageBucket: "wireframe-7ba73.appspot.com",
    messagingSenderId: "716736296397",
    appId: "1:716736296397:web:e326513e58290760170084",
    measurementId: "G-M441Q9X9L3"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;