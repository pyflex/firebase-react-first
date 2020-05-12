import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCTqjR4QQ7grMNFYsYADMdaDkLMGPIzh8M",
  authDomain: "think-piece-15528.firebaseapp.com",
  databaseURL: "https://think-piece-15528.firebaseio.com",
  projectId: "think-piece-15528",
  storageBucket: "think-piece-15528.appspot.com",
  messagingSenderId: "115867603501",
  appId: "1:115867603501:web:de7e4fcb00be12c9185ea4",
  measurementId: "G-YEZJNPYRF6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const signOut = () => auth.signOut();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// for demonstration purposes, not to use in real projects:
window.firebase = firebase;

export default firebase;
