<!-- <template>
  //Sign Up Form Container
  <div class="signup-container">
    <h2>Sign Up</h2>

    //Display error message if any
    //<div v-if="error" class="error-message">{{ error }}</div>

    //Form to handle user signup
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
      //Password requirements description
      <p class="password-requirements" v-if="showPasswordRequirements">
        Password must contain a lowercase letter, an uppercase letter, a number,
        a special character, and be at least 8 characters long.
      </p>
      //Show invalid password message
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

      //Submit button
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
          toast.error(error.response.data.message || "Error Occured", {
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
</style> -->




<!-- <template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-title class="text-center text-h5 py-4">
            Sign Up
          </v-card-title>
          <v-card-text>
            <v-form
              @submit.prevent="signupHandler"
              v-model="isFormValid"
              ref="form"
            >
              <v-text-field
                v-model="firstName"
                label="First Name*"
                :rules="[(v) => !!v || 'First Name is required']"
                required
              ></v-text-field>

              <v-text-field v-model="lastName" label="Last Name"></v-text-field>

              <v-row>
                <v-col cols="4">
                  <v-select
                    v-model="countryCode"
                    :items="countryCodes"
                    label="Code*"
                    item-title="text"
                    item-value="value"
                    :rules="[(v) => !!v || 'Country code is required']"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="phoneNumber"
                    label="Phone Number*"
                    type="tel"
                    :rules="phoneRules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                v-model="email"
                label="Email*"
                type="email"
                :rules="[
                  (v) => !!v || 'Email is required',
                  (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
                ]"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password*"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                @input="validatePassword"
                @focus="passwordFocused = true"
                @blur="handlePasswordBlur"
                :rules="[(v) => !!v || 'Password is required']"
                required
              ></v-text-field>

              <v-alert
                v-if="showPasswordRequirements"
                type="info"
                dense
                outlined
              >
                Password must contain a lowercase letter, an uppercase letter, a
                number, a special character, and be at least 8 characters long.
              </v-alert>
              //
              <v-alert
                v-if="!isPasswordValid && password"
                type="error"
                dense
                outlined
              >
                Invalid password
              </v-alert> 

              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-date-input
                    v-model="dob"
                    label="Date of Birth*"
                    v-bind="attrs"
                    v-on="on"
                    @blur="validateAge"
                    :rules="[(v) => !!v || 'Date of Birth is required']"
                    required
                  ></v-date-input>
                </template>
                <v-date-picker
                  v-model="dob"
                  :max="new Date().toISOString()"
                  min="1900-01-01"
                  @input="menu = false"
                  ></v-date-picker
                >
              </v-menu>

              <v-alert v-if="dobValidationMessage" type="error" dense outlined>
                {{ dobValidationMessage }}
              </v-alert>

              <v-select
                v-model="userRole"
                :items="userRoles"
                label="Sign up as*"
                item-title="text"
                item-value="value"
                :rules="[(v) => !!v || 'User role is required']"
                required
              ></v-select>

              <v-btn
                type="submit"
                color="primary"
                block
                :loading="loading"
                :disabled="!isFormValid || loading"
                class="mt-4"
              >
                {{ loading ? "Signing up..." : "Sign Up" }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      isPasswordValid: false,
      dobValidationMessage: "",
      passwordFocused: false,
      showPassword: false,
      menu: false,
      isFormValid: false,
      countryCodes: [
        { text: "+1", value: "+1" },
        { text: "+44", value: "+44" },
        { text: "+91", value: "+91" },
      ],
      userRoles: [
        { text: "Admin", value: "Admin" },
        { text: "Customer", value: "Customer" },
        { text: "Restaurant Owner", value: "Restaurant_Owner" },
        { text: "Delivery Partner", value: "Delivery_Partner" },
      ],
      phoneRules: [
        (v) => !!v || "Phone number is required",
        (v) => /^\d+$/.test(v) || "Phone number must contain only digits",
        (v) =>
          (v && v.length >= 8 && v.length <= 12) ||
          "Phone number must be between 8 and 12 digits",
      ],
    };
  },
  computed: {
    ...mapState("auth", ["loading", "error"]),
    showPasswordRequirements() {
      return this.passwordFocused || (this.password && !this.isPasswordValid);
    },
  },
  methods: {
    ...mapActions("auth", ["registerUser", "loginUser"]),

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

    async signupHandler() {
      if (this.$refs.form.validate()) {
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

          await this.registerUser(userData);
          toast.success("Signed up successfully, Thank you!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          await this.loginUser({
            email: this.email,
            password: this.password,
            role_name: this.userRole,
          });

          await this.$store.dispatch("auth/loadUserFromDB");
          setTimeout(() => this.$router.replace("/dashboard"), 3000);
        } catch (error) {
          toast.error(error.response.data.message || "Error Occurred", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        }
      }
    },
  },
};
</script> -->



