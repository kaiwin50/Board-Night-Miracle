// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYhSPcEVAzXRMcoTckp8Uze9CKugJpPlA",
  authDomain: "board-night-miracle.firebaseapp.com",
  projectId: "board-night-miracle",
  storageBucket: "board-night-miracle.appspot.com",
  messagingSenderId: "345023210023",
  appId: "1:345023210023:web:c7a1f8edf7f31cdfcd2402",
  measurementId: "G-FLZC44VBX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// fetch Firestore. Firestore use as database
const db = getFirestore(app)

// authena by google popup.
export const auth = getAuth(app)


export default db