// firebase-config.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBFKx4bm3NdJpY7cJtFQBYeWcGtyBs5oY",
  authDomain: "consapp-aebb5.firebaseapp.com",
  projectId: "consapp-aebb5",
  storageBucket: "consapp-aebb5.firebasestorage.app",
  messagingSenderId: "492087902820",
  appId: "1:492087902820:web:de453957a73f1b3ab35571",
  measurementId: "G-E85252NPLX"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Auth
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
setPersistence(auth, browserLocalPersistence); // enable persistent login

// Initialize Firestore
export const db = getFirestore(app);

export default app;
