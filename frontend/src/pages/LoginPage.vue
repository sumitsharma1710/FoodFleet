<template>
  <v-container fluid fill-height class="pa-10">
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-text class="pt-6">
            <div class="text-h5 text-center mb-4">Login</div>
            <v-form
              @submit.prevent="loginHandler"
              v-model="isFormValid"
              ref="form"
            >
              <v-text-field
                v-model.trim="email"
                label="Email"
                type="email"
                required
                prepend-inner-icon="mdi-email"
                dense
                :rules="[
                  (v) => !!v || 'Email is required',
                  (v) =>
                    /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v) ||
                    'Email must be valid',
                ]"
              ></v-text-field>

              <v-text-field
                v-model.trim="password"
                label="Password"
                variant="outlined"
                :type="showPassword ? 'text' : 'password'"
                required
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword = !showPassword"
                dense
                :rules="[(v) => !!v || 'Password is required']"
              ></v-text-field>

              <v-select
                v-model="roleType"
                :items="roles"
                label="Select Role"
                required
                prepend-inner-icon="mdi-account"
                dense
                :rules="[(v) => !!v || 'Role is required']"
              ></v-select>

              <v-btn
                type="submit"
                color="primary"
                block
                :disabled="!isFormValid"
                :loading="loading"
                class="mt-2"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions class="pt-0 pb-2 px-4 justify-end">
            <v-btn text small color="primary" to="/forgotPassword">
              Forgot Password?
            </v-btn>
          </v-card-actions>

          <v-card-actions class="justify-center pt-0 pb-4">
            New User?
            <v-btn text small color="primary" to="/signup"> Sign Up </v-btn>
          </v-card-actions>
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
      email: "",
      password: "",
      roleType: null,
      showPassword: false,
      isFormValid: false,
      roles: ["Admin", "Customer", "Restaurant Owner", "Delivery Partner"],
    };
  },
  computed: {
    ...mapState("auth", ["loading", "error"]),
  },
  methods: {
    ...mapActions("auth", ["loginUser"]),

    async loginHandler() {
      if (this.$refs.form.validate()) {
        try {
          await this.loginUser({
            email: this.email,
            password: this.password,
            role_name: this.getRoleValue(this.roleType),
          });
          this.$store.dispatch("auth/loadUserFromDB");
          setTimeout(() => {
            toast.success("Logged in successfully", {
              autoClose: 1500,
              pauseOnHover: true,
              position: "top-right",
              hideProgressBar: true,
              theme: "colored",
            });
          }, 100);
          this.$router.replace("/dashboard");
        } catch (error) {
          toast.error(error.response?.data?.message || "Login failed", {
            autoClose: 1500,
            pauseOnHover: true,
            position: "top-right",
            hideProgressBar: true,
            theme: "colored",
          });
        }
      }
    },
    getRoleValue(role) {
      const roleMap = {
        Admin: "Admin",
        Customer: "Customer",
        "Restaurant Owner": "Restaurant_Owner",
        "Delivery Partner": "Delivery_Partner",
      };
      return roleMap[role] || role;
    },
  },
};
</script>

