import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv2buD4msL4TBRN7RxOtvirRZSFLXt3YE",
  authDomain: "smart-device-project.firebaseapp.com",
  projectId: "smart-device-project",
  storageBucket: "smart-device-project.appspot.com",
  messagingSenderId: "435312288734",
  appId: "1:435312288734:web:4418caf797f19e0331b34f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export { db, ref, onValue };
