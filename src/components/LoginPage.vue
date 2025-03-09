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
      <div class="spinner-container">
        <div class="circle circle1"></div>
        <div class="circle circle2"></div>
        <div class="circle circle3"></div>
      </div>
      <div>
        <div class="bird-container bird-container-one">
          <div class="bird bird-one"></div>
        </div>
        <div class="bird-container bird-container-two">
          <div class="bird bird-two"></div>
        </div>
        <div class="bird-container bird-container-three">
          <div class="bird bird-three"></div>
        </div>
        <div class="bird-container bird-container-four">
          <div class="bird bird-four"></div>
        </div>
      </div>
      <div>
        <div class="stars"></div>
        <div class="shooting-star"></div>
        <div class="shooting-star"></div>
        <div class="shooting-star"></div>
        <div class="shooting-star"></div>
        <div class="shooting-star"></div>
      </div>
      <div v-if="showLogin" class="login">
        <h2>{{ store.getters.translate('login') }}</h2>
        <form @submit.prevent="handleLogin">
          <div class="input-container">
            <input type="text" id="login-username" :placeholder="store.getters.translate('username')">
            <label for="login-username">{{ store.getters.translate('username') }}</label>
          </div>
          <div class="input-container">
            <input type="password" id="login-password" :placeholder="store.getters.translate('password')">
            <label for="login-password">{{ store.getters.translate('password') }}</label>
          </div>
          <div class="button-container">
            <button type="submit" class="login-button">{{ store.getters.translate('login') }}</button>
          </div>
        </form>
        <div class="button-container">
          <button @click="toggleForm" class="toggle-button">{{store.getters.translate('sign_up')}}</button>
        </div>
      </div>
      <div v-else class="register">
        <h2>{{store.getters.translate('sign_up')}}</h2>
        <form @submit.prevent="handleRegister">
          <div class="input-container">
            <input type="text" id="register-username" :placeholder="store.getters.translate('username')">
            <label for="register-username">{{ store.getters.translate('username') }}</label>
          </div>
          <div class="input-container">
            <input type="email" id="register-email" placeholder="Email">
            <label for="register-email">Email</label>
          </div>
          <div class="input-container">
            <input type="password" id="register-password" :placeholder="store.getters.translate('password')">
            <label for="register-password">{{ store.getters.translate('password') }}</label>
          </div>
          <div class="input-container">
            <input type="password" id="confirm-password" :placeholder="store.getters.translate('password_again')">
            <label for="confirm-password">{{ store.getters.translate('password_again') }}</label>
          </div>
          <div class="button-container">
            <button type="submit" class="register-button">{{ store.getters.translate('sign_up') }}</button>
          </div>
        </form>
        <div class="button-container">
          <button @click="toggleForm" class="toggle-button">{{ store.getters.translate('login') }}</button>
        </div>
      </div>
    </div>
  </body>
