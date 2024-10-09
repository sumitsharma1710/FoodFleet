<template>
  <div class="reset-password-container">
    <h2>Reset Password</h2>
    <!-- Password reset form -->
    <form @submit.prevent="handleResetPassword">
      <input
        type="password"
        v-model="password"
        placeholder="New Password"
        required
      />
      <input
        type="password"
        v-model="confirmPassword"
        placeholder="Confirm New Password"
        required
      />
      <!-- Disable button if passwords are empty or in process -->
      <button
        type="submit"
        :disabled="!password || !confirmPassword || loading"
      >
        {{ loading ? "Resetting..." : "Reset Password" }}
      </button>
    </form>
    <!-- Display message after reset attempt -->
    <p v-if="message" :class="['message', messageType]">
      {{ message }}
    </p>
    <!-- Error handling -->
    <p v-if="error" class="error-message">Error: {{ error }}</p>
  </div>
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
    };
  },
  computed: {
    ...mapState("auth", ["loading"]),
    // Retrieve reset token from route params
    token() {
      return this.$route.params.token;
    },
  },
  methods: {
    ...mapActions("auth", ["resetPassword"]),
    // Handle password reset logic
    async handleResetPassword() {
      // Ensure passwords match
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords don't match";
        return;
      }
      // Reset messages and errors before attempting reset
      this.message = "";
      this.error = "";
      try {
        // Call action to reset password
        const response = await this.resetPassword({
          token: this.token,
          password: this.password,
        });
        // Handle success
        if (response.status === "Success") {
          this.message =
            "Password reset successfully. You can now log in with your new password.";
          this.messageType = "success";
          setTimeout(() => this.$router.replace("/login"), 3000);
        } else {
          // Handle failure
          this.message = "An error occurred. Please try again.";
          this.messageType = "error";
        }
      } catch (error) {
        // Handle error during password reset
        this.error = error.message || "An error occurred. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}
.reset-password-container {
  margin: auto;
  margin-top: 10%;
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}
h2 {
  text-align: center;
  color: #333;
}
form {
  display: flex;
  flex-direction: column;
}
input {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
button:hover {
  background-color: #0056b3;
}
button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
.message {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}
.success {
  background-color: #d4edda;
  color: #155724;
}
.error {
  background-color: #f8d7da;
  color: #721c24;
}
</style>