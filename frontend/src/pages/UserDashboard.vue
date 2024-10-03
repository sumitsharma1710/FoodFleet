<template>
    <div class="dashboard">
      <h1>Welcome, {{ userFullName }}!</h1>
      <!-- Rest of your dashboard content -->
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters('auth', ['userFullName'])
    },
    methods: {
      ...mapActions('auth', ['loadUserFromStorage'])
    },
    created() {
      // Load user data from storage when the component is created
      this.loadUserFromStorage();
    }
  }
  </script>