import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUDVxG__jVAQPx9BB407xP2U5F_ihxSyE",
  authDomain: "auth-pt-mega-semesta.firebaseapp.com",
  projectId: "auth-pt-mega-semesta",
  storageBucket: "auth-pt-mega-semesta.appspot.com",
  messagingSenderId: "145547141290",
  appId: "1:145547141290:web:47e9b391b73bf2cbc0b0d3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
