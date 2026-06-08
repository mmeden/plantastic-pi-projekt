<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBiljkeStore } from '@/stores/biljke'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useBiljkeStore()
const auth = useAuthStore()

const biljka = computed(() => store.mojeBiljke.find(b => b.id === Number(route.params.id)))
const status = computed(() => biljka.value ? store.getStatusZalijevanja(biljka.value) : null)
</script>

<template>
  <div class="plantastic-wrapper">
    <nav class="navbar">
      <RouterLink to="/" class="logo">Plantastic</RouterLink>
      <div class="nav-links">
        <RouterLink to="/" class="nav-link">Moje biljke</RouterLink>
        <RouterLink to="/evidencija" class="nav-link">Evidencija zalijevanja</RouterLink>
        <RouterLink to="/dodavanje" class="nav-link">Dodavanje</RouterLink>
        <RouterLink v-if="auth.jeAdmin" to="/admin" class="nav-link">Admin</RouterLink>
      </div>
      <div class="nav-desno">
        <span class="korisnik-ime">👤 {{ auth.korisnik?.ime }}</span>
        <button class="btn-odjava" @click="auth.odjava(); router.push('/login')">Odjava</button>
      </div>
    </nav>

    <main class="main-content" v-if="biljka">
      <button class="btn-nazad" @click="router.back()">← Natrag</button>

      <div class="top-section">
        <div class="slika-wrapper">
          <img :src="biljka.slika" :alt="biljka.naziv" class="biljka-slika" />
        </div>

        <div class="desna-strana">
          <div class="info-kartica">
            <h1 class="biljka-naziv">{{ biljka.naziv }}</h1>
            <p class="biljka-vrsta">{{ biljka.vrsta }}</p>
            <p class="biljka-opis">{{ biljka.opis }}</p>
          </div>

          <div class="status-kartica">
            <p class="status-label">Status zalijevanja</p>
            <span class="status-badge" :class="status.klasa">💧 {{ status.tekst }}</span>
          </div>
        </div>
      </div>
    </main>

    <main class="main-content" v-else>
      <p class="not-found">Biljka nije pronađena.</p>
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

.nav-link:hover { background: #f5f0ea; color: #2c2c2a; }
.router-link-active.nav-link { color: #2c2c2a; font-weight: 500; }

.nav-desno {
  display: flex;
  align-items: center;
  gap: 12px;
}

.korisnik-ime {
  font-size: 13px;
  color: #5f5e5a;
}

.btn-odjava {
  font-size: 13px;
  padding: 6px 12px;
  border: 1px solid #e8e0d8;
  border-radius: 6px;
  background: #fff;
  color: #2c2c2a;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-odjava:hover { background: #f5f0ea; }

.main-content {
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
  transition: color 0.15s;
}

.btn-nazad:hover { color: #2c2c2a; }

.top-section {
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

.biljka-slika {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.desna-strana {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-kartica {
  background: #f5f2ed;
  border-radius: 16px;
  padding: 36px 32px;
  flex: 1;
}

.biljka-naziv {
  font-size: 36px;
  font-weight: 400;
  color: #2c2c2a;
  margin: 0 0 6px;
  line-height: 1.2;
}

.biljka-vrsta {
  font-size: 14px;
  color: #888780;
  margin: 0 0 20px;
  font-style: italic;
}

.biljka-opis {
  font-size: 15px;
  color: #5f5e5a;
  line-height: 1.7;
  margin: 0;
}

.status-kartica {
  background: #f5f2ed;
  border-radius: 16px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-label {
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

.not-found {
  color: #888780;
  font-size: 16px;
}
</style>