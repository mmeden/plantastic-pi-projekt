<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useBiljkeStore } from '@/stores/biljke'
import NavBar from '@/components/NavBar.vue'

const router = useRouter()
const auth = useAuthStore()
const store = useBiljkeStore()

if (!auth.jeAdmin) {
  router.push('/')
}

const naziv = ref('')
const vrsta = ref('')
const opis = ref('')
const slika = ref('')
const greska = ref('')
const uspjeh = ref('')
const intervalOptions = [3, 5, 7, 10, 14, 21]
const intervalZalijevanja = ref(7)
const uredivanje = ref(null)

const katalogSortiran = computed(() => {
  return [...store.katalog].sort((a, b) => a.naziv.localeCompare(b.naziv))
})

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

function otvoriUredivanje(b) {
  uredivanje.value = { ...b }
}

function spremiUredivanje() {
  if (!uredivanje.value) return
  const idx = store.katalog.findIndex(b => b.id === uredivanje.value.id)
  if (idx !== -1) store.katalog[idx] = { ...uredivanje.value }
  uredivanje.value = null
}
</script>

<template>
  <div class="stranica">
    <NavBar />

    <main class="sadrzaj">
      <div class="zaglavlje">
        <h1>Admin panel</h1>
        <p>Dodaj ili obriši vrste biljaka iz kataloga.</p>
      </div>

      <div class="forma-kartica">
        <h2>Nova vrsta biljke</h2>

        <div class="forma">
          <div class="red">
            <div class="grupa">
              <label>Naziv biljke *</label>
              <input v-model="naziv" type="text" class="input" placeholder="npr. Monstera" />
            </div>
            <div class="grupa">
              <label>Latinska vrsta *</label>
              <input v-model="vrsta" type="text" class="input" placeholder="npr. Monstera deliciosa" />
            </div>
          </div>

          <div class="grupa">
            <label>Opis *</label>
            <textarea v-model="opis" class="input" placeholder="Kratki opis biljke..." rows="3"></textarea>
          </div>

          <div class="red">
            <div class="grupa">
              <label>URL slike *</label>
              <input v-model="slika" type="text" class="input" placeholder="https://..." />
            </div>
            <div class="grupa">
              <label>Interval zalijevanja *</label>
              <select v-model="intervalZalijevanja" class="input">
                <option v-for="opt in intervalOptions" :key="opt" :value="opt">Svakih {{ opt }} dana</option>
              </select>
            </div>
          </div>

          <div v-if="slika" class="pregled">
            <p>Pregled slike:</p>
            <img :src="slika" class="pregled-slika" />
          </div>

          <p v-if="greska" class="greska">{{ greska }}</p>
          <p v-if="uspjeh" class="uspjeh">✓ {{ uspjeh }}</p>

          <button class="btn-dodaj" @click="dodajVrstu">+ Dodaj u katalog</button>
        </div>
      </div>

      <div class="katalog-dio">
        <h2>Trenutni katalog ({{ store.katalog.length }} vrsta)</h2>
        <div class="lista">
          <div v-for="b in katalogSortiran" :key="b.id" class="unos">
            <img :src="b.slika" :alt="b.naziv" class="unos-slika" />
            <div class="unos-info">
              <p class="unos-naziv">{{ b.naziv }}</p>
              <p class="unos-vrsta">{{ b.vrsta }}</p>
            </div>
            <span class="unos-interval">💧 {{ b.intervalZalijevanja ?? 7 }}d</span>
            <button class="btn-uredi" @click="otvoriUredivanje(b)">Uredi</button>
            <button class="btn-brisi" @click="store.obrisiIzKataloga(b.id)">Obriši</button>
          </div>
        </div>
      </div>
    </main>

    <div v-if="uredivanje" class="modal-overlay" @click.self="uredivanje = null">
      <div class="modal">
        <h2>Uredi biljku</h2>
        <div class="forma">
          <div class="grupa">
            <label>Naziv</label>
            <input v-model="uredivanje.naziv" class="input" />
          </div>
          <div class="grupa">
            <label>Latinska vrsta</label>
            <input v-model="uredivanje.vrsta" class="input" />
          </div>
          <div class="grupa">
            <label>Opis</label>
            <textarea v-model="uredivanje.opis" class="input" rows="3"></textarea>
          </div>
          <div class="grupa">
            <label>URL slike</label>
            <input v-model="uredivanje.slika" class="input" />
          </div>
          <div class="grupa">
            <label>Interval zalijevanja</label>
            <select v-model="uredivanje.intervalZalijevanja" class="input">
              <option v-for="opt in intervalOptions" :key="opt" :value="opt">Svakih {{ opt }} dana</option>
            </select>
          </div>
          <button class="btn-dodaj" @click="spremiUredivanje">Spremi</button>
          <button class="btn-odustani" @click="uredivanje = null">Odustani</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.zaglavlje {
  margin-bottom: 28px;
}

.zaglavlje h1 {
  font-size: 26px;
  font-weight: 700;
  color: #2c2c2a;
  margin: 0 0 6px;
}

.zaglavlje p {
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

.forma-kartica h2 {
  font-size: 17px;
  font-weight: 600;
  color: #2c2c2a;
  margin: 0 0 24px;
}

.forma {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.red {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.grupa {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.grupa label {
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
  font-family: sans-serif;
  resize: vertical;
}

.input:focus { border-color: #1e3a2f; }

.pregled p {
  font-size: 12px;
  color: #888780;
  margin: 0 0 8px;
}

.pregled-slika {
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e8e0d8;
}

.btn-dodaj {
  width: 100%;
  padding: 12px;
  background: #1e3a2f;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
}

.btn-dodaj:hover { background: #2a4f40; }

.btn-odustani {
  width: 100%;
  padding: 12px;
  background: #fff;
  color: #2c2c2a;
  border: 1px solid #e8e0d8;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
  margin-top: 8px;
}

.btn-odustani:hover { background: #f5f0ea; }

.katalog-dio h2 {
  font-size: 17px;
  font-weight: 600;
  color: #2c2c2a;
  margin: 0 0 16px;
}

.lista {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.unos {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border: 1px solid #e8e0d8;
  border-radius: 10px;
  padding: 12px 16px;
}

.unos-slika {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.unos-info { flex: 1; }

.unos-naziv {
  font-size: 14px;
  font-weight: 600;
  color: #2c2c2a;
  margin: 0 0 2px;
}

.unos-vrsta {
  font-size: 12px;
  color: #888780;
  margin: 0;
}

.unos-interval {
  font-size: 12px;
  color: #5f5e5a;
  background: #f5f0ea;
  padding: 4px 10px;
  border-radius: 20px;
}

.btn-uredi {
  font-size: 12px;
  padding: 6px 12px;
  background: #e6f1fb;
  color: #185fa5;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  cursor: pointer;
}

.btn-uredi:hover { background: #bfdbfe; }

.btn-brisi {
  font-size: 12px;
  padding: 6px 12px;
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fca5a5;
  border-radius: 6px;
  cursor: pointer;
}

.btn-brisi:hover { background: #fecaca; }

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal h2 {
  font-size: 17px;
  font-weight: 600;
  color: #2c2c2a;
  margin: 0;
}
</style>