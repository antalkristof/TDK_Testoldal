import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/LoginPage.vue";
import HomePage from "../components/Homepage.vue";
import socialMedia from "../components/SocialMedia.vue";
import admin from "../components/Admin.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
        path: "/",
        name: "root",
        component: LoginPage,
      },
      {
        path: "/socialmedia",
        name: "socialmedia",
        component: socialMedia,
      },
      {
        path: "/home",
        name: "home",
        component: HomePage,
      },
      {
        path: "/admin",
        name: "admin",
        component: admin,
      }
    ]
});
export default router;