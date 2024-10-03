<template>
  <header>
    <nav>
      <div class="logo"><router-link to="/">FoodFleet</router-link></div>
      <div class="nav-links">
        <template v-if="isAuthenticated">
          <span>Welcome, {{ userFullName }}</span>
          <a href="#" @click.prevent="logout">Logout</a>
        </template>
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
    ...mapGetters('auth', ['isAuthenticated', 'userFullName'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    async logout() {
      try {
        await this.logoutUser();
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  },
  created() {
    // Ensure user data is loaded when component is created
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