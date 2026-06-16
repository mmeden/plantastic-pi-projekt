<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBiljkeStore } from '@/stores/biljke'
import NavBar from '@/components/NavBar.vue'


const route = useRoute()
const router = useRouter()
const store = useBiljkeStore()

const biljka = computed(() => store.mojeBiljke.find(b => b.id === Number(route.params.id)))
const povijest = computed(() => store.getPovijest(Number(route.params.id)))
const status = computed(() => biljka.value ? store.getStatusZalijevanja(biljka.value) : null)

const mozeSEvidentirat = computed(() => {
  const dani = biljka.value ? store.getDaniDoZalijevanja(biljka.value) : null
  if (dani === null) return true
  return dani <= 0
})

function evidentirajZalijevanje() {
  if (!mozeSEvidentirat.value) return
  store.evidentirajZalijevanje(Number(route.params.id))
}
</script>

<template>
  <div class="stranica">
    <NavBar />

    <main class="sadrzaj" v-if="biljka">
        <button class="btn-nazad" @click="router.back()">← Natrag</button>
      <h2 class="naslov-stranice">EVIDENCIJA ZALIJEVANJA</h2>

      <div class="layout">
        <div class="slika-wrapper">
          <img :src="biljka.slika" :alt="biljka.naziv" class="slika" />
        </div>

        <div class="desno">
          

          <div class="gumb-box">
            <div class="status-red">
              <span class="status-badge" :class="status.klasa">💧 {{ status.tekst }}</span>
            </div>
            <button
              class="btn-zalij"
              @click="evidentirajZalijevanje"
              :disabled="!mozeSEvidentirat"
              :class="{ 'btn-disabled': !mozeSEvidentirat }"
            >
              {{ mozeSEvidentirat ? 'Evidentiraj zalijevanje' : 'Još nije vrijeme za zalijevanje' }}
            </button>
          </div>
        </div>
      </div>

      <section class="povijest">
        <h2>Povijest zalijevanja</h2>

        <p v-if="povijest.length === 0" class="prazno">Još nema zabilježenih zalijevanja.</p>

        <div v-for="(unos, index) in povijest" :key="index" class="unos">
          <div class="unos-ikona">💧</div>
          <div>
            <p class="unos-tekst">Zalijevanje obavljeno</p>
            <p class="unos-datum">{{ unos.datum }}</p>
          </div>
        </div>
      </section>
    </main>

    <main class="sadrzaj" v-else>
      <p>Biljka nije pronađena.</p>
    </main>
  </div>
</template>

<style scoped>
.naslov-stranice {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1.5px;
  color: #888780;
  margin: 0 0 28px;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 24px;
  margin-bottom: 48px;
  align-items: start;
}

.slika-wrapper {
  border-radius: 16px;
  overflow: hidden;
  background: #f0ebe3;
  height: 300px;
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

.gumb-box {
  background: #f5f2ed;
  border-radius: 16px;
  padding: 20px 24px;
  height: fit-content;
}

.status-red {
  margin-bottom: 12px;
}

.btn-zalij {
  width: 100%;
  padding: 18px;
  background: #1e3a2f;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
}

.btn-zalij:hover:not(:disabled) { background: #2a4f40; }

.btn-disabled {
  background: #888780 !important;
  cursor: not-allowed;
}

.povijest {
  max-width: 700px;
}

.povijest h2 {
  font-size: 22px;
  font-weight: 600;
  color: #2c2c2a;
  margin: 0 0 20px;
}

.unos {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #f5f2ed;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 10px;
}

.unos-ikona {
  font-size: 22px;
  background: #d4e8d8;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.unos-tekst {
  font-size: 14px;
  font-weight: 600;
  color: #2c2c2a;
  margin: 0 0 2px;
}

.unos-datum {
  font-size: 13px;
  color: #888780;
  margin: 0;
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

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 500;
}
</style>