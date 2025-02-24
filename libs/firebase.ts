"use client";  // Bu satır SSR sırasında Firebase'in çalışmasını engeller

import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Firebase Konfigürasyonu
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase Uygulamasını Başlatma (Yalnızca bir kez başlatılacak)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Firestore ve Storage servislerini başlatma
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
export default app;
