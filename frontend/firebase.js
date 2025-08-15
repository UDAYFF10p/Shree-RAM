import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBe1-wz4--Ey_UETXe_WFB8XWhPBNybt_0",
  authDomain: "shree-ram-bc751.firebaseapp.com",
  projectId: "shree-ram-bc751",
  storageBucket: "shree-ram-bc751.firebasestorage.app",
  messagingSenderId: "992991717018",
  appId: "1:992991717018:web:99c983c3e7c6e3b976e123",
  measurementId: "G-G1WT7XKCSF"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
