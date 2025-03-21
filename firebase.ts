// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDOR4K_TigaQz8Ojme52le3EozApKRBBZs",
    authDomain: "bikey-d2405.firebaseapp.com",
    projectId: "bikey-d2405",
    storageBucket: "bikey-d2405.firebasestorage.app",
    messagingSenderId: "120828372076",
    appId: "1:120828372076:web:366146ca9a6b8512612449",
    measurementId: "G-27TVMGDV9Q"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
 const auth = getAuth(app);
auth.useDeviceLanguage();
export {auth}