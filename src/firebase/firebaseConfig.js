// Import the functions you need from the SDKs you need
// 初始化
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwrSoPt6G1JHJMiSg4G3kAT8a2diYSiQg",
  authDomain: "metrogo-c90f8.firebaseapp.com",
  databaseURL: "https://metrogo-c90f8-default-rtdb.firebaseio.com",
  projectId: "metrogo-c90f8",
  storageBucket: "metrogo-c90f8.firebasestorage.app",
  messagingSenderId: "48761177586",
  appId: "1:48761177586:web:61a5d5e2568f73f396576b",
  measurementId: "G-FNN8FP9BWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };