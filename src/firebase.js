import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDhzK-6NaTJT9-tQV51PcvuEQeOxDXymAg",
    authDomain: "clone-8b834.firebaseapp.com",
    projectId: "clone-8b834",
    storageBucket: "clone-8b834.appspot.com",
    messagingSenderId: "304616658224",
    appId: "1:304616658224:web:831f45847006b22e49a4f5",
    measurementId: "G-NX7XXTY2B6"
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export default firebaseApp;