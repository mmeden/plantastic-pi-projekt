import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

function ucitajIzStorage(kljuc, defaultVrijednost) {
  try {
    const podatak = localStorage.getItem(kljuc)
    return podatak ? JSON.parse(podatak) : defaultVrijednost
  } catch {
    return defaultVrijednost
  }
}

export const useBiljkeStore = defineStore('biljke', () => {
  const katalog = ref(ucitajIzStorage('plantastic_katalog', []))
  const mojeBiljke = ref(ucitajIzStorage('plantastic_biljke', []))
  const povijest = ref(ucitajIzStorage('plantastic_povijest', {}))

  watch(katalog, (nova) => {
    localStorage.setItem('plantastic_katalog', JSON.stringify(nova))
  }, { deep: true })

  watch(mojeBiljke, (nova) => {
    localStorage.setItem('plantastic_biljke', JSON.stringify(nova))
  }, { deep: true })

  watch(povijest, (nova) => {
    localStorage.setItem('plantastic_povijest', JSON.stringify(nova))
  }, { deep: true })

  function dodajUKatalog(biljka) {
    katalog.value.push(biljka)
  }

  function dodajBiljku(biljka) {
    if (!mojeBiljke.value.find(b => b.id === biljka.id)) {
      mojeBiljke.value.push(biljka)
    }
  }

  function ukloniBiljku(id) {
    mojeBiljke.value = mojeBiljke.value.filter(b => b.id !== id)
  }

  function obrisiIzKataloga(id) {
    katalog.value = katalog.value.filter(b => b.id !== id)
  }

  function evidentirajZalijevanje(biljkaId) {
    const sada = new Date()
    const formatiran = sada.toLocaleString('hr-HR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
    if (!povijest.value[biljkaId]) {
      povijest.value = { ...povijest.value, [biljkaId]: [] }
    }
    povijest.value[biljkaId] = [
      { datum: formatiran, timestamp: sada.getTime() },
      ...povijest.value[biljkaId]
    ]
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
    dodajUKatalog,
    dodajBiljku,
    ukloniBiljku,
    obrisiIzKataloga,
    evidentirajZalijevanje,
    getPovijest,
    getDaniDoZalijevanja,
    getStatusZalijevanja
  }
})