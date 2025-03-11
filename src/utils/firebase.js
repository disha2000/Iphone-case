// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD310poil4GQr70OBMDg_712JD2YQOqbB4",
  authDomain: "mobile-case-cbf6e.firebaseapp.com",
  projectId: "mobile-case-cbf6e",
  storageBucket: "mobile-case-cbf6e.firebasestorage.app",
  messagingSenderId: "476659884623",
  appId: "1:476659884623:web:17c8f3e251791c2ec6003a",
  measurementId: "G-5V33RS56S7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export default app;

