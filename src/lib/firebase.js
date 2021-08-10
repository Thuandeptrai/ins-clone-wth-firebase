import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'; 
import firebase from "firebase/app";
const config ={
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
 firebase.initializeApp(config);
const { FieldValue } = firebase.firestore;
const storage = firebase.storage()
export { firebase, FieldValue , storage};
