import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
const firebaseConfig = {
    apiKey: "AIzaSyBPWeR9pZLB42GGURmbB9cgKXe_BNr2V3c",
    authDomain: "wireframe13-88ec9.firebaseapp.com",
    projectId: "wireframe13-88ec9",
    storageBucket: "wireframe13-88ec9.appspot.com",
    messagingSenderId: "13848352455",
    appId: "1:13848352455:web:5c6d37f7154838b68490e2",
    measurementId: "G-0SH1CXE46C"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;