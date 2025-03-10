<script setup>
import { ref } from 'vue';
import Header from '../components/Header.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const showLogin = ref(true);

const toggleForm = () => {
  showLogin.value = !showLogin.value;
};

const navigateToHomePage = () => {
  router.push('/home');
};

const handleLogin = () => {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const user = storedUsers.find(user => user.username === username && user.password === password);

  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    navigateToHomePage();
  } else {
    alert('Hibás felhasználónév vagy jelszó');
  }
};
</script>

<template>
  <body>
    <header class="sticky-header">
      <Header />
    </header>
    <div class="container">
      <!-- <h1 class="title">FUSS AZ EGÉSZSÉGÉRT!</h1> -->
      <div v-if="showLogin" class="login-box">
        <form @submit.prevent="handleLogin">
          <div class="input-container">
            <input type="text" id="login-username" placeholder="Felhasználónév">
          </div>
          <div class="input-container">
            <input type="password" id="login-password" placeholder="Jelszó">
          </div>
          <div class="button-container">
            <button type="submit" class="login-button">Belépés</button>
          </div>
        </form>
        <div class="button-container">
          <button @click="toggleForm" class="toggle-button">Regisztráció</button>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
body {
  height: 100vh;
  margin: 0;
  background: linear-gradient(to bottom, #40E0D0, #00008B);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(to bottom, orange, yellow);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 20px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-box {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.input-container input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login-button, .toggle-button {
  background-color: #00008B;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}
</style>
