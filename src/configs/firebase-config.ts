import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfYuTwzggJQX3kGShVuACzGOZjOuBFYU4",
  authDomain: "kitchen-managements.firebaseapp.com",
  databaseURL:
    "https://kitchen-managements-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kitchen-managements",
  storageBucket: "kitchen-managements.appspot.com",
  messagingSenderId: "215808846626",
  appId: "1:215808846626:web:dcb4fcf321317c8627937b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
