import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/FirebaseConfig";

// Your web app's Firebase configuration

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
