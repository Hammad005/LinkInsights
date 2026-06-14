// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIw8RkM-PO1g1Y4fNsg8MWS14xrSI38lo",
  authDomain: "linkinsights-56218.firebaseapp.com",
  projectId: "linkinsights-56218",
  storageBucket: "linkinsights-56218.firebasestorage.app",
  messagingSenderId: "764528843775",
  appId: "1:764528843775:web:ae4af0beb235fc51fc65ca",
  measurementId: "G-H579V1K739"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// 🔥 create fresh provider every time
export const createGoogleProvider = () => {
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account consent",
  });

  return provider;
};