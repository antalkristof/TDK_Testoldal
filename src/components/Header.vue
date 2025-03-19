<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

defineProps({
  showLogOut: {
    type: Boolean,
    default: false
  },
  isSocial: {
    type: Boolean,
    default: false
  },
  isProfile: {
    type: Boolean,
    default: false
  },
  navigateToLogin: Function,
  navigateToHome: Function,
  navigateToSocial: Function,
});

const store = useStore();
const router = useRouter();

const isDarkMode = ref(false);
const showSettings = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle('dark-mode', isDarkMode.value);
  localStorage.setItem('isDarkMode', isDarkMode.value);
};

const toggleSettings = () => {
  showSettings.value = !showSettings.value;
};

onMounted(() => {
  const savedDarkMode = localStorage.getItem('isDarkMode');
  if (savedDarkMode !== null) {
    isDarkMode.value = savedDarkMode === 'true';
    document.body.classList.toggle('dark-mode', isDarkMode.value);
  }
});

const switchLanguage = () => {
  store.commit('switchLanguage');
};

// Kijelentkezés logika
const navigateToLogin = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
    const sessionEndTime = new Date();
    const elapsedTime = Math.floor((sessionEndTime - new Date(store.state.sessionStartTime)) / 1000); // Másodpercben

    // Felhasználóhoz mentés
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = storedUsers.findIndex(user => user.username === loggedInUser.username);
    if (userIndex !== -1) {
      storedUsers[userIndex].totalTime = (storedUsers[userIndex].totalTime || 0) + elapsedTime;
      localStorage.setItem('users', JSON.stringify(storedUsers));
    }

    // Kijelentkezés
    localStorage.removeItem('loggedInUser');
    store.commit('resetSessionStartTime'); // Stopper nullázása
    router.push('/'); // Navigálás a bejelentkezési oldalra
  }
};
</script>

<template>
  <header :class="['header', { 'dark-mode': isDarkMode }]">
    <div class="video-text">
      <b>FUSS</b>
    </div>
    <div class="theme-switcher">
      <i v-if="isSocial" class="bi bi-person-fill" @click="navigateToHome()"></i>
      <i v-if="isProfile" class="bi bi-globe-americas" @click="navigateToSocial()"></i>
      <i @click="toggleSettings" class="bi bi-gear"></i>
      <transition name="slide">
        <div v-if="showSettings" class="settings-panel">
          <div class="language-switcher">
            <button @click="switchLanguage">
              {{ store.state.currentLanguage === 'en' ? 'English' : 'Magyar' }}
            </button>
          </div>
          <i @click="toggleDarkMode" :class="isDarkMode ? 'bi bi-moon-fill' : 'bi bi-brightness-high-fill' "></i>
          <i v-if="showLogOut" @click="navigateToLogin()" class="bi bi-box-arrow-right"></i>
        </div>
      </transition>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: rgba(255, 247, 0, 0.386);
  color: black;
  height: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
}

.logo {
  width: 4rem;
  height: auto;
}

i:hover{
  transform: scale(1.2);
  transition: transform 0.3s ease-in-out;
}

.dark-mode .logo {
  filter: invert(1);
}

i {
  font-size: 1.5em;
  margin-right: 10px;
  cursor: pointer;
}

.language-switcher button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1em;
  padding: 5px 10px;
}

.theme-switcher {
  display: flex;
  align-items: center;
  margin-left: auto;
  position: relative;
}

.settings-panel {
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 1rem;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-right: 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

.bi-box-arrow-right {
  font-size: 1.5em;
  font-weight: 900;
  cursor: pointer;
}

input:checked + .slider {
  background-color: black;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.dark-mode {
  background-color: transparent;
  color: #fff;
}

.dark-mode button {
  color: white;
}

:root {
  --header-bg-color: #fff;
  --header-text-color: #000;
}

.video-text {
  position: relative;
  display: inline-block;
  font-size: 4rem;
  font-weight: 900;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: url('/public/run.gif');
  background-size: cover;
  background-position: center;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
  -webkit-text-stroke: 1px black;
  color: #40e0d0; /* Türkizkék szín */
}

.dark-mode .video-text {
  -webkit-text-stroke: 1px white;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.slide-enter, .slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-to {
  transform: translateX(-10%);
  opacity: 1;
}
.slide-leave{
  transform: translateX(-10%);
  opacity: 1;
}
</style>
