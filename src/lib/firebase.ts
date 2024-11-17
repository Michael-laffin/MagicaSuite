import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAjCQ8q5kx6cFPEzURpDvvSLpXfTFdFHWQ",
  authDomain: "magicasuite-48dc2.firebaseapp.com",
  projectId: "magicasuite-48dc2",
  storageBucket: "magicasuite-48dc2.firebasestorage.app",
  messagingSenderId: "291488947555",
  appId: "1:291488947555:web:3a6df30887a45db8b4c756",
  measurementId: "G-LBWB9686ZH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});