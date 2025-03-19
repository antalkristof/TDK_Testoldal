<script setup>
import { ref, onMounted } from 'vue';

const users = ref([]); // Felhasználók adatai

onMounted(() => {
  // Felhasználók betöltése a localStorage-ból
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Felhasználók megjelenítése
  users.value = storedUsers.map(user => ({
    name: user.username,
    time: user.totalTime || 0
  }));
});

// Idő formázása "perc:másodperc" formátumba
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} perc ${remainingSeconds} másodperc`;
};
</script>

<template>
  <div>
    <h1>Felhasználók és összesített idő</h1>
    <table border="1">
      <thead>
        <tr>
          <th>Név</th>
          <th>Idő</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.name">
          <td>{{ user.name }}</td>
          <td>{{ formatTime(user.time) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>