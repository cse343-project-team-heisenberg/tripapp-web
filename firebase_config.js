
import {getAuth} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js";
// Import th e functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js"
import {getFirestore} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js"
import { getStorage } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-storage.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrLjowPNJK1tVJa2p4Tka8BVDiyOIEtis",
  authDomain: "deneme-85900.firebaseapp.com",
  projectId: "deneme-85900",
  storageBucket: "deneme-85900.appspot.com",
  messagingSenderId: "613007456831",
  appId: "1:613007456831:web:4e96f1b1da5244a080568a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);