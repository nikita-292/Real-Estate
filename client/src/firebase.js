// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "real-state-b9618.firebaseapp.com",
  projectId: "real-state-b9618",
  storageBucket: "real-state-b9618.firebasestorage.app",
  messagingSenderId: "653640047332",
  appId: "1:653640047332:web:7b8c2545c9e2bc56a76af1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);