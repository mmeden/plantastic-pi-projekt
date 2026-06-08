<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/" class="logo">Plantastic</RouterLink>
    <div class="nav-links" v-if="!auth.jeAdmin">
      <RouterLink to="/" class="nav-link">Moje biljke</RouterLink>
      <RouterLink to="/evidencija" class="nav-link">Evidencija zalijevanja</RouterLink>
      <RouterLink to="/dodavanje" class="nav-link">Dodavanje</RouterLink>
    </div>
    <div class="nav-links" v-else>
      <RouterLink to="/admin" class="nav-link">Admin panel</RouterLink>
    </div>
    <div class="nav-desno">
      <span v-if="auth.jeAdmin" class="admin-badge">👑 Admin</span>
      <span class="korisnik-ime">👤 {{ auth.korisnik?.ime }}</span>
      <button class="btn-odjava" @click="auth.odjava(); router.push('/login')">Odjava</button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 0 32px;
  height: 56px;
  background: #fff;
  border-bottom: 1px solid #e8e0d8;
  font-family: sans-serif;
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

.nav-link:hover { background: #f5f0ea; color: #2c2c2a; }
.router-link-active.nav-link { color: #2c2c2a; font-weight: 500; }

.nav-desno {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-badge {
  font-size: 12px;
  background: #1e3a2f;
  color: #fff;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 500;
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
</style>