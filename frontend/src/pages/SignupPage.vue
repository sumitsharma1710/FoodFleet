<template>
  <div class="signup-container">
    <h2>Sign Up</h2>
    <div v-if="error" class="error-message">{{ error }}</div>
    <form @submit.prevent="signupHandler">
      <label for="firstname">First Name*</label>
      <input type="text" id="firstname" v-model.trim="firstName" required />

      <label for="lastname">Last Name</label>
      <input type="text" id="lastname" v-model.trim="lastName" />

      <label for="phone">Phone Number*</label>
      <div class="phone-input">
        <select id="country-code" v-model.trim="countryCode" required>
          <option value="+1">+1</option>
          <option value="+44">+44</option>
          <option value="+91">+91</option>
        </select>
        <input type="tel" id="phone" v-model.trim="phoneNumber" required />
      </div>

      <label for="email">Email*</label>
      <input type="email" id="email" v-model.trim="email" required />

      <label for="password">Password*</label>
      <input
        type="password"
        id="password"
        v-model.trim="password"
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

      <label for="dob">Date of Birth*</label>
      <input type="date" id="dob" v-model.trim="dob" required />

      <label for="user-role">Sign up as*</label>
      <select id="user-role" v-model="userRole" required>
        <option value="">Select a role</option>
        <option value="Admin">Admin</option>
        <option value="Customer">Customer</option>
        <option value="Restaurant_Owner">Restaurant Owner</option>
        <option value="Delivery_Partner">Delivery Partner</option>
      </select>

      <button type="submit" :disabled="!isFormValid || loading">
        {{ loading ? 'Signing up...' : 'Sign Up' }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      countryCode: "",
      phoneNumber: "",
      email: "",
      password: "",
      dob: "",
      userRole: "",
      isPasswordValid: false,
    };
  },
  computed: {
    ...mapState('auth', ['loading', 'error']),
    isFormValid() {
      return (
        this.firstName &&
        this.countryCode &&
        this.phoneNumber &&
        this.email &&
        this.isPasswordValid &&
        this.dob &&
        this.userRole
      );
    },
  },
  methods: {
    ...mapActions('auth', ['registerUser']),
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
    async signupHandler() {
      if (this.isFormValid) {
        try {
          const userData = {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            country_code: this.countryCode,
            phone_number: this.phoneNumber,
            password: this.password,
            dob: this.dob,
            role_name: this.userRole,
          };
          
          const response = await this.registerUser(userData);
          console.log('Registration successful:', response);
          // Handle successful registration (e.g., redirect, show message)
          this.$router.push('/login');
          
        } catch (error) {
          console.error('Registration failed:', error);
          // Handle registration error (e.g., show error message)
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
  min-height: 100vh;
  margin: 0;
  background-color: #f0f0f0;
}
.signup-container {
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 650px;
  margin: auto;
}
h2 {
  text-align: center;
  color: #333;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #555;
}
input,
select {
  margin: 5px 0 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}
.phone-input {
  display: flex;
  gap: 10px;
}
.phone-input select {
  width: 30%;
}
.phone-input input {
  width: 70%;
}
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 1rem;
}
button:hover {
  background-color: #0056b3;
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

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>