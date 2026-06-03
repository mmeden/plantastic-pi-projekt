import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const korisnik = ref(JSON.parse(localStorage.getItem('plantastic_korisnik') || 'null'))

  const jeLogiran = computed(() => korisnik.value !== null)
  const jeAdmin = computed(() => korisnik.value?.uloga === 'admin')

  // Fake korisnici - zamijeniti s Firebaseom
  const korisnici = ref(JSON.parse(localStorage.getItem('plantastic_korisnici') || 'null') || [
    { id: 1, ime: 'Admin', email: 'admin@plantastic.com', lozinka: 'admin123', uloga: 'admin' }
  ])

  function registracija(ime, email, lozinka) {
    if (korisnici.value.find(k => k.email === email)) {
      return { uspjeh: false, greska: 'Korisnik s tim emailom već postoji.' }
    }
    const noviKorisnik = {
      id: Date.now(),
      ime,
      email,
      lozinka,
      uloga: 'korisnik'
    }
    korisnici.value.push(noviKorisnik)
    localStorage.setItem('plantastic_korisnici', JSON.stringify(korisnici.value))
    const { lozinka: _, ...bezLozinke } = noviKorisnik
    korisnik.value = bezLozinke
    localStorage.setItem('plantastic_korisnik', JSON.stringify(bezLozinke))
    return { uspjeh: true }
  }

  function prijava(email, lozinka) {
    const nadjen = korisnici.value.find(k => k.email === email && k.lozinka === lozinka)
    if (!nadjen) {
      return { uspjeh: false, greska: 'Pogrešan email ili lozinka.' }
    }
    const { lozinka: _, ...bezLozinke } = nadjen
    korisnik.value = bezLozinke
    localStorage.setItem('plantastic_korisnik', JSON.stringify(bezLozinke))
    return { uspjeh: true }
  }

  function odjava() {
    korisnik.value = null
    localStorage.removeItem('plantastic_korisnik')
  }

  return { korisnik, jeLogiran, jeAdmin, prijava, registracija, odjava }
})