// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrG06u9edoH_YSW_xAbEukLBVdJGBrPfs",
  authDomain: "advanced-software-dev.firebaseapp.com",
  projectId: "advanced-software-dev",
  storageBucket: "advanced-software-dev.appspot.com",
  messagingSenderId: "59193383677",
  appId: "1:59193383677:web:38d7392044c3695354fc94",
  measurementId: "G-N9P95GY1YQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storeage = getStorage(app);
// const analytics = getAnalytics(app);
