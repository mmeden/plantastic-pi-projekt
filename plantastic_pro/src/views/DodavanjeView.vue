<script setup>
import { ref, computed } from 'vue'
import { useBiljkeStore } from '@/stores/biljke'

const store = useBiljkeStore()
const pretraga = ref('')

const katalog = [
  { id: 1, naziv: 'Monstera', vrsta: 'Monstera deliciosa', opis: 'Tropska biljka s velikim perforiranim listovima. Idealna za dnevni boravak.', status: 'Zdravo', slika: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80' },
  { id: 2, naziv: 'Svekrvin jezik', vrsta: 'Sansevieria trifasciata', opis: 'Iznimno otporna biljka, savršena za početnike. Podnosi i malo svjetla.', status: 'Zdravo', slika: 'https://images.unsplash.com/photo-1599598425947-5202edd56fdb?w=400&q=80' },
  { id: 3, naziv: 'Zlatni puzavac', vrsta: 'Epipremnum aureum', opis: 'Brzorastuća penjačica sa šarenim listovima. Idealna za police.', status: 'Zdravo', slika: 'https://images.unsplash.com/photo-1587334207407-3c2f4f46af7b?w=400&q=80' },
  { id: 4, naziv: 'Marantha tricolor', vrsta: 'Maranta leuconeura', opis: 'Poznata po šarenim listovima koji se savijaju noću. Voli vlagu.', status: 'Pazi', slika: 'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=400&q=80' },
  { id: 5, naziv: 'Fikus', vrsta: 'Ficus lyrata', opis: 'Popularna sobna biljka s velikim sjajnim listovima. Ne voli premještanje.', status: 'Zdravo', slika: 'https://images.unsplash.com/photo-1611211232932-da3113c5b960?w=400&q=80' },
  { id: 6, naziv: 'Aloja vera', vrsta: 'Aloe barbadensis', opis: 'Sukulent poznat po ljekovitom gelu. Voli sunce i rijetko zalijevanje.', status: 'Zalijevanje', slika: 'https://images.unsplash.com/photo-1567331711402-509c12c41959?w=400&q=80' },
  { id: 7, naziv: 'Orhideja', vrsta: 'Phalaenopsis', opis: 'Elegantna cvatnica s dugotrajnim cvjetovima. Voli difuzno svjetlo.', status: 'Zdravo', slika: 'https://images.unsplash.com/photo-1566907225470-0eedc5d98e3d?w=400&q=80' },
  { id: 8, naziv: 'Kaktus', vrsta: 'Cactaceae', opis: 'Minimalistički sukulent koji zahtijeva minimum njege.', status: 'Zdravo', slika: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=80' },
  { id: 9, naziv: 'Lavanda', vrsta: 'Lavandula angustifolia', opis: 'Mirisna biljka s ljubičastim cvjetovima. Idealna za sunčane prozore.', status: 'Zdravo', slika: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80' },
  { id: 10, naziv: 'Bambus', vrsta: 'Bambusoideae', opis: 'Brzorastuća biljka koja donosi zen ugođaj. Može rasti u vodi ili zemlji.', status: 'Zdravo', slika: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id: 11, naziv: 'Bosiljak', vrsta: 'Ocimum basilicum', opis: 'Aromatično bilje savršeno za kuhinju. Voli toplo i sunčano.', status: 'Zdravo', slika: 'https://images.unsplash.com/photo-1618375531912-867984bdfd87?w=400&q=80' },
  { id: 12, naziv: 'Kalanhoeja', vrsta: 'Kalanchoe blossfeldiana', opis: 'Sukulent s dugovječnim šarenim cvjetovima. Laka za uzgoj.', status: 'Zdravo', slika: 'https://images.unsplash.com/photo-1596438459194-f275f413d6ff?w=400&q=80' },
  { id: 13, naziv: 'Filodendron', vrsta: 'Philodendron hederaceum', opis: 'Tropska penjačica sa srcolikim listovima. Voli toplo i vlažno.', status: 'Zdravo', slika: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&q=80' },
  { id: 14, naziv: 'Zamiokulkas', vrsta: 'Zamioculcas zamiifolia', opis: 'Otporna biljka s tamnozelenim sjajnim listovima. Podnosi zanemarivanje.', status: 'Zdravo', slika: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400&q=80' },
  { id: 15, naziv: 'Begonija', vrsta: 'Begonia rex', opis: 'Dekorativna biljka s pisanim šarenim listovima. Voli indirektno svjetlo.', status: 'Pazi', slika: 'https://images.unsplash.com/photo-1599598425947-5202edd56fdb?w=400&q=80' },
  { id: 16, naziv: 'Juka', vrsta: 'Yucca elephantipes', opis: 'Impozantna biljka s uskim listovima na dugoj stabljici. Voli sunce.', status: 'Zdravo', slika: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80' },
  { id: 17, naziv: 'Dracena', vrsta: 'Dracaena marginata', opis: 'Elegantna biljka s uskim listovima s crvenim rubovima. Otporna i laka za njegu.', status: 'Zdravo', slika: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=400&q=80' },
  { id: 18, naziv: 'Mirna ljiljana', vrsta: 'Spathiphyllum wallisii', opis: 'Elegantna biljka s bijelim cvjetovima. Pročišćava zrak i voli sjenu.', status: 'Zdravo', slika: 'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=400&q=80' },
  { id: 19, naziv: 'Krotona', vrsta: 'Codiaeum variegatum', opis: 'Šarena tropska biljka s višebojnim listovima. Voli puno svjetla.', status: 'Pazi', slika: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80' },
  { id: 20, naziv: 'Afelandra', vrsta: 'Aphelandra squarrosa', opis: 'Egzotična biljka sa žutim cvjetovima i prugastim listovima. Voli toplinu.', status: 'Zdravo', slika: 'https://images.unsplash.com/photo-1587334207407-3c2f4f46af7b?w=400&q=80' },
]

const filtriraneBiljke = computed(() => {
  if (!pretraga.value.trim()) return katalog
  const q = pretraga.value.toLowerCase()
  return katalog.filter(b =>
    b.naziv.toLowerCase().includes(q) || b.vrsta.toLowerCase().includes(q)
  )
})

function jeVecDodana(id) {
  return store.mojeBiljke.some(b => b.id === id)
}

function dodaj(biljka) {
  store.dodajBiljku(biljka)
}
</script>

<template>
  <div class="plantastic-wrapper">
    <nav class="navbar">
      <RouterLink to="/" class="logo">Plantastic</RouterLink>
      <div class="nav-links">
        <RouterLink to="/" class="nav-link">Moje biljke</RouterLink>
        <RouterLink to="/evidencija" class="nav-link">Evidencija zalijevanja</RouterLink>
        <RouterLink to="/dodavanje" class="nav-link">Dodavanje</RouterLink>
      </div>
      <div class="nav-avatar">🌿</div>
    </nav>

    <main class="main-content">
      <div class="hero-text">
        <h1>Dodaj biljku</h1>
        <p>Pretraži katalog i dodaj biljke u svoju kolekciju.</p>
      </div>

      <div class="pretraga-wrapper">
        <input
          v-model="pretraga"
          type="text"
          placeholder="Pretraži po imenu ili vrsti..."
          class="pretraga-input"
        />
      </div>

      <p v-if="filtriraneBiljke.length === 0" class="nema-rezultata">
        Nema biljki za "{{ pretraga }}"
      </p>

      <div class="plant-grid">
        <div
          v-for="biljka in filtriraneBiljke"
          :key="biljka.id"
          class="plant-card"
          :class="{ 'dodana': jeVecDodana(biljka.id) }"
        >
          <div class="plant-image-wrapper">
            <img :src="biljka.slika" :alt="biljka.naziv" class="plant-image" />
          </div>
          <div class="plant-info">
            <h3 class="plant-naziv">{{ biljka.naziv }}</h3>
            <p class="plant-vrsta">{{ biljka.vrsta }}</p>
            <p class="plant-opis">{{ biljka.opis }}</p>
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
.plantastic-wrapper {
  min-height: 100vh;
  background: #faf8f5;
  font-family: sans-serif;
}

.navbar {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 0 32px;
  height: 56px;
  background: #fff;
  border-bottom: 1px solid #e8e0d8;
}

.logo {
  font-size: 18px;
  font-weight: 700;
  color: #2c2c2a;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 8px;
  flex: 1;
}

.nav-link {
  font-size: 14px;
  color: #888780;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background 0.15s, color 0.15s;
}

.nav-link:hover {
  background: #f5f0ea;
  color: #2c2c2a;
}

.router-link-active.nav-link {
  color: #2c2c2a;
  font-weight: 500;
}

.nav-avatar {
  font-size: 20px;
}

.main-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px;
}

.hero-text {
  margin-bottom: 24px;
}

.hero-text h1 {
  font-size: 26px;
  font-weight: 700;
  color: #2c2c2a;
  margin: 0 0 6px;
}

.hero-text p {
  font-size: 14px;
  color: #888780;
  margin: 0;
}

.pretraga-wrapper {
  margin-bottom: 28px;
}

.pretraga-input {
  width: 100%;
  max-width: 400px;
  padding: 10px 16px;
  border: 1px solid #e8e0d8;
  border-radius: 8px;
  font-size: 14px;
  background: #fff;
  color: #2c2c2a;
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
}

.pretraga-input:focus {
  border-color: #1e3a2f;
}

.nema-rezultata {
  font-size: 14px;
  color: #888780;
  margin-bottom: 24px;
}

.plant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.plant-card {
  background: #fff;
  border: 1px solid #e8e0d8;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.plant-card.dodana {
  opacity: 0.6;
}

.plant-image-wrapper {
  background: #f5f0ea;
  height: 160px;
  overflow: hidden;
}

.plant-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.plant-info {
  padding: 12px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.plant-naziv {
  font-size: 15px;
  font-weight: 600;
  color: #2c2c2a;
  margin: 0;
}

.plant-vrsta {
  font-size: 12px;
  color: #888780;
  margin: 0;
}

.plant-opis {
  font-size: 12px;
  color: #5f5e5a;
  margin: 4px 0 8px;
  line-height: 1.5;
}

.btn-dodaj {
  width: 100%;
  padding: 8px;
  background: #1e3a2f;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: auto;
}

.btn-dodaj:hover:not(:disabled) {
  background: #2a4f40;
}

.btn-dodana {
  background: #888780;
  cursor: default;
}
</style>