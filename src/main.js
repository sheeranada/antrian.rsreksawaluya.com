// import "./assets/main.css";
import "./assets/anpol.min.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import jQuery from "jquery";
import DataTable from "datatables.net-bs5";
import "datatables.net-searchbuilder-bs5";

const app = createApp(App);

app.use(router);

app.mount("#app");
