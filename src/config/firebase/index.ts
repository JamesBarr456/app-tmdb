// Import the functions you need from the SDKs you need

import { GoogleAuthProvider, getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAW5w-4HR6GzJ_i93W5Ns1nHs9JSQKD63I', //ocultar esto, llevarlo a mi .env
  authDomain: 'movie-app-8ad97.firebaseapp.com',
  projectId: 'movie-app-8ad97',
  storageBucket: 'movie-app-8ad97.firebasestorage.app',
  messagingSenderId: '456001892372',
  appId: '1:456001892372:web:0f40a945dc76eb159ef701',
  measurementId: 'G-JNVW8MM6FE',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