</template>
<style scoped>
body {
  height: 100vh;
  position: absolute !important;
  left: 0 !important;
  padding: 0;
  z-index: 1000;
  margin: 0;
  background: linear-gradient(to bottom, #9B3D06 10%, #D86F27 40%, #FFB75E 70%, #FFD89B);
  /* background: linear-gradient(to bottom, #0D1440 5%, #502C7A, #D1335B, #FF6B3D, #FFC95E 70%); */

  color: black;
  overflow: hidden;
  width: 100%;
}

.dark-mode body {
  background: linear-gradient(to bottom, #0b0b2b, #1b2735 70%, #090a0f);
  /* background: linear-gradient(to bottom, #0D1440, #502C7A, #D1335B, #FF6B3D, #FFC95E); */

  color: white;
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

.spinner-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.circle {
  border: 4px solid black;
  border-radius: 50%;
  position: absolute;
}

.dark-mode .circle {
  border-color: white;
}

.circle1 {
  width: 40rem;
  height: 40rem;
  animation: spin 2s linear infinite;
}

.circle2 {
  width: 40rem;
  height: 45rem;
  animation: spin 3s linear infinite;
}

.circle3 {
  width: 35rem;
  height: 40rem;
  animation: spin 4s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.login,
.register {
  width: 50%;
  z-index: 1;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 20rem;
  padding: 10px;
  background-color: #ccc;
  color: black;
  border-radius: 1rem;
  border: 0px solid black;
  box-sizing: border-box;
}

.dark-mode input {
  background-color: #333;
  color: white;
  border: 1px solid #ccc;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.register-button,
.login-button,
.toggle-button {
  /* background: linear-gradient(to right, #ff0048 -20%, #ffe205 110%); */
  background: linear-gradient(to right, #0b0b2b, #1b2735 70%, #090a0f);
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-content: center;
  align-items: center;
  gap: 0.5rem;
  min-width: 13rem;
  max-width: 20rem;
  justify-content: center;
  margin-top: 10px;
}

.toggle-button:hover{
  transform: scale(1.1);
  transition: ease-in-out 0.3s;
}

.dark-mode .register-button,
.dark-mode .login-button,
.dark-mode .toggle-button {
  background: linear-gradient(to right, #ff0048 -20%, #ffe205 110%);
  color: white;
}

.login-button:hover{
  transform: scale(1.1);
  transition: ease-in-out 0.3s;}
.register-button:hover{
  transform: scale(1.1);
  transition: ease-in-out 0.3s;}

.input-container {
  position: relative;
  margin-bottom: 15px;
  width: 100%;
}

.input-container input,
.input-container select {
  width: 20rem;
  padding: 10px;
  background-color: white;
  color: black;
  border-radius: 1rem;
  border: 0px solid black;
  box-sizing: border-box;
}

.dark-mode .input-container input,
.input-container select {
  width: 20rem;
  padding: 10px;
  background-color: black;
  color: white;
  border-radius: 1rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.input-container label {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  background-color: white;
  padding: 0 5px;
  color: black;
  transition: 0.3s;
  pointer-events: none;
}

.dark-mode .input-container label {
  background-color: black;
  color: white;
}

.input-container input:focus+label,
.input-container input:not(:placeholder-shown)+label,
.input-container select:focus+label,
.input-container select:not(:placeholder-shown)+label {
  top: 0px;
  left: 10px;
  color: black;
  font-size: 12px;
  background-color: white;
}

.dark-mode .input-container input:focus+label,
.dark-mode .input-container input:not(:placeholder-shown)+label,
.dark-mode .input-container select:focus+label,
.dark-mode .input-container select:not(:placeholder-shown)+label {
  background-color: black;
  color: white;
}

/* .register-button:hover,
.login-button:hover,
.toggle-button:hover {
  color: black;
} */


.dark-mode .stars {
  display: block;
  width: 1px;
  height: 1px;
  position: absolute;
  background: white;
  box-shadow: 2vw 5vh 2px white, 10vw 8vh 2px white, 15vw 15vh 1px white,
    22vw 22vh 1px white, 28vw 12vh 2px white, 32vw 32vh 1px white,
    38vw 18vh 2px white, 42vw 35vh 1px white, 48vw 25vh 2px white,
    53vw 42vh 1px white, 58vw 15vh 2px white, 63vw 38vh 1px white,
    68vw 28vh 2px white, 73vw 45vh 1px white, 78vw 32vh 2px white,
    83vw 48vh 1px white, 88vw 20vh 2px white, 93vw 52vh 1px white,
    98vw 35vh 2px white, 5vw 60vh 1px white, 12vw 65vh 2px white,
    18vw 72vh 1px white, 25vw 78vh 2px white, 30vw 85vh 1px white,
    35vw 68vh 2px white, 40vw 82vh 1px white, 45vw 92vh 2px white,
    50vw 75vh 1px white, 55vw 88vh 2px white, 60vw 95vh 1px white,
    65vw 72vh 2px white, 70vw 85vh 1px white, 75vw 78vh 2px white,
    80vw 92vh 1px white, 85vw 82vh 2px white, 90vw 88vh 1px white,
    95vw 75vh 2px white;
  animation: twinkle 8s infinite linear;
}

.dark-mode .shooting-star {
  display: block;
  position: absolute;
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, white, transparent);
  animation: shoot 3s infinite ease-in;
}

.dark-mode .shooting-star:nth-child(1) {
  top: 20%;
  left: -100px;
  animation-delay: 0s;
}

.dark-mode .shooting-star:nth-child(2) {
  top: 35%;
  left: -100px;
  animation-delay: 1s;
}

.dark-mode .shooting-star:nth-child(3) {
  top: 50%;
  left: -100px;
  animation-delay: 2s;
}

@keyframes twinkle {

  0%,
  100% {
    opacity: 0.8;
  }

  50% {
    opacity: 0.4;
  }
}

@keyframes shoot {
  0% {
    transform: translateX(0) translateY(0) rotate(25deg);
    opacity: 1;
  }

  100% {
    transform: translateX(120vw) translateY(50vh) rotate(25deg);
    opacity: 0;
  }
}

.dark-mode .stars::after {
  content: "";
  position: absolute;
  width: 1px;
  height: 1px;
  background: white;
  box-shadow: 8vw 12vh 2px white, 16vw 18vh 1px white, 24vw 25vh 2px white,
    33vw 15vh 1px white, 41vw 28vh 2px white, 49vw 35vh 1px white,
    57vw 22vh 2px white, 65vw 42vh 1px white, 73vw 28vh 2px white,
    81vw 48vh 1px white, 89vw 32vh 2px white, 97vw 45vh 1px white,
    3vw 68vh 2px white, 11vw 75vh 1px white, 19vw 82vh 2px white,
    27vw 88vh 1px white, 35vw 72vh 2px white, 43vw 85vh 1px white,
    51vw 92vh 2px white, 59vw 78vh 1px white;
  animation: twinkle 6s infinite linear reverse;
}

.bird {
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/174479/bird-cells-new.svg');
  filter: invert(34%) sepia(55%) saturate(427%) hue-rotate(141deg) brightness(93%) contrast(91%);
  background-size: auto 100%;
  width: 88px;
  height: 125px;
  will-change: background-position;

  animation-name: fly-cycle;
  animation-timing-function: steps(10);
  animation-iteration-count: infinite;
}

.bird-one {
  animation-duration: 1s;
  animation-delay: -0.5s;

}

.bird-two {
  animation-duration: 0.9;
  animation-delay: -0.75.s;

}

.bird-three {
  animation-duration: 1.25s;
  animation-delay: -0.25s
}

.bird-four {
  animation-duration: 1.1s;
  animation-delay: -0.5s;
}

.bird-container {
  position: absolute;
  top: 10%;
  left: -3%;
  transform: scale(0) translateX(-10vw);
  will-change: transform;

  animation-name: fly-right-one;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.dark-mode .bird-container {
  display: none;
}

.bird-container-one {
  animation-duration: 15s;
  animation-delay: 0;
}

.bird-container-two {
  animation-duration: 16s;
  animation-delay: 1s;
}

.bird-container-three {
  animation-duration: 14.6s;
  animation-delay: 9.5s;
}

.bird-container-four {
  animation-duration: 16s;
  animation-delay: 10.25s;
}

/* @keyframes fly-cycle {
    100%{
        background-position: -3600px 0;
    }
} */
@keyframes fly-cycle {

  100% {
    background-position: -900px 0;
  }

}

@keyframes fly-right-one {

  0% {
    transform: scale(0.3) translateX(-10vw);
  }

  10% {
    transform: translateY(2vh) translateX(10vw) scale(0.4);
  }

  20% {
    transform: translateY(0vh) translateX(30vw) scale(0.5);
  }

  30% {
    transform: translateY(4vh) translateX(50vw) scale(0.6);
  }

  40% {
    transform: translateY(2vh) translateX(70vw) scale(0.6);
  }

  50% {
    transform: translateY(0vh) translateX(90vw) scale(0.6);
  }

  60% {
    transform: translateY(0vh) translateX(110vw) scale(0.6);
  }

  100% {
    transform: translateY(0vh) translateX(110vw) scale(0.6);
  }

}

@keyframes fly-right-two {

  0% {
    transform: translateY(-2vh) translateX(-10vw) scale(0.5);
  }

  10% {
    transform: translateY(0vh) translateX(10vw) scale(0.4);
  }

  20% {
    transform: translateY(-4vh) translateX(30vw) scale(0.6);
  }

  30% {
    transform: translateY(1vh) translateX(50vw) scale(0.45);
  }

  40% {
    transform: translateY(-2.5vh) translateX(70vw) scale(0.5);
  }

  50% {
    transform: translateY(0vh) translateX(90vw) scale(0.45);
  }

  51% {
    transform: translateY(0vh) translateX(110vw) scale(0.45);
  }

  100% {
    transform: translateY(0vh) translateX(110vw) scale(0.45);
  }

}</style>