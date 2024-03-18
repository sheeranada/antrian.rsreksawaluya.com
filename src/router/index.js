import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import HalamanPoli from "../views/Poli.vue";
import Anpol from "../views/Anpol.vue";
import Anlok from "../views/Anlok.vue";
import Displayloket from "../views/Displayloket.vue";
import Farmasi from "@/views/Farmasi.vue";
import DisplayFarmasi from "@/views/DisplayFarmasi.vue";

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
    {
      path: "/anlok",
      name: "anlok",
      component: Anlok,
    },
    {
      path: "/display-loket",
      name: "display-loket",
      component: Displayloket,
    },
    {
      path: "/farmasi",
      name: "farmasi",
      component: Farmasi,
    },
    {
      path: "/display-farmasi",
      name: "display-farmasi",
      component: DisplayFarmasi,
    },
  ],
});

export default router;
