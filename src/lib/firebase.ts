import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "flexstore-13fc7.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: "flexstore-13fc7.firebasestorage.app",
    messagingSenderId: "870585021452",
    appId: "1:870585021452:web:ef73c9eacd36b3fdffaa29",
    measurementId: "G-PV8F0LGVXB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
