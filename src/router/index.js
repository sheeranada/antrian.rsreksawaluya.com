import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import HalamanPoli from "../views/Poli.vue";
import Anpol from "../views/Anpol.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/poli",
      name: "poli",
      component: HalamanPoli,
    },
    {
      path: "/anpol",
      name: "anpol",
      component: Anpol,
    },
  ],
});

export default router;
