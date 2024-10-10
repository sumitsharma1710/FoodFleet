<template>
  <!-- Sign Up Form Container -->
  <div class="signup-container">
    <h2>Sign Up</h2>

    <!-- Display error message if any -->
    <!-- <div v-if="error" class="error-message">{{ error }}</div> -->

    <!-- Form to handle user signup -->
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
        @focus="passwordFocused = true"
        @blur="handlePasswordBlur"
      />
      <!-- Password requirements description -->
      <p class="password-requirements" v-if="showPasswordRequirements">
        Password must contain a lowercase letter, an uppercase letter, a number,
        a special character, and be at least 8 characters long.
      </p>
      <!-- Show invalid password message -->
      <p v-if="!isPasswordValid && password" class="error-message">
        Invalid password
      </p>

      <label for="dob">Date of Birth*</label>
      <input
        type="date"
        id="dob"
        v-model.trim="dob"
        @blur="validateAge"
        required
      />
      <p v-if="dobValidationMessage" class="error-message">
        {{ dobValidationMessage }}
      </p>

      <label for="user-role">Sign up as*</label>
      <select id="user-role" v-model="userRole" required>
        <option value="">Select a role</option>
        <option value="Admin">Admin</option>
        <option value="Customer">Customer</option>
        <option value="Restaurant_Owner">Restaurant Owner</option>
        <option value="Delivery_Partner">Delivery Partner</option>
      </select>

      <!-- Submit button -->
      <button type="submit" :disabled="!isFormValid || loading">
        {{ loading ? "Signing up..." : "Sign Up" }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { toast } from "vue3-toastify";
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
      isPasswordValid: false, // Tracks password validation status
      dobValidationMessage: "", // Tracks Dob validation status
      passwordFocused: false,
    };
  },
  computed: {
    ...mapState("auth", ["loading", "error"]),
    // Form validation check
    isFormValid() {
      return (
        this.firstName &&
        this.countryCode &&
        this.phoneNumber &&
        this.email &&
        this.isPasswordValid &&
        this.dob &&
        this.userRole &&
        !this.dobValidationMessage
      );
    },
    showPasswordRequirements() {
      return this.passwordFocused || (this.password && !this.isPasswordValid);
    },
  },
  methods: {
    ...mapActions("auth", ["registerUser", "loginUser"]),

    // Validates password against specific criteria
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

    // Validates age against specific criteria

    validateAge() {
      if (this.dob) {
        const age = this.calculateAge(this.dob);
        if (age < 16) {
          this.dobValidationMessage =
            "You must be at least 16 years old to sign up.";
        } else {
          this.dobValidationMessage = "";
        }
      } else {
        this.dobValidationMessage = "";
      }
    },

    calculateAge(birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
      ) {
        age--;
      }
      return age;
    },
    handlePasswordBlur() {
      this.passwordFocused = false;
      this.validatePassword();
    },

    // Handles form submission
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

          // Register user and login automatically after successful signup
          await this.registerUser(userData);
          toast.success("Signed up successfully, Thankyou!!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          await this.loginUser({
            email: this.email,
            password: this.password,
            role_name: this.userRole,
          });

          // Load user info and redirect to dashboard
          await this.$store.dispatch("auth/loadUserFromDB");
          setTimeout(() => this.$router.replace("/dashboard"), 3000);
        } catch (error) {
          toast.success(error.response.data.message || "Error Occured", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
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
button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
.password-requirements {
  font-size: 0.8rem;
  color: #555;
}
.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}
</style>