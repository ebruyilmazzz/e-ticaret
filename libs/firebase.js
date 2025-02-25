"use client";

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1c8x8A9V_YX7483eUswG-4b5919YoR90",
  authDomain: "shop-accdf.firebaseapp.com",
  projectId: "shop-accdf",
  storageBucket: "shop-accdf.appspot.com",
  messagingSenderId: "1055750601136",
  appId: "1:1055750601136:web:087162ab8982c958c9be75",
  measurementId: "G-6X1ELM8NQK"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);