// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqyLCGo__iRXwuP_G9UUrCCKgZ8ebBHA0",
  authDomain: "week7-yupeng.firebaseapp.com",
  projectId: "week7-yupeng",
  storageBucket: "week7-yupeng.appspot.com",
  messagingSenderId: "54988424660",
  appId: "1:54988424660:web:cd87bf59030c04c6a58241",
  measurementId: "G-W73JGXXZSZ"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

export default db