<script setup>
import { ref, watch, nextTick, onMounted } from 'vue';
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
  avgSteps: '',
  date: ''
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

const navigateToLogin = () => {
  router.push('/');
};

function animateNumber(el, start, end, duration, unit) {
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const progress = currentTime - startTime;
    const value = Math.min(start + (end - start) * (progress / duration), end);
    el.innerText = (Number.isInteger(end) ? Math.round(value) : value.toFixed(2)) + ' ' + unit;

    if (progress < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

watch(showDetails, async (newVal) => {
  if (newVal) {
    await nextTick();
    const numbers = document.querySelectorAll('.text');
    numbers.forEach((number) => {
      const endValue = parseFloat(number.getAttribute('data-end'));
      const unit = number.getAttribute('data-unit');
      animateNumber(number, 0, endValue, 2000, unit);
    });

    const choosenKM = document.querySelectorAll('.choosen-km2');
    choosenKM.forEach((number) => {
      const endValue = parseFloat(number.getAttribute('data-end'));
      const unit = number.getAttribute('data-unit');
      animateNumber(number, 0, endValue, 2000, unit);
    });
  }
});

onMounted(() => {
  users.value = JSON.parse(localStorage.getItem('users')) || [];
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
    userName.value = loggedInUser.username;
    const userData = JSON.parse(localStorage.getItem(loggedInUser.username)) || [];
    userData.forEach(run => {
      const day = days.value.find(d => d.date === run.date);
      if (day) {
        day.distance = run.distance;
        day.time = run.time;
        day.avgSpeed = run.avgSpeed;
        day.avgPace = run.avgPace;
        day.avgHeartRate = run.avgHeartRate;
        day.avgRhythm = run.avgRhythm;
        day.burnedCalories = run.burnedCalories;
        day.steps = run.steps;
        day.avgSteps = run.avgSteps;
      }
    });
  }
  selectedDay.value = days.value[0];
});
</script>

<template>
  <div class="main-div">
    <header id="header">
      <Header :showLogOut="true" :navigateToLogin="navigateToLogin" :isProfile="true" :navigateToSocial="navigateToSocial"/>
    </header>
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
                  <button v-if="!selectedDay?.distance" @click="showAddData(selectedDay.date)" class="add-data-button">{{ store.getters.translate('add') }}</button>
                  <button v-if="selectedDay?.distance" @click="showDetail()" class="more-details-button">{{ store.getters.translate('more') }}</button>
                  <button v-if="selectedDay?.distance" @click="showEditData(selectedDay)" class="edit-data-button">{{ store.getters.translate('edit') }}</button>
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
            <!-- <div class="calendar-icon"> -->
              <!-- <i class="bi bi-calendar2-week"></i> -->
            <!-- </div> -->
            <div class="days">
              <div class="normal-day" v-for="day in days" :key="day.date" @click="selectedDay = day" :class="{ 'selected-day': selectedDay && selectedDay.date === day.date }">
                <h5>{{ day.name }}</h5>
                <h6>{{ day.date }}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDetails" class="details-container">
      <div class="modal-content">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <h3 style="user-select: none;">{{ store.getters.translate('detailed_information') }}</h3>
          <i class="bi bi-x-circle-fill" @click="handleMouseLeave"></i>
        </div>
        <div style="display: flex; justify-content: center; flex-direction: column; align-items: center;">
          <h4 style="user-select: none;">{{ selectedDay ? selectedDay.date : '---' }}</h4>
          <p class="choosen-km2" :data-end="selectedDay && selectedDay.distance ? selectedDay.distance : 0" data-unit="km">{{ selectedDay && selectedDay.distance ? selectedDay.distance : 0 }}</p>
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
                <p class="text" :data-end="selectedDay?.avgSpeed || 0" data-unit="km/h">{{ selectedDay?.avgSpeed || 0 }}</p>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="data-icon">
              <i class="bi bi-clock"></i>
              <div class="data">
                <h5>{{ store.getters.translate('avg_pace') }}</h5>
                <p class="text" :data-end="selectedDay?.avgPace || 0" data-unit="min/km">{{ selectedDay?.avgPace || 0 }}</p>
              </div>
            </div>
            <div class="data-icon">
              <i class="bi bi-heart"></i>
              <div class="data">
                <h5>{{ store.getters.translate('avg_heart_rate') }}</h5>
                <p class="text" :data-end="selectedDay?.avgHeartRate || 0" data-unit="bpm">{{ selectedDay?.avgHeartRate || 0 }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showAddDataModal" class="add-data-modal">
      <div class="modal-content">
        <button @click="saveData">Save</button>
      </div>
    </div>
    <div v-if="showEditDataModal" class="add-data-modal">
      <div class="modal-content">
        <button @click="updateData">Update</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-div {
  height: 100vh;
  position: absolute;
  left: 0;
  padding: 0;
  margin: 0;
  background: #000000;
  color: rgb(255, 255, 255);
  overflow: auto;
  width: 100%;
}

.main-content {
  padding: 1rem;
}

.data-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  background: url('../public/running_light.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 1rem;
}

.all-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
}

.first-floor {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: flex-start;
}

.right-side .map {
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  padding: 1rem;
  gap: 1rem;
  height: 35rem;
}

.choosen-km {
  font-size: 3rem;
  font-weight: bold;
  color: white;
}

.all {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  padding: 0.5rem;
  height: 17rem;
}

.days {
  display: flex;
  flex-direction: column; 
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 5%; /* bal oldalon */
  transform: translateY(-50%);
}

.normal-day {
  text-align: left;
  padding: 0.5rem;
  border: 2px solid transparent;
  cursor: pointer;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
}

.normal-day:hover {
  border: 2px solid rgb(255, 255, 255);
}

.selected-day {
  background-color: #000000;
  border-radius: 1rem;
}

.add-data-modal, .details-container {
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

.modal-content {
  background: black;
  color: white;
  padding: 1rem;
  border-radius: 1rem;
  gap: 1rem;
  width: 30rem;
}
</style>
