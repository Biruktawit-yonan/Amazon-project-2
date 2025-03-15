import  firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore";
// import "firebase/compat/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCt1sLbQ4F-jH9q41FwQCIuhmHvhEawqB0",
  authDomain: "project-2-aa4d5.firebaseapp.com",
  projectId: "project-2-aa4d5",
  storageBucket: "project-2-aa4d5.firebasestorage.app",
  messagingSenderId: "331356007367",
  appId: "1:331356007367:web:db85b7f14facb40f1a87e2",
};


const app =firebase.initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const db = app.firestore();