<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-card-text class="pt-6">
            <div class="text-h5 text-center mb-4">Sign Up</div>
            <v-form ref="form" v-model="isFormValid" lazy-validation>
              <v-text-field
                v-model="firstName"
                :rules="firstNameRules"
                label="First Name*"
                required
              ></v-text-field>

              <v-text-field v-model="lastName" label="Last Name"></v-text-field>

              <v-row>
                <v-col cols="4">
                  <v-select
                    v-model="countryCode"
                    :items="countryCodes"
                    :rules="countryCodeRules"
                    label="Code*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="phoneNumber"
                    :rules="phoneRules"
                    label="Phone Number*"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email*"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Password*"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                required
              ></v-text-field>

              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset="0"
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-model="formattedDate"
                    label="Date of Birth*"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="props"
                    :rules="dobRules"
                    clearable
                    @click:clear="clearDate"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dob"
                  :max="maxDate"
                  :min="minDate"
                  @update:model-value="selectDate"
                ></v-date-picker>
              </v-menu>

              <v-select
                v-model="userRole"
                :items="roles"
                :rules="userRoleRules"
                label="Sign up as*"
                item-title="title"
                item-value="value"
                required
              ></v-select>

              <v-btn
                color="primary"
                class="mt-4"
                block
                :disabled="!isFormValid || loading"
                @click="signupHandler"
              >
                {{ loading ? "Signing up..." : "Sign Up" }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { toast } from "vue3-toastify";

export default {
  data() {
    return {
      isFormValid: false,
      firstName: "",
      lastName: "",
      countryCode: "",
      phoneNumber: "",
      email: "",
      password: "",
      dob: null,
      userRole: "",
      showPassword: false,
      menu: false,
      minDate: "1900-01-01",
      countryCodes: ["+1", "+44", "+91"],
      roles: [
        { title: "Admin", value: "Admin" },
        { title: "Customer", value: "Customer" },
        { title: "Restaurant Owner", value: "Restaurant_Owner" },
        { title: "Delivery Partner", value: "Delivery_Partner" },
      ],
    };
  },
  computed: {
    ...mapState("auth", ["loading"]),
    maxDate() {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 16);
      return date.toISOString().split("T")[0];
    },
    formattedDate() {
      if (!this.dob) return "";

      let date;
      if (typeof this.dob === "string") {
        // If dob is already a string, try to create a Date object
        date = new Date(this.dob);
      } else if (this.dob instanceof Date) {
        // If dob is already a Date object, use it directly
        date = this.dob;
      } else {
        // If dob is neither a string nor a Date, return an empty string
        return "";
      }

      // Format the date
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const year = date.getFullYear();

      return `${month}/${day}/${year}`;
    },
    firstNameRules() {
      return [(v) => !!v || "First name is required"];
    },
    countryCodeRules() {
      return [(v) => !!v || "Country code is required"];
    },
    phoneRules() {
      return [
        (v) => !!v || "Phone number is required",
        (v) => /^\d+$/.test(v) || "Phone number must only contain digits",
        (v) => v.length >= 8 || "Phone number must be at least 8 digits",
        (v) => v.length <= 12 || "Phone number must not exceed 12 digits",
      ];
    },
    emailRules() {
      return [
        (v) => !!v || "Email is required",
        (v) => /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v) || "Email must be valid",
      ];
    },
    passwordRules() {
      return [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Password must be at least 8 characters",
        (v) => /[A-Z]/.test(v) || "Password must contain an uppercase letter",
        (v) => /[a-z]/.test(v) || "Password must contain a lowercase letter",
        (v) => /\d/.test(v) || "Password must contain a number",
        (v) =>
          /[!@#$%&]/.test(v) ||
          "Password must contain a special (!,@,#,$,%,&) character",
      ];
    },
    dobRules() {
      return [
        (v) => !!v || "Date of Birth is required",
        (v) => {
          const birthDate = new Date(v);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();

          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }

          return age >= 16 || "You must be at least 16 years old";
        },
      ];
    },
    userRoleRules() {
      return [(v) => !!v || "User role is required"];
    },
  },
  methods: {
    ...mapActions("auth", ["registerUser", "loginUser"]),
    selectDate(date) {
      this.dob = date;
      this.menu = false;
    },
    clearDate() {
      this.dob = null;
      this.menu = false;
    },
    async signupHandler() {
      if (this.$refs.form.validate()) {
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

          await this.registerUser(userData);
          await this.loginUser({
            email: this.email,
            password: this.password,
            role_name: this.userRole,
          });

          await this.$store.dispatch("auth/loadUserFromDB");

          toast.success("Signed up successfully, Thank you!", {
            autoClose: 1500,
            pauseOnHover: true,
            position: "top-right",
            hideProgressBar: true,
            theme: "colored",
          });
          setTimeout(() => this.$router.replace("/dashboard"), 2000);
        } catch (error) {
          toast.error(error.response?.data?.message || "Login failed", {
            autoClose: 3000,
            pauseOnHover: true,
            position: "top-right",
            hideProgressBar: true,
            theme: "colored",
          });
        }
      }
    },
  },
};
</script>



