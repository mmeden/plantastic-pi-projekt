import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC9u2ez7s1HvSlMUfc82SjZf-7jLJAKWCc",
  authDomain: "plantastic2.firebaseapp.com",
  projectId: "plantastic2",
  storageBucket: "plantastic2.firebasestorage.app",
  messagingSenderId: "960356084256",
  appId: "1:960356084256:web:4b050f48018dcef7d0ea45"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }