<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="loginHandler">
      <input type="email" v-model.trim="email" placeholder="Email" required />
      <input
        type="password"
        v-model.trim="password"
        placeholder="Password"
        required
        @input="validatePassword"
      />
      <p class="password-requirements">
        Password must contain a lowercase letter, an uppercase letter, a number,
        a special character, and be at least 8 characters long.
      </p>
      <p v-if="!isPasswordValid && password" class="error-message">
        Invalid password
      </p>

      <button type="submit" :disabled="!isFormValid">Login</button>
    </form>
    <div class="forgot-password">
      <router-link to="/forgotPassword">Forgot Password?</router-link>
    </div>
    <div class="new-user">
      <span>New User <router-link to="/signup">Sign Up</router-link></span>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isPasswordValid: false,
    };
  },
  computed: {
    isFormValid() {
      return this.isPasswordValid;
    },
  },
  methods: {
    validatePassword() {
      const { password } = this;

      const minLength = password.length >= 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasNonalphas = /\W/.test(password);

      this.isPasswordValid =
        minLength && hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas;
    },
    loginHandler() {
      if (this.isFormValid) {
        console.log("Form is valid. Logging in...");
      } else {
        console.log("Form is invalid. Please check all fields.");
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
</style>