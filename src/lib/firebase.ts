import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD8JjBFtND6rPzuzvkVD4VGgUrfjBCeLLs",
  authDomain: "aipoweredtravel-d6f80.firebaseapp.com",
  projectId: "aipoweredtravel-d6f80",
  storageBucket: "aipoweredtravel-d6f80.firebasestorage.app",
  messagingSenderId: "719751127382",
  appId: "1:719751127382:web:6390bb468e5a91e51176f7",
  measurementId: "G-B17FEB0KSS"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Analytics only works in browser
let analytics;
if (typeof window !== "undefined") {
  isSupported().then(yes => yes && (analytics = getAnalytics(app)));
}

export { app, auth, db, analytics };
