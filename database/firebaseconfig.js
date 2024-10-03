import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBR7nwiWE4ZU8epXbF51Bz9ch3wdbo_TcE",
  authDomain: "graficosjinieth.firebaseapp.com",
  projectId: "graficosjinieth",
  storageBucket: "graficosjinieth.appspot.com",
  messagingSenderId: "117126306877",
  appId: "1:117126306877:web:3d0a86fb6aa5bc1bd29e54"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;