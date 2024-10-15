<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-title class="text-center text-h5 py-4">
            Forgot Password
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleForgotPassword">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
                prepend-icon="mdi-email"
                :rules="[
                  (v) => !!v || 'Email is required',
                  (v) =>
                    /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v) ||
                    'Email must be valid',
                ]"
              ></v-text-field>
              <v-card-text class="text-caption text-grey">
                Enter the email to get the reset password link
              </v-card-text>
              <v-btn
                type="submit"
                color="primary"
                block
                :loading="loading"
                :disabled="!email || loading"
                class="mt-2"
              >
                {{ loading ? "Sending..." : "Reset Password" }}
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions v-if="resetSuccess">
            <v-btn color="primary" text block to="/login"> Log In </v-btn>
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
      resetSuccess: false,
    };
  },
  computed: {
    ...mapState("auth", ["loading"]),
  },
  methods: {
    ...mapActions("auth", ["forgotPassword"]),

    async handleForgotPassword() {
      try {
        const response = await this.forgotPassword(this.email);
        if (response.status === "Success") {
          toast.success("Reset password link sent to your email.", {
            autoClose: 2000,
            pauseOnHover: true,
            position: "top-right",
            hideProgressBar: true,
            theme: "colored",
          });
          this.resetSuccess = true;
        } else {
          toast.error("An error occurred. Please try again.", {
            autoClose: 3000,
            pauseOnHover: true,
            position: "top-right",
            hideProgressBar: true,
            theme: "colored",
          });
        }
      } catch (error) {
        toast.error(error || "An error occurred. Please try again.", {
          autoClose: 3000,
          pauseOnHover: true,
          position: "top-right",
          hideProgressBar: true,
          theme: "colored",
        });
      }
    },
  },
};
</script>