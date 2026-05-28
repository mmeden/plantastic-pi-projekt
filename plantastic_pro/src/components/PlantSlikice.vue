

<script setup>
import { computed } from 'vue'

const props = defineProps({
  plant: {
    type: Object,
    required: true
  }
})

const statusKlasa = computed(() => {
  const s = props.plant.status?.toLowerCase()
  if (s === 'zdravo') return 'status-zdravo'
  if (s === 'zalijevanje') return 'status-zalijevanje'
  return 'status-pazi'
})
</script>

<template>
  <div class="plant-card">
    <div class="plant-image-wrapper">
      <img :src="plant.slika" :alt="plant.naziv" class="plant-image" />
    </div>
    <div class="plant-info">
      <h3 class="plant-naziv">{{ plant.naziv }}</h3>
      <p class="plant-vrsta">{{ plant.vrsta }}</p>
      <span class="plant-status" :class="statusKlasa">
        {{ plant.status }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.plant-card {
  background: #fff;
  border: 1px solid #e8e0d8;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.2s;
  cursor: pointer;
}
.plant-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
.plant-image-wrapper {
  background: #f5f0ea;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  overflow: hidden;
}
.plant-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.plant-info {
  padding: 12px 16px 16px;
}
.plant-naziv {
  font-size: 15px;
  font-weight: 600;
  color: #2c2c2a;
  margin: 0 0 2px;
}
.plant-vrsta {
  font-size: 12px;
  color: #888780;
  margin: 0 0 10px;
}
.plant-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 500;
}
.status-zdravo {
  background: #eaf3de;
  color: #3b6d11;
}
.status-zalijevanje {
  background: #e6f1fb;
  color: #185fa5;
}
.status-pazi {
  background: #faeeda;
  color: #854f0b;
}
</style>