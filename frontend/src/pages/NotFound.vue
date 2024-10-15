<template>
    <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4" class="text-center">
          <v-card elevation="5" class="pa-6">
            <v-card-title class="text-h1 error--text mb-2">404</v-card-title>
            <v-card-subtitle class="text-h4 mb-4">Oops! Page Not Found</v-card-subtitle>
            <v-card-text class="text-body-1 mb-6">We couldn't find the page you were looking for.</v-card-text>
            <v-btn
              color="primary"
              to="/"
              large
              class="px-6" 
            >
              Go back to Home
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
  }
  </script>
  
  <style scoped>
  .fill-height {
    height: 100vh;
  }
  </style>