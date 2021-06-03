import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "./config/FirebaseConfig";

// Your web app's Firebase configuration

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const storageService = firebase.storage();
export const dbService = firebase.firestore();
