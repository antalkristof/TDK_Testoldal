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
  isSetting: {
    type: Boolean,
    default: true
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
  <header class="header">
    <div class="video-text">
      <b>FUSS AZ EGÉSZSÉGÉRT</b>
    </div>
    <div class="theme-switcher">
      <i v-if="isSocial" class="bi bi-person-fill" @click="navigateToHome()"></i>
      <i v-if="isProfile" class="bi bi-globe-americas" @click="navigateToSocial()"></i>
      <i v-if="isSetting" @click="toggleSettings" class="bi bi-gear"></i>
      <transition name="slide">
        <div v-if="showSettings" class="settings-panel">
          <!-- <div class="language-switcher">
            <button @click="switchLanguage">
              {{ store.state.currentLanguage === 'en' ? 'English' : 'Magyar' }}
            </button>
          </div> -->
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
  padding: 0 12px;
  background-color: rgb(224, 104, 0);
  color: black;
  height: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0);
}

i:hover {
  transform: scale(1.2);
  transition: transform 0.3s ease-in-out;
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
i  {
  color: white;
}

.video-text {
  position: relative;
  display: inline-block;
  font-size: 4rem;
  font-weight: 900;
  color: black;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
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
.slide-leave {
  transform: translateX(-10%);
  opacity: 1;
}
</style>
