import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnFiOorHPr0A2ItgC76ADoBl_0JXMj7L8",
  authDomain: "web-kelas-196f9.firebaseapp.com",
  projectId: "web-kelas-196f9",
  storageBucket: "web-kelas-196f9.firebasestorage.app",
  messagingSenderId: "495477073260",
  appId: "1:495477073260:web:2493ac89c0e8a8d834bf49",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
