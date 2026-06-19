<script setup>
import { ref, computed } from 'vue'
import { useBiljkeStore } from '@/stores/biljke'
import NavBar from '@/components/NavBar.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const store = useBiljkeStore()
const pretraga = ref('')

const filtriraneBiljke = computed(() => {
  const q = pretraga.value.toLowerCase().trim()
  const lista = q
    ? store.katalog.filter(b => b.naziv.toLowerCase().includes(q) || b.vrsta.toLowerCase().includes(q))
    : [...store.katalog]
  return lista.sort((a, b) => a.naziv.localeCompare(b.naziv))
})

function jeVecDodana(id) {
  return store.mojeBiljke.some(b => b.id === id)
}

function dodaj(biljka) {
  store.dodajBiljku(auth.korisnik.uid, biljka)
}
</script>

<template>
  <div class="stranica">
    <NavBar />

    <main class="sadrzaj">
      <div class="uvod">
        <h1>Dodaj biljku</h1>
        <p>Pretraži katalog i dodaj biljke u svoju kolekciju.</p>
      </div>

      <input v-model="pretraga" type="text" placeholder="Pretraži po imenu ili vrsti..." class="pretraga" />

      <p v-if="filtriraneBiljke.length === 0" class="nema">
        Nema biljki za "{{ pretraga }}"
      </p>

      <div class="grid">
        <div v-for="biljka in filtriraneBiljke" :key="biljka.id" class="kartica" :class="{ dodana: jeVecDodana(biljka.id) }" >
          <div class="slika-wrapper">
            <img :src="biljka.slika" :alt="biljka.naziv" class="slika" />
          </div>
          <div class="info">
            <h3>{{ biljka.naziv }}</h3>
            <p class="vrsta">{{ biljka.vrsta }}</p>
            <br>
            <button
              class="btn-dodaj"
              :class="{ 'btn-dodana': jeVecDodana(biljka.id) }"
              @click="dodaj(biljka)"
              :disabled="jeVecDodana(biljka.id)"
            >
              {{ jeVecDodana(biljka.id) ? '✓ Dodano' : '+ Dodaj' }}
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.uvod {
  margin-bottom: 24px;
}

.uvod h1 {
  font-size: 26px;
  font-weight: 700;
  color: #2c2c2a;
  margin: 0 0 6px;
}

.uvod p {
  font-size: 14px;
  color: #888780;
  margin: 0;
}

.pretraga {
  width: 100%;
  max-width: 400px;
  padding: 10px 16px;
  border: 1px solid #e8e0d8;
  border-radius: 8px;
  font-size: 14px;
  background: #fff;
  outline: none;
  margin-bottom: 28px;
  box-sizing: border-box;
}

.pretraga:focus {
  border-color: #1e3a2f;
}

.nema {
  font-size: 14px;
  color: #888780;
  margin-bottom: 24px;
}

.kartica {
  background: #fff;
  border: 1px solid #e8e0d8;
  border-radius: 12px;
  overflow: hidden;
}

.kartica.dodana {
  opacity: 0.6;
}

.slika-wrapper {
  background: #f5f0ea;
  height: 160px;
  overflow: hidden;
}

.slika {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  padding: 12px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info h3 {
  font-size: 15px;
  font-weight: 600;
  color: #2c2c2a;
  margin: 0;
}

.vrsta {
  font-size: 12px;
  color: #888780;
  margin: 0;
}

.btn-dodaj {
  width: 100%;
  padding: 8px;
  background: #1e3a2f;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  margin-top: auto;
}

.btn-dodaj:hover:not(:disabled) {
  background: #2a4f40;
}

.btn-dodana {
  background: #888780;
  cursor: default;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}
</style>