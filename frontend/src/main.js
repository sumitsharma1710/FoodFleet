import { createApp } from 'vue' // Import Vue
import App from './App.vue' // Main component
import vuetify from './plugins/vuetify' // Vuetify plugin
import { loadFonts } from './plugins/webfontloader' // Load fonts
import router from './router' // App routing
import store from './store/store' // Vuex store

loadFonts() // Load fonts

const app = createApp(App) // Create app

app.use(router) // Add router
app.use(store) // Add store
store.dispatch('auth/loadUserFromStorage') // Load user data

app.use(vuetify) // Add Vuetify
app.mount('#app') // Mount app
