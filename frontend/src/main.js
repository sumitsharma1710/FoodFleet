import { createApp } from "vue"; // Import Vue
import App from "./App.vue"; // Main component

import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import vuetify from "./plugins/vuetify"; // Vuetify plugin
import { loadFonts } from "./plugins/webfontloader"; // Load fonts
import router from "./router"; // App routing
import store from "./store/store"; // Vuex store

loadFonts(); // Load fonts

const app = createApp(App); // Create app
app.use(router); // Add router
app.use(store); // Add store


app.use(Vue3Toastify, {
  autoClose: 3000,
  // Add other options here if needed
});

app.use(vuetify); // Add Vuetify

app.mount("#app"); // Mount app
