<script setup>
import { useBiljkeStore } from '@/stores/biljke'
import NavBar from '@/components/NavBar.vue'

const store = useBiljkeStore()
</script>

<template>
  <div class="stranica">
    <NavBar />

    <main class="sadrzaj">
      
      <h1 class="naslov">Evidencija zalijevanja</h1>
      <p class="podnaslov">Odaberi biljku za koju želiš evidentirati zalijevanje.</p>

      <div v-if="store.mojeBiljke.length === 0" class="prazno">
        <p>Još nemaš dodanih biljki.</p>
        <RouterLink to="/dodavanje" class="btn-dodaj">+ Dodaj prvu biljku</RouterLink>
      </div>

      <div class="grid" v-else>
        <RouterLink v-for="biljka in [...store.mojeBiljke].sort((a, b) => a.naziv.localeCompare(b.naziv))" :key="biljka.id" :to="`/evidencija/${biljka.id}`" class="kartica" >
          <div class="slika-wrapper">
            <img :src="biljka.slika" :alt="biljka.naziv" class="slika" />
          </div>
          <div class="info">
            <h3>{{ biljka.naziv }}</h3>
            <p class="vrsta">{{ biljka.vrsta }}</p>
            <span class="status-badge" :class="store.getStatusZalijevanja(biljka).klasa">
              💧 {{ store.getStatusZalijevanja(biljka).tekst }}
            </span>
          </div>
        </RouterLink>
      </div>
    </main>
  </div>
</template>

<style scoped>
.naslov {
  font-size: 26px;
  font-weight: 700;
  color: #2c2c2a;
  margin: 0 0 6px;
}

.podnaslov {
  font-size: 14px;
  color: #888780;
  margin: 0 0 32px;
}

.prazno p {
  margin: 0 0 16px;
}

.btn-dodaj {
  background: #1e3a2f;
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
}

.kartica {
  background: #fff;
  border: 1px solid #e8e0d8;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  display: block;
}

.kartica:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
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
}

.info h3 {
  font-size: 15px;
  font-weight: 600;
  color: #2c2c2a;
  margin: 0 0 2px;
}

.vrsta {
  font-size: 12px;
  color: #888780;
  margin: 0 0 10px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 500;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}


</style>