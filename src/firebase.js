import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- Tambahan

const firebaseConfig = {
  apiKey: "AIzaSyCskYz4oBaGrjmOLoAI9oN19N5kpxzHGgo",
    authDomain: "fruits-app-56f8e.firebaseapp.com",
    projectId: "fruits-app-56f8e",
  // ... parameter lainnya
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // <-- Tambahan