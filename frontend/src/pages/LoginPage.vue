<template>
  <div class="login-container">
    <!-- Login form with email, password, role selection, and validation -->
    <h2>Login</h2>
    <form @submit.prevent="loginHandler">
      <!-- Email input field -->
      <input type="email" v-model.trim="email" placeholder="Email" required />
      
      <!-- Password input field with validation on input -->
      <input
        type="password"
        v-model.trim="password"
        placeholder="Password"
        required

      />

      <!-- Password requirements hint
      <p class="password-requirements">
        Password must contain a lowercase letter, an uppercase letter, a number,
        a special character, and be at least 8 characters long.
      </p> -->

      <!-- Error message for invalid password -->
      <!-- <p v-if="!isPasswordValid && password" class="error-message">
        Invalid password
      </p> -->

      <!-- Role selection dropdown -->
      <select v-model="roleType" required>
        <option value="">Select Role</option>
        <option value="Admin">Admin</option>
        <option value="Customer">Customer</option>
        <option value="Restaurant_Owner">Restaurant Owner</option>
        <option value="Delivery_Partner">Delivery Partner</option>
      </select>

      <!-- Submit button, disabled if form is not valid -->
      <button type="submit" :disabled="!isFormValid">Login</button>
    </form>

    <!-- Forgot password link -->
    <div class="forgot-password">
      <router-link to="/forgotPassword">Forgot Password?</router-link>
    </div>

    <!-- Sign up link for new users -->
    <div class="new-user">
      <span>New User <router-link to="/signup">Sign Up</router-link></span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { toast } from 'vue3-toastify';

export default {
  data() {
    return {
      email: "", // Holds email input
      password: "", // Holds password input
      roleType: "", // Holds selected role
      // isPasswordValid: false, // Tracks password validation status
    };
  },
  computed: {
    ...mapState("auth", ["loading", "error"]),
    // Form validity based on email, password validation, and role selection
    isFormValid() {
      return this.email && this.roleType;
    },
  },
  methods: {
    ...mapActions("auth", ["loginUser"]),
    
    // Validate password based on set criteria
    // validatePassword() {
    //   const { password } = this;

    //   const minLength = password.length >= 8;
    //   const hasUpperCase = /[A-Z]/.test(password);
    //   const hasLowerCase = /[a-z]/.test(password);
    //   const hasNumbers = /\d/.test(password);
    //   const hasNonalphas = /\W/.test(password);

    //   this.isPasswordValid =
    //     minLength && hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas;
    // },

    // Handles login submission with validation and Vuex login action
    async loginHandler() {
      if (this.isFormValid) {
        try {
          await this.loginUser({
            email: this.email,
            password: this.password,
            role_name: this.roleType,
          });
          // Reloads user data from storage and redirects to dashboard
          this.$store.dispatch("auth/loadUserFromDB");
          setTimeout(() => {
          toast.success("Logged in successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000
        });
        }, 0);
          this.$router.replace("/dashboard");
        } catch (error) {
          toast.error(error.response?.data?.message || "Login failed", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          });
        }
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
.login-container {
  margin: auto;
  margin-top: 5%;
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
.forgot-password {
  text-align: right;
  margin-top: 10px;
}
.forgot-password a {
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
}
.new-user {
  text-align: center;
  margin-top: 10px;
}
.new-user a {
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
}
.password-requirements {
  font-size: 0.8rem;
  color: #666;
  margin-top: 5px;
}
.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}
select {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}
</style>