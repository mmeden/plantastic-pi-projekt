import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/firebase.js'
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore'

const defaultKatalog = [
  { id: '1', naziv: 'Afelandra', vrsta: 'Aphelandra squarrosa', opis: 'Egzotična biljka sa žutim cvjetovima i prugastim listovima. Voli toplinu.', intervalZalijevanja: 5, slika: 'https://images.unsplash.com/photo-1587334207407-3c2f4f46af7b?w=400&q=80' },
  { id: '2', naziv: 'Aloja vera', vrsta: 'Aloe barbadensis', opis: 'Sukulent poznat po ljekovitom gelu. Voli sunce i rijetko zalijevanje.', intervalZalijevanja: 14, slika: 'https://images.unsplash.com/photo-1567331711402-509c12c41959?w=400&q=80' },
  { id: '3', naziv: 'Bambus', vrsta: 'Bambusoideae', opis: 'Brzorastuća biljka koja donosi zen ugođaj.', intervalZalijevanja: 3, slika: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id: '4', naziv: 'Begonija', vrsta: 'Begonia rex', opis: 'Dekorativna biljka s pisanim šarenim listovima.', intervalZalijevanja: 5, slika: 'https://images.unsplash.com/photo-1599598425947-5202edd56fdb?w=400&q=80' },
  { id: '5', naziv: 'Bosiljak', vrsta: 'Ocimum basilicum', opis: 'Aromatično bilje savršeno za kuhinju. Voli toplo i sunčano.', intervalZalijevanja: 2, slika: 'https://images.unsplash.com/photo-1618375531912-867984bdfd87?w=400&q=80' },
  { id: '6', naziv: 'Dracena', vrsta: 'Dracaena marginata', opis: 'Elegantna biljka s uskim listovima s crvenim rubovima.', intervalZalijevanja: 10, slika: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=400&q=80' },
  { id: '7', naziv: 'Filodendron', vrsta: 'Philodendron hederaceum', opis: 'Tropska penjačica sa srcolikim listovima. Voli toplo i vlažno.', intervalZalijevanja: 7, slika: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&q=80' },
  { id: '8', naziv: 'Fikus', vrsta: 'Ficus lyrata', opis: 'Popularna sobna biljka s velikim sjajnim listovima. Ne voli premještanje.', intervalZalijevanja: 7, slika: 'https://images.unsplash.com/photo-1611211232932-da3113c5b960?w=400&q=80' },
  { id: '9', naziv: 'Juka', vrsta: 'Yucca elephantipes', opis: 'Impozantna biljka s uskim listovima na dugoj stabljici.', intervalZalijevanja: 10, slika: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
  { id: '10', naziv: 'Kaktus', vrsta: 'Cactaceae', opis: 'Minimalistički sukulent koji zahtijeva minimum njege.', intervalZalijevanja: 21, slika: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=80' },
  { id: '11', naziv: 'Kalanhoeja', vrsta: 'Kalanchoe blossfeldiana', opis: 'Sukulent s dugovječnim šarenim cvjetovima. Laka za uzgoj.', intervalZalijevanja: 10, slika: 'https://images.unsplash.com/photo-1596438459194-f275f413d6ff?w=400&q=80' },
  { id: '12', naziv: 'Krotona', vrsta: 'Codiaeum variegatum', opis: 'Šarena tropska biljka s višebojnim listovima.', intervalZalijevanja: 5, slika: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80' },
  { id: '13', naziv: 'Lavanda', vrsta: 'Lavandula angustifolia', opis: 'Mirisna biljka s ljubičastim cvjetovima. Idealna za sunčane prozore.', intervalZalijevanja: 5, slika: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80' },
  { id: '14', naziv: 'Marantha tricolor', vrsta: 'Maranta leuconeura', opis: 'Poznata po šarenim listovima koji se savijaju noću. Voli vlagu.', intervalZalijevanja: 5, slika: 'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=400&q=80' },
  { id: '15', naziv: 'Mirna ljiljana', vrsta: 'Spathiphyllum wallisii', opis: 'Elegantna biljka s bijelim cvjetovima. Pročišćava zrak.', intervalZalijevanja: 5, slika: 'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=400&q=80' },
  { id: '16', naziv: 'Monstera', vrsta: 'Monstera deliciosa', opis: 'Tropska biljka s velikim perforiranim listovima. Idealna za dnevni boravak.', intervalZalijevanja: 7, slika: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80' },
  { id: '17', naziv: 'Orhideja', vrsta: 'Phalaenopsis', opis: 'Elegantna cvatnica s dugotrajnim cvjetovima. Voli difuzno svjetlo.', intervalZalijevanja: 7, slika: 'https://images.unsplash.com/photo-1566907225470-0eedc5d98e3d?w=400&q=80' },
  { id: '18', naziv: 'Svekrvin jezik', vrsta: 'Sansevieria trifasciata', opis: 'Iznimno otporna biljka, savršena za početnike. Podnosi i malo svjetla.', intervalZalijevanja: 14, slika: 'https://images.unsplash.com/photo-1599598425947-5202edd56fdb?w=400&q=80' },
  { id: '19', naziv: 'Zamiokulkas', vrsta: 'Zamioculcas zamiifolia', opis: 'Otporna biljka s tamnozelenim sjajnim listovima. Podnosi zanemarivanje.', intervalZalijevanja: 14, slika: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400&q=80' },
  { id: '20', naziv: 'Zlatni puzavac', vrsta: 'Epipremnum aureum', opis: 'Brzorastuća penjačica sa šarenim listovima. Idealna za police.', intervalZalijevanja: 7, slika: 'https://images.unsplash.com/photo-1587334207407-3c2f4f46af7b?w=400&q=80' },
]

export const useBiljkeStore = defineStore('biljke', () => {
  const katalog = ref([])
  const mojeBiljke = ref([])
  const povijest = ref({})
  const ucitano = ref(false)

  // Ucitaj katalog iz Firestorea, ako je prazan dodaj default
  async function inicijaliziraj() {
    const snap = await getDocs(collection(db, 'katalog'))
    if (snap.empty) {
      for (const b of defaultKatalog) {
        await setDoc(doc(db, 'katalog', b.id), b)
      }
    }

    // Slušaj promjene u katalogu u realnom vremenu
    onSnapshot(collection(db, 'katalog'), (snapshot) => {
      katalog.value = snapshot.docs.map(d => ({ ...d.data(), id: d.id }))
        .sort((a, b) => a.naziv.localeCompare(b.naziv))
    })

    ucitano.value = true
  }

  // Ucitaj biljke i povijest za prijavljenog korisnika
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