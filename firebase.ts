
import { getAuth } from "firebase/auth";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: `${import.meta.env.VITE_API_KEY_FB}`,
    authDomain: "bikey-d2405.firebaseapp.com",
    projectId: "bikey-d2405",
    storageBucket: "bikey-d2405.firebasestorage.app",
    messagingSenderId: "120828372076",
    appId: "1:120828372076:web:7611ebf919a1e4b6612449",
    measurementId: "G-HQYNBSN15S"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();
export { auth }