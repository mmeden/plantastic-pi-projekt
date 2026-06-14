import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '@/firebase.js'


const ADMIN_EMAILS = ['admin@plantastic.com']

export const useAuthStore = defineStore('auth', () => {
  const korisnik = ref(null)
  const ucitavanje = ref(true)

  const jeLogiran = computed(() => korisnik.value !== null)
  const jeAdmin = computed(() => ADMIN_EMAILS.includes(korisnik.value?.email))

  // Prati stanje autentifikacije
  onAuthStateChanged(auth, (user) => {
    if (user) {
      korisnik.value = {
        uid: user.uid,
        ime: user.displayName || user.email.split('@')[0],
        email: user.email,
      }
    } else {
      korisnik.value = null
    }
    ucitavanje.value = false
  })

  async function registracija(ime, email, lozinka) {
    try {
      const rezultat = await createUserWithEmailAndPassword(auth, email, lozinka)
      korisnik.value = {
        uid: rezultat.user.uid,
        ime: ime,
        email: rezultat.user.email,
      }
      return { uspjeh: true }
    } catch (error) {
      let poruka = 'Greška pri registraciji.'
      if (error.code === 'auth/email-already-in-use') poruka = 'Korisnik s tim emailom već postoji.'
      if (error.code === 'auth/weak-password') poruka = 'Lozinka mora imati najmanje 6 znakova.'
      if (error.code === 'auth/invalid-email') poruka = 'Unesite ispravnu email adresu.'
      return { uspjeh: false, greska: poruka }
    }
  }

  async function prijava(email, lozinka) {
    try {
      await signInWithEmailAndPassword(auth, email, lozinka)
      return { uspjeh: true }
    } catch (error) {
      return { uspjeh: false, greska: 'Pogrešan email ili lozinka.' }
    }
  }

  async function prijavaGoogleom() {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      return { uspjeh: true }
    } catch (error) {
      return { uspjeh: false, greska: 'Greška pri Google prijavi.' }
    }
  }

  async function odjava() {
    await signOut(auth)
    korisnik.value = null
  }

  return { korisnik, jeLogiran, jeAdmin, ucitavanje, registracija, prijava, prijavaGoogleom, odjava }
})