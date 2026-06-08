import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAkQN6WnaaqZfih_zekQwYOF63n0CKbwnA",
  authDomain: "plantastic-6b162.firebaseapp.com",
  projectId: "plantastic-6b162",
  storageBucket: "plantastic-6b162.firebasestorage.app",
  messagingSenderId: "1075574122046",
  appId: "1:1075574122046:web:6fdfb2895674d18621536f"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }