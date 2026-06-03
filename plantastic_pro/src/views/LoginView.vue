<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const nacin = ref('prijava') // 'prijava' ili 'registracija'
const ime = ref('')
const email = ref('')
const lozinka = ref('')
const potvrdaLozinke = ref('')
const greska = ref('')
const ucitavanje = ref(false)

function validiraj() {
  if (!email.value || !lozinka.value) {
    greska.value = 'Molimo ispunite sva polja.'
    return false
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    greska.value = 'Unesite ispravnu email adresu.'
    return false
  }
  if (lozinka.value.length < 6) {
    greska.value = 'Lozinka mora imati najmanje 6 znakova.'
    return false
  }
  if (nacin.value === 'registracija') {
    if (!ime.value.trim()) {
      greska.value = 'Molimo unesite ime.'
      return false
    }
    if (lozinka.value !== potvrdaLozinke.value) {
      greska.value = 'Lozinke se ne podudaraju.'
      return false
    }
  }
  return true
}

async function submit() {
  greska.value = ''
  if (!validiraj()) return

  ucitavanje.value = true
  await new Promise(r => setTimeout(r, 400)) // fake delay

  let rezultat
  if (nacin.value === 'prijava') {
    rezultat = auth.prijava(email.value, lozinka.value)
  } else {
    rezultat = auth.registracija(ime.value, email.value, lozinka.value)
  }

  ucitavanje.value = false

  if (rezultat.uspjeh) {
    router.push('/')
  } else {
    greska.value = rezultat.greska
  }
}

function promijeniNacin(novi) {
  nacin.value = novi
  greska.value = ''
  ime.value = ''
  email.value = ''
  lozinka.value = ''
  potvrdaLozinke.value = ''
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="login-header">
        <h1 class="logo">Plantastic 🌿</h1>
        <p class="logo-opis">Brinite se o svojim biljkama na jednom mjestu.</p>
      </div>

      <div class="tab-switcher">
        <button
          class="tab"
          :class="{ active: nacin === 'prijava' }"
          @click="promijeniNacin('prijava')"
        >Prijava</button>
        <button
          class="tab"
          :class="{ active: nacin === 'registracija' }"
          @click="promijeniNacin('registracija')"
        >Registracija</button>
      </div>

      <div class="form">
        <div v-if="nacin === 'registracija'" class="form-group">
          <label class="label">Ime</label>
          <input
            v-model="ime"
            type="text"
            class="input"
            placeholder="Vaše ime"
            @keyup.enter="submit"
          />
        </div>

        <div class="form-group">
          <label class="label">Email</label>
          <input
            v-model="email"
            type="email"
            class="input"
            placeholder="email@primjer.com"
            @keyup.enter="submit"
          />
        </div>

        <div class="form-group">
          <label class="label">Lozinka</label>
          <input
            v-model="lozinka"
            type="password"
            class="input"
            placeholder="Najmanje 6 znakova"
            @keyup.enter="submit"
          />
        </div>

        <div v-if="nacin === 'registracija'" class="form-group">
          <label class="label">Potvrda lozinke</label>
          <input
            v-model="potvrdaLozinke"
            type="password"
            class="input"
            placeholder="Ponovite lozinku"
            @keyup.enter="submit"
          />
        </div>

        <p v-if="greska" class="greska">{{ greska }}</p>

        <button class="btn-submit" @click="submit" :disabled="ucitavanje">
          <span v-if="ucitavanje">⏳ Učitavanje...</span>
          <span v-else>{{ nacin === 'prijava' ? 'Prijavi se' : 'Registriraj se' }}</span>
        </button>

        <p class="hint" v-if="nacin === 'prijava'">
          Admin pristup: <strong>admin@plantastic.com</strong> / <strong>admin123</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  background: #faf8f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  padding: 24px;
}

.login-card {
  background: #fff;
  border: 1px solid #e8e0d8;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
}

.login-header {
  text-align: center;
  margin-bottom: 28px;
}

.logo {
  font-size: 28px;
  font-weight: 700;
  color: #2c2c2a;
  margin: 0 0 8px;
}

.logo-opis {
  font-size: 14px;
  color: #888780;
  margin: 0;
}

.tab-switcher {
  display: flex;
  background: #f5f0ea;
  border-radius: 10px;
  padding: 4px;
  margin-bottom: 28px;
}

.tab {
  flex: 1;
  padding: 8px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #888780;
  cursor: pointer;
  transition: all 0.2s;
}

.tab.active {
  background: #fff;
  color: #2c2c2a;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

.form {
  display: flex;
  flex-direction: column;
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
}

.input:focus {
  border-color: #1e3a2f;
}

.greska {
  background: #fee2e2;
  color: #dc2626;
  font-size: 13px;
  padding: 10px 14px;
  border-radius: 8px;
  margin: 0;
}

.btn-submit {
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
  margin-top: 4px;
}

.btn-submit:hover:not(:disabled) {
  background: #2a4f40;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: default;
}

.hint {
  font-size: 12px;
  color: #888780;
  text-align: center;
  margin: 0;
}
</style>