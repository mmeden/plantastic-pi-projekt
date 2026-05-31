

<script setup>
import PlantSlikice from '@/components/PlantSlikice.vue'
import { useBiljkeStore } from '@/stores/biljke'

    naziv: 'Monstera',
    vrsta: 'Monstera deliciosa',
    status: 'Zdravo',
    slika: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80'
  },
  {
    id: 4,
  }
]
const store = useBiljkeStore()
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
        <h1>Dobrodošli u Plantastic!</h1>
        <p>Brinite se o svojim biljkama na jednom mjestu.</p>
      </div>

      <section class="section">
        <h2 class="section-title">Moje Biljke</h2>

        <div v-if="store.mojeBiljke.length === 0" class="prazno">
          <p>Još nemaš dodanih biljki.</p>
          <RouterLink to="/dodavanje" class="btn-dodaj-link">+ Dodaj prvu biljku</RouterLink>
        </div>

        <div class="plant-grid" v-else>
          <div
            v-for="plant in store.mojeBiljke"
            :key="plant.id"
            class="card-wrapper"
          >
            <button class="btn-ukloni" @click="store.ukloniBiljku(plant.id)" title="Ukloni biljku">✕</button>
            <RouterLink
              :to="`/evidencija/${plant.id}`"
              style="text-decoration:none;"
            >
              <PlantSlikice :plant="plant" />
            </RouterLink>
          </div>
        </div>
      </section>
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
  letter-spacing: -0.3px;
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
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 24px;
}

.hero-text {
  margin-bottom: 36px;
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

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #2c2c2a;
  margin: 0 0 20px;
}

.plant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}
</style>