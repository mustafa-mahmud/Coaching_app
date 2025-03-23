// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBYoFcL9bC8V3apLrmRvrLK9qwEYGeQIM0',
  authDomain: 'project-2025-4cacc.firebaseapp.com',
  projectId: 'project-2025-4cacc',
  storageBucket: 'project-2025-4cacc.firebasestorage.app',
  messagingSenderId: '1097798868509',
  appId: '1:1097798868509:web:f987993e2b292c489130f4',
  measurementId: 'G-JN9WPTNBLN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
const analytics = getAnalytics(app);
