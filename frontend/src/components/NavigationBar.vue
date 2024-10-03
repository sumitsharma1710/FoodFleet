<template>
  <header>
    <nav>
      <!-- Logo linking to the home page -->
      <div class="logo"><router-link to="/">FoodFleet</router-link></div>
      <div class="nav-links">
        <!-- Show user's name and logout option if authenticated -->
        <template v-if="isAuthenticated">
          <span>Welcome, {{ userFullName }}</span>
          <a href="#" @click.prevent="logout">Logout</a>
        </template>
        <!-- Show login/signup links if not authenticated -->
        <template v-else>
          <router-link to="/login">Login</router-link>
          <router-link to="/signup">Signup</router-link>
        </template>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    // Map authentication state and user's full name from the store
    ...mapGetters('auth', ['isAuthenticated', 'userFullName'])
  },
  methods: {
    // Map the action to log out the user
    ...mapActions('auth', ['logoutUser']),
    async logout() {
      try {
        // Attempt to log out the user and redirect to home page
        await this.logoutUser();
        this.$router.push('/');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  },
  created() {
    // Load user data when the component is created
    this.$store.dispatch('auth/loadUserFromStorage');
  }
};
</script>

<style scoped>
header {
  background-color: #ff6b6b;
  color: white;
  padding: 1rem 5%;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.logo a {
  color: white;
  text-decoration: none;
}

.nav-links a, .nav-links span {
  color: white;
  text-decoration: none;
  margin-left: 20px;
}
</style>
