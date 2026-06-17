<script setup>
import { onMounted } from 'vue'
import { useBiljkeStore } from '@/stores/biljke'
import { useAuthStore } from '@/stores/auth'
import { watch } from 'vue'

const store = useBiljkeStore()
const auth = useAuthStore()

onMounted(() => {
  store.inicijaliziraj()
})

watch(() => auth.korisnik, (korisnik) => {
  if (korisnik) store.ucitajKorisnika(korisnik.uid)
}, { immediate: true })
</script>

<template>
  <RouterView />
</template>