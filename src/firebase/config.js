// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDidX-jw718LE9IqjyVQqQduMgGsx_sW8",
  authDomain: "athletix-15748.firebaseapp.com",
  projectId: "athletix-15748",
  storageBucket: "athletix-15748.firebasestorage.app",
  messagingSenderId: "48671200450",
  appId: "1:48671200450:web:1170f70424c134a832975b",
  measurementId: "G-KEBPVGXLRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Optional: Add scopes for additional user info
googleProvider.addScope('profile');
googleProvider.addScope('email');

export default app;