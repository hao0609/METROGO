import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCr0etNy5x5Zdo9vzFintxYii6ckHRroHw",
  authDomain: "metrogo-ff75f.firebaseapp.com",
  databaseURL: "https://metrogo-ff75f-default-rtdb.firebaseio.com",
  projectId: "metrogo-ff75f",
  storageBucket: "metrogo-ff75f.firebasestorage.app",
  messagingSenderId: "36460695281",
  appId: "1:36460695281:web:42c5fa5fc62888561e2350",
};

// 引用 Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
