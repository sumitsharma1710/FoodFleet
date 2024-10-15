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

              <v-text-field
                v-model="lastName"
                :rules="lastNameRules"
                label="Last Name"
              ></v-text-field>

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
                @click:append-inner="showPassword = !showPassword"
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

              <v-card-actions class="justify-center pt-4 pb-4">
                Already a User?
                <v-btn text small color="primary" to="/login"> Login </v-btn>
              </v-card-actions>
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
      countryCode: null,
      phoneNumber: "",
      email: "",
      password: "",
      dob: null,
      userRole: null,
      showPassword: false,
      menu: false,
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
      return [
        (v) => !!v || "First name is required",
        (v) => (v && /^[A-Za-z]+$/.test(v)) || "First name should only contain alphabates"
        
      ];
    },
    lastNameRules() {
      return [
        (v) => (/^[A-Za-z]+$/.test(v)) || "Last name should only contain alphabates"
      ];
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
        (v) =>
          /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v) ||
          "Email must be valid",
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
          /[!@#$%&_-]/.test(v) ||
          "Password must contain a special (!,@,#,$,%,&,_,-) character",
        (v) => !/\s/.test(v) || "Password cannot contain spaces",
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




