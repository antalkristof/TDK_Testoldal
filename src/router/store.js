import { createStore } from 'vuex';

export const store = createStore({
  state: {
    currentLanguage: 'en',
    translations: {
      en: {
        //login
        login: 'Login',
        username: 'Username',
        password: 'Password',
        sign_in: 'Sign in',
        sign_up: 'Sign up',
        password_again: 'Password again',
        //homePage
        welcome: 'Welcome',
        Chosen_run: 'Chosen run',
        more: 'More',
        January_total: 'January total',
        on_map: 'Run on map',
        distance: 'Distance',
        time: 'Time',
        avg_speed: 'Average speed',
        avg_pace: 'Average pace',
        avg_heartrate: 'Average heartrate',
        avg_rith: 'Average rhythm',
        burn_cal: 'Burned calories',
        steps: 'Steps',
        avg_steps: 'Average steps',
        detailed_information: 'Detailed information',
        edit: 'Edit',
        add: 'Add',
        save: 'Save',
      },
      hu: {
        //login
        login: 'Bejelentkezés',
        username: 'Felhasználónév',
        password: 'Jelszó',
        sign_in: 'Bejelentkezés',
        sign_up: 'Regisztráció',
        password_again: 'Jelszó újra',
        //homePage
        welcome: 'Üdvözöljük',
        Chosen_run: 'Kiválasztott futás',
        more:'Bővebben',
        January_total: 'Január összesen',
        on_map:'Futás a térképen',
        distance:'Távolság',
        time:'Időtartam',
        avg_speed:'Átlag sebesség',
        avg_pace: 'Átlag tempó',
        avg_heartrate: 'Átlag pulzus',
        avg_rith: 'Átlagos ritmus',
        burn_cal: 'Égetett kalóia',
        steps: 'Lépések száma',
        avg_steps: 'Átlagos lépésszám',
        detailed_information: 'Részletes információ',
        edit: 'Szerkesztés',
        add:'Hozzáadás',
        save: 'Mentés',
      }
    }
  },
  mutations: {
    switchLanguage(state) {
      state.currentLanguage = state.currentLanguage === 'en' ? 'hu' : 'en';
    }
  },
  getters: {
    translate: (state) => (key) => {
      return state.translations[state.currentLanguage][key];
    }
  }
});