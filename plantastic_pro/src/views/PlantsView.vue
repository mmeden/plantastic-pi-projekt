<script setup>
import PlantSlikice from '@/components/PlantSlikice.vue'
import NavBar from '@/components/NavBar.vue'
import { useBiljkeStore } from '@/stores/biljke'

const store = useBiljkeStore()
</script>

<template>
  <div class="stranica">
    <NavBar />

    <main class="sadrzaj">
      <div class="uvod">
        <h1>Dobrodošli u Plantastic!</h1>
        <p>Brinite se o svojim biljkama na jednom mjestu.</p>
      </div>

      <section>
        <h2 class="naslov-sekcije">Moje Biljke</h2>

        <div v-if="store.mojeBiljke.length === 0" class="prazno">
          <p>Još nemaš dodanih biljki.</p>
          <RouterLink to="/dodavanje" class="btn-dodaj">+ Dodaj prvu biljku</RouterLink>
        </div>

        <div class="grid" v-else>
          <div v-for="biljka in [...store.mojeBiljke].sort((a, b) => a.naziv.localeCompare(b.naziv))" :key="biljka.id" class="kartica-wrapper">
            <button class="btn-ukloni" @click="store.ukloniBiljku(biljka.id)">✕</button>
            <RouterLink :to="`/biljka/${biljka.id}`" style="text-decoration:none;">
              <PlantSlikice :plant="biljka" />
            </RouterLink>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.uvod {
  margin-bottom: 36px;
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

.naslov-sekcije {
  font-size: 16px;
  font-weight: 600;
  color: #2c2c2a;
  margin: 0 0 20px;
}

.kartica-wrapper {
  position: relative;
}

.btn-ukloni {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  background: #fff;
  border: 1px solid #e8e0d8;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 12px;
  cursor: pointer;
  color: #888780;
}

.btn-ukloni:hover {
  background: #fee2e2;
  color: #dc2626;
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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}
</style>