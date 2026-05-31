import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBiljkeStore = defineStore('biljke', () => {
  const mojeBiljke = ref([])
  const povijest = ref({})

  function dodajBiljku(biljka) {
    if (!mojeBiljke.value.find(b => b.id === biljka.id)) {
      mojeBiljke.value.push(biljka)
    }
  }

  function ukloniBiljku(id) {
    mojeBiljke.value = mojeBiljke.value.filter(b => b.id !== id)
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
    povijest.value[biljkaId] = [formatiran, ...povijest.value[biljkaId]]
  }

  function getPovijest(biljkaId) {
    return povijest.value[biljkaId] || []
  }

  return { mojeBiljke, dodajBiljku, ukloniBiljku, evidentirajZalijevanje, getPovijest }
})