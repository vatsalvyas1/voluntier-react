import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBD8EjieHdShkWSa1CR94DNmsgyvdIBXnM",
  authDomain: "voluntier-1.firebaseapp.com",
  projectId: "voluntier-1",
  storageBucket: "voluntier-1.appspot.com",
  messagingSenderId: "1049654198486",
  appId: "1:1049654198486:web:b8c8786eca39b188430977",
  measurementId: "G-VZ3MVKEZ2M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage };
