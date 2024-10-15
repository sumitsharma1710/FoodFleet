<template>
  <v-app-bar color="#ff6b6b" prominent>
    <v-app-bar-title>
      <router-link
        to="/"
        replace
        class="text-white text-decoration-none text-h5 font-weight-medium"
        >FoodFleet</router-link
      >
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <template v-if="isAuthenticated">
      <v-btn text @click="logout" class="text-white"> Logout </v-btn>
    </template>
    <template v-else>
      <v-btn text to="/login" class="text-white"> Login </v-btn>
      <v-btn text to="/signup" class="text-white"> Signup </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { toast } from "vue3-toastify";

export default {
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
    async logout() {
      try {
        await this.logoutUser();

        setTimeout(() => {
          toast.success("Logged out successfully", {
            autoClose: 1500,
            pauseOnHover: true,
            position: "top-right",
            hideProgressBar: true,
            theme: "colored",
          });
        }, 100);
        this.$router.replace("/");
      } catch (error) {
        setTimeout(() => {
          toast.error(
            error.response?.data?.message || "Something went wrong!! Please login again.",
            {
              autoClose: 1500,
              pauseOnHover: true,
              position: "top-right",
              hideProgressBar: true,
              theme: "colored",
            }
          );
        }, 100);
      }finally {
        this.$router.replace("/");
      }
    },
  },
};
</script>