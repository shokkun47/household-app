// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOaxqXvBM-Tk-hwV36TilfY-oPi2tdZmE",
  authDomain: "household-app-24cd3.firebaseapp.com",
  projectId: "household-app-24cd3",
  storageBucket: "household-app-24cd3.appspot.com",
  messagingSenderId: "839403307359",
  appId: "1:839403307359:web:b25a6b3e494b27f4be76ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };