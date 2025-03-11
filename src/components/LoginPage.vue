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
  router.push('/socialmedia');
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

const handleRegister = () => {
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert('A jelszavak nem egyeznek');
    return;
  }

  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  if (storedUsers.some(user => user.username === username)) {
    alert('A felhasználónév már létezik');
    return;
  }

  const user = {
    username,
    email,
    password
  };
  

  storedUsers.push(user);
  localStorage.setItem('users', JSON.stringify(storedUsers));
  alert('Sikeres regisztráció');
  toggleForm();
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
            <button @click="toggleForm" class="toggle-button">Regisztráció</button>
          </div>
        </form>
      </div>
      <div v-else class="login-box" >
        <form @submit.prevent="handleRegister">
          <div class="input-container">
            <input type="text" id="register-username" placeholder="Felhasználónév">
          </div>
          <div class="input-container">
            <input type="email" id="register-email" placeholder="Email">
          </div>
          <div class="input-container">
            <input type="password" id="register-password" placeholder="Jelszó">
          </div>
          <div class="input-container">
            <input type="password" id="confirm-password" placeholder="Jelszó megerősítése">
          </div>
          <div class="button-container">
            <button type="submit" class="login-button">Regisztráció</button>
            <button @click="toggleForm" class="toggle-button">Bejelentkezés</button>
          </div>
        </form>
      </div>
    </div>
  </body>
</template>

<style scoped>
body {
  background: linear-gradient(to bottom, #40E0D0, #00008B);
  height: 100vh;
  position: absolute !important;
  left: 0 !important;
  padding: 0;
  z-index: 1000;
  margin: 0;
  color: black;
  overflow: hidden;
  width: 100%;  
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
  justify-content: center;
  padding: 20px;
  position: relative;
  height: 90vh;
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
  gap: 1rem;
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
