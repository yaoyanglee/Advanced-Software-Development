import { initializeApp } from "firebase/app";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const analytics = getAnalytics(app);
