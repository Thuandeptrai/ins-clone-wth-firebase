import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'; 
import firebase from "firebase/app";
const config ={
    apiKey: "AIzaSyCA1UoDBHsKrQoOoknnlZdo4JxhtcyCd68",
    authDomain: "insta-818e3.firebaseapp.com",
    projectId: "insta-818e3",
    storageBucket: "insta-818e3.appspot.com",
    messagingSenderId: "381717552639",
    appId: "1:381717552639:web:d52c981bab8b36f61a5bca",
    measurementId: "G-428E52GRSS"
};
 firebase.initializeApp(config);
const { FieldValue } = firebase.firestore;
const storage = firebase.storage()
export { firebase, FieldValue , storage};