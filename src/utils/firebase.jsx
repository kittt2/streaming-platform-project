// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider ,signInWithPopup} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMPmoRPwrRViJuycDHMVRSUnRzBEWPWm4",
  authDomain: "stream-5a835.firebaseapp.com",
  projectId: "stream-5a835",
  storageBucket: "stream-5a835.firebasestorage.app",
  messagingSenderId: "691264789680",
  appId: "1:691264789680:web:d37be05dd1b9274397af75",
  measurementId: "G-PDRRQ1VCB2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const providergoogle = new GoogleAuthProvider();
export const db = getFirestore(app);
auth.languageCode = 'en';

