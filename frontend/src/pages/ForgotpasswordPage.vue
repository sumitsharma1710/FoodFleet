<template>
  <div class="login-container">
    <h2>Forgot Password</h2>
    <!-- Form to handle forgot password submission -->
    <form @submit.prevent="handleForgotPassword">
      <!-- Input field for email -->
      <input 
        type="email" 
        v-model="email" 
        placeholder="Email" 
        required 
      />
      <!-- Instructional message for the user -->
      <p class="email-requirements">
        Enter the email to get the reset password link
      </p>
      <!-- Submit button, disabled if no email or loading -->
      <button type="submit" :disabled="!email || loading">
        {{ loading ? 'Sending...' : 'Reset Password' }}
      </button>
    </form>
    <!-- Link to log in if password reset is successful -->
    <div v-if="resetSuccess" class="signin-link">
      <router-link to="/login">Log In</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { toast } from 'vue3-toastify';

export default {
  data() {
    return {
      email: '',        // User's email input
      resetSuccess: false // Flag to show login link after successful reset
    };
  },
  computed: {
    // Get 'loading' state from the auth Vuex module
    ...mapState('auth', ['loading'])
  },
  methods: {
    // Map Vuex action for forgot password
    ...mapActions('auth', ['forgotPassword']),
    
    // Handle forgot password logic
    async handleForgotPassword() {
      try {
        const response = await this.forgotPassword(this.email);  // Call forgotPassword action
        if (response.status === 'Success') {
          toast.success('Reset password link sent to your email.', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          });
          this.resetSuccess = true;
        } else {
          toast.error('An error occurred. Please try again.', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          });
        }
      } catch (error) {
        toast.error(error || 'An error occurred. Please try again.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        });
      }
    }
  }
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
.email-requirements {
  font-size: 0.8rem;
  color: #666;
  margin-top: 5px;
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
.signin-link {
  margin-top: 15px;
  text-align: center;
}
</style>
