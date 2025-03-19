<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue';
import Header from '../components/Header.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const showDetails = ref(false);
const showAddDataModal = ref(false);
const showEditDataModal = ref(false);
const users = ref([]);
const userName = ref('');
const selectedDay = ref(null);
const newData = ref({
  distance: '',
  time: '',
  avgSpeed: '',
  avgPace: '',
  avgHeartRate: '',
  avgRhythm: '',
  burnedCalories: '',
  steps: '',
  avgSteps: ''
});

const days = ref([
  { name: 'Hétfő', date: 'Jan. 22.' },
  { name: 'Kedd', date: 'Jan. 23.' },
  { name: 'Szerda', date: 'Jan. 24.' },
  { name: 'Csütörtök', date: 'Jan. 25.' },
  { name: 'Péntek', date: 'Jan. 26.' },
  { name: 'Szombat', date: 'Jan. 27.' },
  { name: 'Vasárnap', date: 'Jan. 28.' }
]);

let refreshInterval = null;

function showDetail() {
  showDetails.value = true;
}

function handleMouseLeave() {
  showDetails.value = false;
}

function showAddData(date) {
  newData.value = {
    distance: '',
    time: '',
    avgSpeed: '',
    avgPace: '',
    avgHeartRate: '',
    avgRhythm: '',
    burnedCalories: '',
    steps: '',
    avgSteps: '',
    date: date
  };
  showAddDataModal.value = true;
}

function showEditData(day) {
  newData.value = { ...day };
  showEditDataModal.value = true;
}

function hideAddData() {
  showAddDataModal.value = false;
}

function hideEditData() {
  showEditDataModal.value = false;
}

function saveData() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
    const userData = JSON.parse(localStorage.getItem(loggedInUser.username)) || [];
    userData.push(newData.value);
    localStorage.setItem(loggedInUser.username, JSON.stringify(userData));
    hideAddData();
  }
}

function updateData() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
    const userData = JSON.parse(localStorage.getItem(loggedInUser.username)) || [];
    const index = userData.findIndex(run => run.date === newData.value.date);
    if (index !== -1) {
      userData[index] = newData.value;
      localStorage.setItem(loggedInUser.username, JSON.stringify(userData));
      hideEditData();
    }
  }
}

function fetchUserData() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
    userName.value = loggedInUser.username;
    const userData = JSON.parse(localStorage.getItem(loggedInUser.username)) || [];
    days.value.forEach(day => {
      const run = userData.find(run => run.date === day.date);
      if (run) {
        day.distance = run.distance;
        day.time = run.time;
        day.avgSpeed = run.avgSpeed;
        day.avgPace = run.avgPace;
        day.avgHeartRate = run.avgHeartRate;
        day.avgRhythm = run.avgRhythm;
        day.burnedCalories = run.burnedCalories;
        day.steps = run.steps;
        day.avgSteps = run.avgSteps;
      } else {
        // Reset the day if no data is found
        day.distance = null;
        day.time = null;
        day.avgSpeed = null;
        day.avgPace = null;
        day.avgHeartRate = null;
        day.avgRhythm = null;
        day.burnedCalories = null;
        day.steps = null;
        day.avgSteps = null;
      }
    });
  }
}

const navigateToLogin = () => {
  router.push('/');
};
const navigateToSocial = () => {
  router.push('/socialmedia');
};

onMounted(() => {
  users.value = JSON.parse(localStorage.getItem('users')) || [];
  fetchUserData();
  selectedDay.value = days.value[0];

  // Indítsd el az 1 másodperces frissítést
  refreshInterval = setInterval(fetchUserData, 1000);
});

onUnmounted(() => {
  // Állítsd le az időzítőt, ha a komponens eltávolításra kerül
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});
</script>

