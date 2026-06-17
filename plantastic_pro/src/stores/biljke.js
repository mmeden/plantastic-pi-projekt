import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/firebase.js'
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore'

export const useBiljkeStore = defineStore('biljke', () => {
  const katalog = ref([])
  const mojeBiljke = ref([])
  const povijest = ref({})
  const ucitano = ref(false)

  function inicijaliziraj() {
    onSnapshot(collection(db, 'katalog'), (snapshot) => {
      katalog.value = snapshot.docs
        .map(d => ({ ...d.data(), id: d.id }))
        .sort((a, b) => a.naziv.localeCompare(b.naziv))
    })
    ucitano.value = true
  }

  function ucitajKorisnika(uid) {
    onSnapshot(collection(db, 'korisnici', uid, 'biljke'), (snapshot) => {
      mojeBiljke.value = snapshot.docs.map(d => ({ ...d.data(), id: d.id }))
    })

    onSnapshot(collection(db, 'korisnici', uid, 'povijest'), (snapshot) => {
      const p = {}
      snapshot.docs.forEach(d => { p[d.id] = d.data().unosi || [] })
      povijest.value = p
    })
  }

  async function dodajUKatalog(biljka) {
    const id = Date.now().toString()
    await setDoc(doc(db, 'katalog', id), { ...biljka, id })
  }

  async function obrisiIzKataloga(id) {
    await deleteDoc(doc(db, 'katalog', id.toString()))
  }

  async function urediUKatalogu(biljka) {
    await setDoc(doc(db, 'katalog', biljka.id.toString()), biljka)
  }

  async function dodajBiljku(uid, biljka) {
    await setDoc(doc(db, 'korisnici', uid, 'biljke', biljka.id.toString()), biljka)
  }

  async function ukloniBiljku(uid, id) {
    await deleteDoc(doc(db, 'korisnici', uid, 'biljke', id.toString()))
  }

  async function evidentirajZalijevanje(uid, biljkaId) {
    const sada = new Date()
    const formatiran = sada.toLocaleString('hr-HR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
    const noviUnos = { datum: formatiran, timestamp: sada.getTime() }
    const postojeci = povijest.value[biljkaId] || []
    const novi = [noviUnos, ...postojeci]
    await setDoc(doc(db, 'korisnici', uid, 'povijest', biljkaId.toString()), { unosi: novi })
  }

  function getPovijest(biljkaId) {
    return povijest.value[biljkaId] || []
  }

  function getDaniDoZalijevanja(biljka) {
    const interval = biljka.intervalZalijevanja || 7
    const povijestBiljke = povijest.value[biljka.id]
    if (!povijestBiljke || povijestBiljke.length === 0) return null
    const zadnje = povijestBiljke[0].timestamp
    const sljedece = zadnje + interval * 24 * 60 * 60 * 1000
    const dani = Math.ceil((sljedece - Date.now()) / (24 * 60 * 60 * 1000))
    return dani
  }

  function getStatusZalijevanja(biljka) {
    const dani = getDaniDoZalijevanja(biljka)
    if (dani === null) return { tekst: 'Još nije zalivana', klasa: 'status-pazi' }
    if (dani < 0) return { tekst: `Kasni ${Math.abs(dani)} dan(a)`, klasa: 'status-kasni' }
    if (dani === 0) return { tekst: 'Zalij danas!', klasa: 'status-danas' }
    if (dani <= 2) return { tekst: `Za ${dani} dan(a)`, klasa: 'status-uskoro' }
    return { tekst: `Za ${dani} dana`, klasa: 'status-zdravo' }
  }

  return {
    katalog,
    mojeBiljke,
    povijest,
    ucitano,
    inicijaliziraj,
    ucitajKorisnika,
    dodajUKatalog,
    obrisiIzKataloga,
    urediUKatalogu,
    dodajBiljku,
    ukloniBiljku,
    evidentirajZalijevanje,
    getPovijest,
    getDaniDoZalijevanja,
    getStatusZalijevanja
  }
})