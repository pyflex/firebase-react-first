import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

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
export const storage = firebase.storage();

export const signOut = () => auth.signOut();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithRedirect(provider);

// for demonstration purposes, not to use in real projects:
window.firebase = firebase;

export const createUserProfileDocument = async (user, additionData) => {
  // if user sign up and sign out
  if (!user) return;
  // look for doc in db, if so, get the reference
  const userRef = firestore.doc(`/users/${user.uid}`);

  // fetch doc from that location:
  const snapshot = await userRef.get();

  const { displayName, email, photoURL } = user;

  if (!snapshot.exists) {
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionData,
      });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    // can also do doc("string goes here as above")
    return firestore.collection("users").doc(uid);
  } catch (error) {
    console.error("Error fetching user", error.message);
  }
};

export default firebase;
