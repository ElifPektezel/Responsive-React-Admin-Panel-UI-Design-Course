import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "tutorial-a280f.firebaseapp.com",
  projectId: "tutorial-a280f",
  storageBucket: "tutorial-a280f.appspot.com",
  messagingSenderId: "817166322789",
  appId: "1:817166322789:web:b5b5be36d297ce3b8c0a8c"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);