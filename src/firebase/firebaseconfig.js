// Import the functions you need from the SDKs you need

import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBiuEDSwrWaYOfh0kdbXFMxillqGwGz_M4",
//   authDomain: "ejemplo-clase-3024d.firebaseapp.com",
//   projectId: "ejemplo-clase-3024d",
//   storageBucket: "ejemplo-clase-3024d.appspot.com",
//   messagingSenderId: "301727099643",
//   appId: "1:301727099643:web:88a4e8ceb80c4916f79e5e",
//   measurementId: "G-M1XF97Q22B",
// };
const firebaseConfig = {
  apiKey: "AIzaSyCdIPZvptLICIjJajot71XiUnb-ee3Rg0Y",
  authDomain: "delyvery-app-d0ca2.firebaseapp.com",
  projectId: "delyvery-app-d0ca2",
  storageBucket: "delyvery-app-d0ca2.appspot.com",
  messagingSenderId: "803688224668",
  appId: "1:803688224668:web:f1a10e4ab51798d67b9a59",
  measurementId: "G-QJ4X1FNW15"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyCdIPZvptLICIjJajot71XiUnb-ee3Rg0Y",
//   authDomain: "delyvery-app-d0ca2.firebaseapp.com",
//   projectId: "delyvery-app-d0ca2",
//   storageBucket: "delyvery-app-d0ca2.appspot.com",
//   messagingSenderId: "803688224668",
//   appId: "1:803688224668:web:c0cd2e390bffcef47b9a59",
//   measurementId: "G-WE8Q1ZLKCX"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const google = new GoogleAuthProvider();
export const facebook= new FacebookAuthProvider();
export const dataBase= getFirestore(app)