<script setup>
import { ref, watch, nextTick, onMounted } from 'vue';
import Header from '../components/Header.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const navigateToLogin = () => {
  router.push('/');
};
const navigateToHome = () => {
  router.push('/home');
};

const cards = ref([
  { name: 'John Doe', initial: 'J', date: '2023-10-01', distance: '5 km' },
  { name: 'Jane Smith', initial: 'J', date: '2023-10-02', distance: '10 km' },
  { name: 'Alice Johnson', initial: 'A', date: '2023-10-03', distance: '7 km' }
]);
</script>

<template>
  <div class="main-div">
    <header id="header">
      <Header :showLogOut="true" :navigateToLogin="navigateToLogin" :isSocial="true" :navigateToHome="navigateToHome"/>
    </header>
    <div class="cards-container">
      <div v-for="card in cards" :key="card.name" class="card">
        <div class="card-header">
          <div class="initial">{{ card.initial }}</div>
          <div class="name">{{ card.name }}</div>
        </div>
        <div class="card-body">
          <div class="date">{{ card.date }}</div>
          <div class="distance">{{ card.distance }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-div {
  height: 100vh;
  position: absolute !important;
  left: 0 !important;
  padding: 0;
  z-index: 1000;
  margin: 0;
  background: #f0f0f0;
  color: black;
  overflow: auto;
  width: 100%;
}

.main-div::-webkit-scrollbar {
  display: none;
}

.dark-mode .main-div {
  background: #202528;
  color: white;
}

header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: white;
}

.dark-mode header {
  background: black;
}

.cards-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  padding: 20px;
  width: 700px;
  transition: transform 0.3s;
  user-select: none;
  cursor: pointer;
}

.dark-mode .card {
  background: #202528;
  color: white;
  box-shadow: #dd9c44 0px 0px 10px;
}

.card:hover {
  transform: scale(1.1);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.initial {
  background: #007bff;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  margin-right: 10px;
  font-size: 20px;
}

.name {
  font-size: 18px;
  font-weight: bold;
}

.card-body {
  display: flex;
  justify-content: space-between;
}

.date, .distance {
  font-size: 14px;
}
</style>