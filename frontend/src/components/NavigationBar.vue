<!-- <template>
  <header>
    <nav>
      //Logo linking to the home page
      <div class="logo"><router-link to="/">FoodFleet</router-link></div>
      <div class="nav-links">
        //Show user's name and logout option if authenticated
        <template v-if="isAuthenticated">
          <span>Welcome, {{ userFullName }}</span>
          <a href="#" @click.prevent="logout">Logout</a>
        </template>
        //Show login/signup links if not authenticated
        <template v-else>
          <router-link to="/login">Login</router-link>
          <router-link to="/signup">Signup</router-link>
        </template>
      </div>
    </nav>
  </header>
</template> -->

<!-- <script>
import { mapGetters, mapActions } from 'vuex';
import { toast } from 'vue3-toastify';

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

        // add a toast here with set timeout of 3 sec. that user logout successfully then push to the below page 
        

        setTimeout(() => {
          toast.success("Logged out successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000
        });
        }, 0);
        this.$router.replace('/');

      } catch (error) {
        // dont console handle error with the help of toast  and in toast show error message comming from backend
        toast.error(error.message || "Logout failed. Please try again.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000
        });
      }
    }
  }
};
</script> -->

<!-- <style scoped>
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
</style> -->


<template>
  <v-app-bar color="#ff6b6b" prominent>
    <v-app-bar-title>
      <router-link to="/" replace class="text-white text-decoration-none text-h5 font-weight-medium">FoodFleet</router-link>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <template v-if="isAuthenticated">
      <!-- <v-btn text class="text-white">
        Welcome, {{ userFullName }}
      </v-btn> -->
      <v-btn text @click="logout" class="text-white">
        Logout
      </v-btn>
    </template>
    <template v-else>
      <v-btn text to="/login" class="text-white">
        Login
      </v-btn>
      <v-btn text to="/signup" class="text-white">
        Signup
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { toast } from 'vue3-toastify';

export default {
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    async logout() {
      try {
        await this.logoutUser();

        setTimeout(() => {
          toast.success("Logged out successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000
          });
        }, 100);
        this.$router.replace('/');

      } catch (error) {
        toast.error(error.message || "Logout failed. Please try again.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000
        });
      }
    }
  }
};
</script>