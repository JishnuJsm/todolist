// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZqntXPLnLcYOvF-Mm_0xXEhIKUD8PfXc",
  authDomain: "mytodoapp-ca54c.firebaseapp.com",
  projectId: "mytodoapp-ca54c",
  storageBucket: "mytodoapp-ca54c.appspot.com",
  messagingSenderId: "177497153207",
  appId: "1:177497153207:web:ca0a294b8b7f5c551e7732",
  measurementId: "G-SV6PDCVN05"
};

initializeApp(firebaseConfig);

const data = getFirestore();
const auth = getAuth();

export { data, auth };