<template>
  <div class="main-div">
    <header id="header">
      <Header :showLogOut="true" :navigateToLogin="navigateToLogin" :isProfile="true" :navigateToSocial="navigateToSocial"/>
    </header>
    <!-- <div class="wellcome-text">
      <b>{{ store.getters.translate('welcome') }} {{ userName }}!</b>
    </div> -->
    <div class="main-content">
      <div class="data-container">
        <div class="all-card">
          <div class="first-floor">
            <div class="left-side">
              <div class="choose-run">
                <h3>{{ store.getters.translate('Chosen_run') }}</h3>
                <h4>{{ selectedDay ? selectedDay.date : '---' }}</h4>
                <p class="choosen-km">{{ selectedDay && selectedDay.distance ? selectedDay.distance : '-' }} km</p>
                <div class="button-container">
                  <button v-if="selectedDay && selectedDay.distance" @click="showDetail()" class="more-details-button">{{
                    store.getters.translate('more') }}</button>
                  <button v-if="selectedDay && selectedDay.distance" @click="showEditData(selectedDay)"
                    class="edit-data-button">{{ store.getters.translate('edit') }}</button>
                  <button v-else @click="showAddData(selectedDay.date)" class="add-data-button">{{
                    store.getters.translate('add') }}</button>
                </div>
              </div>
              <div class="all">
                <h2>{{ store.getters.translate('January_total') }}</h2>
                <p class="choosen-km">98,8 km</p>
              </div>
            </div>
            <div class="right-side">
              <div class="map">
                <h2>{{ store.getters.translate('on_map') }}</h2>
                <img src="/public/map.jpg" alt="">
              </div>
            </div>
          </div>
          <div class="second-floor">
            <div class="calendar-icon">
              <i class="bi bi-calendar2-week"></i>
            </div>
            <div class="days">
              <div class="normal-day" v-for="day in days" :key="day.date" @click="selectedDay = day"
                :class="{ 'selected-day': selectedDay && selectedDay.date === day.date }">
                <h5>{{ day.name }}</h5>
                <h6>{{ day.date }}</h6>
                <p>{{ day && day.distance ? day.distance : '- ' }} km</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDetails" class="details-container">
      <div class="modal-content">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <h3 style="  user-select: none;">{{ store.getters.translate('detailed_information') }}</h3>
          <i class="bi bi-x-circle-fill" @click="handleMouseLeave"></i>
        </div>
        <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
          <h4 style="  user-select: none; ">{{ selectedDay ? selectedDay.date : '---' }}</h4>
          <p class="choosen-km2" :data-end="selectedDay && selectedDay.distance ? selectedDay.distance : 0"
            data-unit="km">{{ selectedDay && selectedDay.distance ? selectedDay.distance : 0 }}</p>
        </div>
        <div class="details-columns">
          <div class="column">
            <div class="data-icon">
              <i class="bi bi-stopwatch"></i>
              <div class="data">
                <h5>{{ store.getters.translate('time') }}</h5>
                <p class="text" :data-end="selectedDay?.time || 0" data-unit="perc">{{ selectedDay?.time || 0 }}</p>
              </div>
            </div>
            <div class="data-icon">
              <i class="bi bi-speedometer"></i>
              <div class="data">
                <h5>{{ store.getters.translate('avg_speed') }}</h5>
                <p class="text" :data-end="selectedDay?.avgSpeed || 0" data-unit="km/h">{{ selectedDay?.avgSpeed || 0 }}
                </p>
              </div>
            </div>
            <div class="data-icon">
              <i class="bi bi-speedometer2"></i>
              <div class="data">
                <h5>{{ store.getters.translate('avg_pace') }}</h5>
                <p class="text" :data-end="selectedDay?.avgPace || 0" data-unit="km">{{ selectedDay?.avgPace || 0 }}</p>
              </div>
            </div>
            <div class="data-icon">
              <i class="bi bi-heart"></i>
              <div class="data">
                <h5>{{ store.getters.translate('steps') }}</h5>
                <p class="text" :data-end="selectedDay?.steps || 0" data-unit="lépés">{{ selectedDay?.steps || 0 }}</p>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="data-icon">
              <i class="bi bi-heart"></i>
              <div class="data">
                <h5>{{ store.getters.translate('avg_rith') }}</h5>
                <p class="text" :data-end="selectedDay?.avgRhythm || 0" data-unit="perc/km">{{ selectedDay?.avgRhythm || 0
                }}</p>
              </div>
            </div>
            <div class="data-icon">
              <i class="bi bi-thermometer"></i>
              <div class="data">
                <h5>{{ store.getters.translate('burn_cal') }}</h5>
                <p class="text" :data-end="selectedDay?.burnedCalories || 0" data-unit="kcal">{{
                  selectedDay?.burnedCalories || 0 }}</p>
              </div>
            </div>
            <div class="data-icon">
              <i class="bi bi-thermometer"></i>
              <div class="data">
                <h5>{{ store.getters.translate('avg_steps') }}</h5>
                <p class="text" :data-end="selectedDay?.avgSteps || 0" data-unit="m">{{ selectedDay?.avgSteps || 0 }}</p>
              </div>
            </div>
            <div class="data-icon">
              <i class="bi bi-heart"></i>
              <div class="data">
                <h5>{{ store.getters.translate('avg_heartrate') }}</h5>
                <p class="text" :data-end="selectedDay?.avgHeartRate || 0" data-unit="bpm">{{ selectedDay?.avgHeartRate ||
                  0 }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showAddDataModal" class="add-data-modal">
      <div class="modal-content">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <h3>{{ store.getters.translate('add_data') }}</h3>
          <i class="bi bi-x-circle-fill" @click="hideAddData"></i>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; flex-direction: column; gap: 1rem;">
          <div class="input-container">
            <label>{{ store.getters.translate('distance') }}</label>
            <input v-model="newData.distance">
          </div>
          <div class="input-container">
            <label>{{ store.getters.translate('time') }}</label>
            <input v-model="newData.time">
          </div>
          <div class="input-container">
            <label>{{ store.getters.translate('avg_speed') }}</label>
            <input v-model="newData.avgSpeed">
          </div>
          <div class="input-container">
            <label>{{ store.getters.translate('avg_pace') }}</label>
            <input v-model="newData.avgPace">
          </div>
          <div class="input-container">
            <label>{{ store.getters.translate('avg_heartrate') }}</label>
            <input v-model="newData.avgHeartRate">
          </div>
          <div class="input-container">
            <label>{{ store.getters.translate('avg_rith') }}</label>
            <input v-model="newData.avgRhythm">
          </div>
          <div class="input-container">
            <label>{{ store.getters.translate('burn_cal') }}</label>
            <input v-model="newData.burnedCalories">
          </div>
          <div class="input-container">
            <label>{{ store.getters.translate('steps') }}</label>
            <input v-model="newData.steps">
          </div>
          <div class="input-container">
            <label>{{ store.getters.translate('avg_steps') }}</label>
            <input v-model="newData.avgSteps">
          </div>       
          <button @click="saveData" class="save-button">{{ store.getters.translate('save') }}</button>
        </div>
      </div>
    </div>
    <div v-if="showEditDataModal" class="add-data-modal">
      <div class="modal-content">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <h3>{{ store.getters.translate('edit_data') }}</h3>
          <i class="bi bi-x-circle-fill" @click="hideEditData"></i>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; flex-direction: column; gap: 1rem;">
          <div class="input-container">
            <label>{{ store.getters.translate('distance') }}</label>
            <input v-model="newData.distance">
          </div>
          <div class="input-container">
            <label>{{ store.getters.translate('time') }}</label>
            <input v-model="newData.time">
          </div>
          <div class="input-container">
            <label>{{ store.getters.translate('avg_speed') }}</label>
            <input v-model="newData.avgSpeed">
          </div>
          <div class="input-container">
            <label>{{ store.getters.translate('avg_pace') }}</label>
            <input v-model="newData.avgPace">
          </div>
          <div class="input-container">
            <label>{{ store.getters.translate('avg_heartrate') }}</label>
            <input v-model="newData.avgHeartRate">
          </div>
          <div class="input-container">
            <label>{{ store.getters.translate('avg_rith') }}</label>
            <input v-model="newData.avgRhythm">
          </div>
          <div class="input-container">
            <label>{{ store.getters.translate('burn_cal') }}</label>
            <input v-model="newData.burnedCalories">
          </div>
          <div class="input-container">
            <label>{{ store.getters.translate('steps') }}</label>
            <input v-model="newData.steps">
          </div>
          <div class="input-container">
            <label>{{ store.getters.translate('avg_steps') }}</label>
            <input v-model="newData.avgSteps">
          </div>
          <button @click="updateData" class="save-button">{{ store.getters.translate('save') }}</button>
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

.main-content {
  padding: 1rem;
}

.wellcome-text {
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 2.5rem;
  padding-left: 1rem;
}

.data-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100vh;
  background: url('../public/running_light.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 1rem;
}

.dark-mode .data-container {
  background: url('../public/running.jpg');
  background-size: cover;
}

.all-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
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

/* text/ikon */
.text {
  margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

.bi-x-circle-fill {
  cursor: pointer;
  font-size: 1.4rem;
}

/* first floor */
.first-floor {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.right-side {
  display: flex;
}

.map {
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1rem;
  padding: 1rem;
  height: 35rem;
  gap: 2rem;
}

.dark-mode .map {
  background-color: #6262628c;
}

img {
  height: 27rem;
  width: auto;
  border-radius: 1rem;
  user-select: none;
}

.left-side {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.choose-run {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1rem;
  padding: 1rem;
  height: 17rem;
  gap: 0.5rem;
  min-width: 20rem;
}

.dark-mode .choose-run {
  background-color: #6262628c;
}

.choosen-km {
  font-size: 4rem;
  font-weight: bold;
}

.choosen-km2 {
  font-size: 4rem;
  font-weight: bold;
  user-select: none;
}

.all {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1rem;
  padding: 0.5rem;
  height: 17rem;
}

.dark-mode .all {
  background-color: #6262628c;
}

/* second floor */
.second-floor {
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1rem;
  height: 100%;
}

.dark-mode .second-floor {
  background-color: #6262628c;
}

.data {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.data-icon {
  display: flex;
  align-items: center;
  user-select: none;
  gap: 0.5rem;
}

.data-icon:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: ease-in-out 0.3s;
}

.calendar-icon {
  display: flex;
  justify-content: start;
  padding-top: 0.5rem;
  padding-left: 1rem;
  font-size: 1.5rem;
}

.selected-day {
  background-color: #f0f0f0;
  border-radius: 1rem;
}

.dark-mode .selected-day {
  background-color: #333;
  border-radius: 1rem;
}

.days {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 1rem;
}

.normal-day {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding: 0.5rem;
  border: 2px solid transparent;
}

.normal-day:hover {
  border: 2px solid white;
  border-radius: 1rem;
  cursor: pointer;
}

.dark-mode .normal-day:hover {
  border: 2px solid #333;
}

.choosen-date {
  background: white;
  border-radius: 1rem;
  text-align: center;
  padding: 0.5rem;
}

.dark-mode .choosen-date {
  background: #333;
  color: white;
}

/* modals */
.add-data-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999999;
}

.details-columns {
  display: flex;
  justify-content: center;
  padding: 1.4rem;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
}

.details-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999999;
  border-radius: 1rem;
  padding: 1rem;
  animation: fadeIn 0.5s;
}

.modal-content {
  background: white;
  padding: 1rem;
  border-radius: 1rem;
  gap: 1rem;
  width: 30rem;
  box-shadow: #4744dd 0px 0px 10px;
  color: black;
  position: relative;
}

.dark-mode .modal-content {
  background: #202528;
  box-shadow: #dd9c44 0px 0px 10px;
  color: white;
}

/* buttons */
.button-container{
  display: flex;
  gap: 1rem;
}

.more-details-button,
.edit-data-button,
.add-data-button,
.save-button {
  background: linear-gradient(to right, #0b0b2b, #1b2735 70%, #090a0f);
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 0.5rem;
  min-width: 7rem;
}


.more-details-button:hover,
.edit-data-button:hover,
.add-data-button:hover,
.save-button:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition: ease-in-out 0.3s;
}

.dark-mode .more-details-button,
.dark-mode .edit-data-button,
.dark-mode .add-data-button,
.dark-mode .save-button {
  background: linear-gradient(to right, #ff0048 -20%, #ffe205 110%);
  color: white;
}

.dark-mode .more-details-button:hover,
.dark-mode .edit-data-button:hover,
.dark-mode .add-data-button:hover,
.save-button{
  transition: ease-in-out 0.3s;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.input-container{
  display: flex;
  flex-direction: column;
}

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 1rem;
  border: 1px solid #ccc;
}
/* egyéb */

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}</style>