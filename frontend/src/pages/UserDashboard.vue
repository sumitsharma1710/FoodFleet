<template>
  <div class="dashboard">
    <!-- Displays the user's full name from the store -->
    <h1>Welcome, {{ userFullName }}!</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    // Maps the getter for the user's full name from the 'auth' store
    ...mapGetters('auth', ['userFullName'])
  }
  // methods: {
  //   // Maps the action to load the user data from storage
  //   ...mapActions('auth', ['loadUserFromDB'])
  // }
}
</script>
