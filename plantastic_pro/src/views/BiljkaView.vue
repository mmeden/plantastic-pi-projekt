<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBiljkeStore } from '@/stores/biljke'
import NavBar from '@/components/NavBar.vue'

const route = useRoute()
const router = useRouter()
const store = useBiljkeStore()

const biljka = computed(() => store.mojeBiljke.find(b => b.id === Number(route.params.id)))
const status = computed(() => biljka.value ? store.getStatusZalijevanja(biljka.value) : null)
</script>

<template>
  <div class="stranica">
    <NavBar />

    <main class="sadrzaj" v-if="biljka">
      <button class="btn-nazad" @click="router.back()">← Natrag</button>

      <div class="layout">
        <div class="slika-wrapper">
          <img :src="biljka.slika" :alt="biljka.naziv" class="slika" />
        </div>

        <div class="desno">
          <div class="info">
            <h1>{{ biljka.naziv }}</h1>
            <p class="vrsta">{{ biljka.vrsta }}</p>
            <p class="opis">{{ biljka.opis }}</p>
          </div>

          <div class="status-box">
            <p>Status zalijevanja</p>
            <span class="status-badge" :class="status.klasa">💧 {{ status.tekst }}</span>
          </div>
        </div>
      </div>
    </main>

    <main class="sadrzaj" v-else>
      <p>Biljka nije pronađena.</p>
    </main>
  </div>
</template>

<style scoped>
.stranica {
  min-height: 100vh;
  background: #faf8f5;
  font-family: sans-serif;
}

.sadrzaj {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px;
}

.btn-nazad {
  background: none;
  border: none;
  font-size: 14px;
  color: #888780;
  cursor: pointer;
  padding: 0;
  margin-bottom: 24px;
}

.btn-nazad:hover { color: #2c2c2a; }

.layout {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 24px;
}

.slika-wrapper {
  border-radius: 16px;
  overflow: hidden;
  background: #f0ebe3;
  min-height: 420px;
}

.slika {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.desno {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info {
  background: #f5f2ed;
  border-radius: 16px;
  padding: 36px 32px;
  flex: 1;
}

.info h1 {
  font-size: 36px;
  font-weight: 400;
  color: #2c2c2a;
  margin: 0 0 6px;
}

.vrsta {
  font-size: 14px;
  color: #888780;
  margin: 0 0 20px;
  font-style: italic;
}

.opis {
  font-size: 15px;
  color: #5f5e5a;
  line-height: 1.7;
  margin: 0;
}

.status-box {
  background: #f5f2ed;
  border-radius: 16px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-box p {
  font-size: 14px;
  font-weight: 500;
  color: #2c2c2a;
  margin: 0;
}

.status-badge {
  font-size: 13px;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 500;
}

.status-zdravo { background: #eaf3de; color: #3b6d11; }
.status-uskoro { background: #fef9c3; color: #854d0e; }
.status-danas { background: #faeeda; color: #854f0b; }
.status-kasni { background: #fee2e2; color: #dc2626; }
.status-pazi { background: #f3f4f6; color: #6b7280; }
</style>