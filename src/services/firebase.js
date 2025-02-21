import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
/*
 * These keys can be stored in a .env file for better security and maintainability.
 * However, during testing, environment variables may not be accessible, 
 * so they are hardcoded here temporarily.
 * For security reasons, im removing these hardcoded keys.
 */

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID ,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
