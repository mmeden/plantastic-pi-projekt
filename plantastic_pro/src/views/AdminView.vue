<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useBiljkeStore } from '@/stores/biljke'

const router = useRouter()
const auth = useAuthStore()
const store = useBiljkeStore()

// Redirect ako nije admin
if (!auth.jeAdmin) {
  router.push('/')
}

const naziv = ref('')
const vrsta = ref('')
const opis = ref('')
const slika = ref('')
const greska = ref('')
const uspjeh = ref('')

const intervalOptions = [2, 3, 5, 7, 10, 14, 21]
const intervalZalijevanja = ref(7)

function validiraj() {
  if (!naziv.value.trim()) { greska.value = 'Unesite naziv biljke.'; return false }
  if (!vrsta.value.trim()) { greska.value = 'Unesite latinsku vrstu.'; return false }
  if (!opis.value.trim()) { greska.value = 'Unesite opis biljke.'; return false }
  if (!slika.value.trim()) { greska.value = 'Unesite URL slike.'; return false }
  try { new URL(slika.value) } catch { greska.value = 'Unesite ispravan URL slike.'; return false }
  return true
}

function dodajVrstu() {
  greska.value = ''
  uspjeh.value = ''
  if (!validiraj()) return

  const novaBiljka = {
    id: Date.now(),
    naziv: naziv.value.trim(),
    vrsta: vrsta.value.trim(),
    opis: opis.value.trim(),
    slika: slika.value.trim(),
    status: 'Zdravo',
    intervalZalijevanja: intervalZalijevanja.value
  }

  store.dodajUKatalog(novaBiljka)

  uspjeh.value = `"${novaBiljka.naziv}" uspješno dodana u katalog!`
  naziv.value = ''
  vrsta.value = ''
  opis.value = ''
  slika.value = ''
  intervalZalijevanja.value = 7
}
</script>

<template>
  <div class="plantastic-wrapper">
    <nav class="navbar">
  <RouterLink to="/admin" class="logo">Plantastic</RouterLink>
  <div class="nav-links">
    <RouterLink to="/admin" class="nav-link">Admin panel</RouterLink>
  </div>
  <div class="nav-desno">
    <span class="admin-badge">👑 Admin</span>
    <span class="korisnik-ime">{{ auth.korisnik?.ime }}</span>
    <button class="btn-odjava" @click="auth.odjava(); router.push('/login')">Odjava</button>
  </div>
</nav>

    <main class="main-content">
      <div class="admin-header">
        <h1 class="naslov">Admin panel</h1>
        <p class="podnaslov">Dodaj novu vrstu biljke u katalog.</p>
      </div>

      <div class="forma-kartica">
        <h2 class="forma-naslov">Nova vrsta biljke</h2>

        <div class="form">
          <div class="form-row">
            <div class="form-group">
              <label class="label">Naziv biljke *</label>
              <input v-model="naziv" type="text" class="input" placeholder="npr. Monstera" />
            </div>
            <div class="form-group">
              <label class="label">Latinska vrsta *</label>
              <input v-model="vrsta" type="text" class="input" placeholder="npr. Monstera deliciosa" />
            </div>
          </div>

          <div class="form-group">
            <label class="label">Opis *</label>
            <textarea v-model="opis" class="input textarea" placeholder="Kratki opis biljke..." rows="3"></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="label">URL slike *</label>
              <input v-model="slika" type="text" class="input" placeholder="https://..." />
            </div>
            <div class="form-group">
              <label class="label">Interval zalijevanja (dani) *</label>
              <select v-model="intervalZalijevanja" class="input">
                <option v-for="opt in intervalOptions" :key="opt" :value="opt">Svakih {{ opt }} dana</option>
              </select>
            </div>
          </div>

          <div v-if="slika" class="preview">
            <p class="preview-label">Pregled slike:</p>
            <img :src="slika" class="preview-slika" @error="greska = 'Slika nije dostupna na tom URL-u.'" />
          </div>

          <p v-if="greska" class="greska">{{ greska }}</p>
          <p v-if="uspjeh" class="uspjeh">✓ {{ uspjeh }}</p>

          <button class="btn-dodaj" @click="dodajVrstu">+ Dodaj u katalog</button>
        </div>
      </div>

      <div class="katalog-section" v-if="store.katalog.length > 0">
        <h2 class="forma-naslov">Trenutni katalog ({{ store.katalog.length }} vrsta)</h2>
        <div class="katalog-lista">
          <div v-for="b in store.katalog" :key="b.id" class="katalog-unos">
            <img :src="b.slika" :alt="b.naziv" class="katalog-slika" />
            <div class="katalog-info">
              <p class="katalog-naziv">{{ b.naziv }}</p>
              <p class="katalog-vrsta">{{ b.vrsta }}</p>
            </div>
            <span class="katalog-interval">💧 {{ b.intervalZalijevanja ?? 7 }}d</span>
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
  gap: 24px;
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
  max-width: 860px;
  margin: 0 auto;
  padding: 40px 24px;
}

.admin-header {
  margin-bottom: 28px;
}

.naslov {
  font-size: 26px;
  font-weight: 700;
  color: #2c2c2a;
  margin: 0 0 6px;
}

.podnaslov {
  font-size: 14px;
  color: #888780;
  margin: 0;
}

.forma-kartica {
  background: #fff;
  border: 1px solid #e8e0d8;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
}

.forma-naslov {
  font-size: 17px;
  font-weight: 600;
  color: #2c2c2a;
  margin: 0 0 24px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label {
  font-size: 13px;
  font-weight: 500;
  color: #2c2c2a;
}

.input {
  padding: 10px 14px;
  border: 1px solid #e8e0d8;
  border-radius: 8px;
  font-size: 14px;
  color: #2c2c2a;
  background: #fff;
  outline: none;
  transition: border-color 0.15s;
  font-family: sans-serif;
}

.input:focus { border-color: #1e3a2f; }

.textarea { resize: vertical; min-height: 80px; }

.preview { margin-top: 4px; }

.preview-label {
  font-size: 12px;
  color: #888780;
  margin: 0 0 8px;
}

.preview-slika {
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e8e0d8;
}

.greska {
  background: #fee2e2;
  color: #dc2626;
  font-size: 13px;
  padding: 10px 14px;
  border-radius: 8px;
  margin: 0;
}

.uspjeh {
  background: #eaf3de;
  color: #3b6d11;
  font-size: 13px;
  padding: 10px 14px;
  border-radius: 8px;
  margin: 0;
}

.btn-dodaj {
  width: 100%;
  padding: 12px;
  background: #1e3a2f;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-dodaj:hover { background: #2a4f40; }

.katalog-section { margin-top: 8px; }

.katalog-lista {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
}

.katalog-unos {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border: 1px solid #e8e0d8;
  border-radius: 10px;
  padding: 12px 16px;
}

.katalog-slika {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.katalog-info { flex: 1; }

.katalog-naziv {
  font-size: 14px;
  font-weight: 600;
  color: #2c2c2a;
  margin: 0 0 2px;
}

.katalog-vrsta {
  font-size: 12px;
  color: #888780;
  margin: 0;
}

.katalog-interval {
  font-size: 12px;
  color: #5f5e5a;
  background: #f5f0ea;
  padding: 4px 10px;
  border-radius: 20px;
}
.admin-badge {
  font-size: 12px;
  background: #1e3a2f;
  color: #fff;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 500;
}
</style>