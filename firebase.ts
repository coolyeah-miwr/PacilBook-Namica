// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDKNaxcEKS_vR8W2fqnOzIpQXgyLfwb8o",
  authDomain: "pacilbook-187290.firebaseapp.com",
  projectId: "pacilbook-187290",
  storageBucket: "pacilbook-187290.firebasestorage.app",
  messagingSenderId: "284374844333",
  appId: "1:284374844333:web:7186a3805f16583b1ed724",
  measurementId: "G-QV6HXEHLC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);