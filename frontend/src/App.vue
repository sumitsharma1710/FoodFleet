<template>
  <v-app>
    <!-- Include navigation bar component -->
    <NavigationBar></NavigationBar>
    <v-main>
      <!-- Dynamic content based on current route -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'; // Import navigation bar component

export default {
  name: "App", // Main app component
  components: {
    NavigationBar // Register navigation bar component
  }
}
</script>
