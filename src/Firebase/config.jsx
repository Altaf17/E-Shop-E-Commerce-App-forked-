import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDv-6sD_eitNu92T3kBIQSxC2CoZC3wBaU",
  authDomain: "e-shop-7ccf9.firebaseapp.com",
  projectId: "e-shop-7ccf9",
  storageBucket: "e-shop-7ccf9.appspot.com",
  messagingSenderId: "1028916139649",
  appId: "1:1028916139649:web:d69d940996d7a4a2509f80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
