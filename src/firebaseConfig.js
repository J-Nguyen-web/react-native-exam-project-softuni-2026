// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhDqH9Ew4a-4f_Io_03LQ_6eNg4HAv85s",
  authDomain: "sight2share.firebaseapp.com",
  projectId: "sight2share",
  storageBucket: "sight2share.firebasestorage.app",
  messagingSenderId: "393321321672",
  appId: "1:393321321672:web:a5ce881261bf5cf49101fd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);