<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-title class="text-center text-h5 py-4">
            Reset Password
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleResetPassword">
              <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                label="New Password"
                id="password"
                @click:append="showPassword = !showPassword"
                required
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showConfirmPassword ? 'text' : 'password'"
                name="confirmPassword"
                label="Confirm New Password"
                id="confirmPassword"
                @click:append="showConfirmPassword = !showConfirmPassword"
                required
              ></v-text-field>
              <v-btn
                type="submit"
                color="primary"
                block
                :loading="loading"
                :disabled="!password || !confirmPassword || loading"
                class="mt-4"
              >
                {{ loading ? "Resetting..." : "Reset Password" }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        <v-alert
          v-if="message"
          :type="messageType"
          class="mt-4"
          dense
          outlined
        >
          {{ message }}
        </v-alert>
        <v-alert
          v-if="error"
          type="error"
          class="mt-4"
          dense
          outlined
        >
          {{ error }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      password: "",
      confirmPassword: "",
      message: "",
      messageType: "",
      error: "",
      showPassword: false,
      showConfirmPassword: false,
    };
  },
  computed: {
    ...mapState("auth", ["loading"]),
    token() {
      return this.$route.params.token;
    },
  },
  methods: {
    ...mapActions("auth", ["resetPassword"]),
    async handleResetPassword() {
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords don't match";
        return;
      }
      this.message = "";
      this.error = "";
      try {
        const response = await this.resetPassword({
          token: this.token,
          password: this.password,
        });
        if (response.status === "Success") {
          this.message = "Password reset successfully. You can now log in with your new password.";
          this.messageType = "success";
          setTimeout(() => this.$router.replace("/login"), 3000);
        } else {
          this.message = "An error occurred. Please try again.";
          this.messageType = "error";
        }
      } catch (error) {
        this.error = error.message || "An error occurred. Please try again.";
      }
    },
  },
};
</script>