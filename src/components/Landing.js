// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDBFKx4bm3NdJpY7cJtFQBYeWcGtyBs5oY",
  authDomain: "consapp-aebb5.firebaseapp.com",
  projectId: "consapp-aebb5",
  storageBucket: "consapp-aebb5.appspot.com",
  messagingSenderId: "492087902820",
  appId: "1:492087902820:web:de453957a73f1b3ab35571",
  measurementId: "G-E85252NPLX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage };
export default app;
