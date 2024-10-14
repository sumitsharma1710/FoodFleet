<template>
  <v-container class="dashboard">
    <!-- Displays the user's full name from the store using Vuetify's typography component -->
    <p class="text-h3">Welcome, {{ userFullName }}!</p>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    // Maps the getter for the user's full name from the 'auth' store
    ...mapGetters('auth', ['userFullName'])
  }
}
</script>

<style scoped>
</style>
