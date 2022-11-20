// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDodofEQq0EJ6PWL9gtf-9jQ8xeHNcc9gs",
    authDomain: "bikun-tracker.firebaseapp.com",
    databaseURL: "https://bikun-tracker-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bikun-tracker",
    storageBucket: "bikun-tracker.appspot.com",
    messagingSenderId: "985854222615",
    appId: "1:985854222615:web:7f80ac54e077d31c3d5752",
    measurementId: "G-TKY81WHRV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;