// Import the functions you need from the SDKs you need
import { initializeApp,  } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

// Your web app's Firebase configuration it may switch between different enviroment for production and development
const firebaseConfig = JSON.parse(process.env.EXPO_PUBLIC_FIREBASE_CONFIG);

// { thats stringified in env
//   apiKey: "AIzaSyBhDqH9Ew4a-4f_Io_03LQ_6eNg4HAv85s",
//   authDomain: "sight2share.firebaseapp.com",
//   projectId: "sight2share",
//   storageBucket: "sight2share.firebasestorage.app",
//   messagingSenderId: "393321321672",
//   appId: "1:393321321672:web:a5ce881261bf5cf49101fd"
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app,{
    persistence: getReactNativePersistence(AsyncStorage)
});