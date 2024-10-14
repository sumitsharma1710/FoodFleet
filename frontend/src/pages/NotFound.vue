<!-- <template>
    <div class="not-found-container">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>We couldn't find the page you were looking for.</p>
      <router-link to="/" class="home-link">Go back to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
  }
  </script>
  
  <style scoped>
  .not-found-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    font-family: Arial, sans-serif;
    background-color: #f8f9fa;
  }
  
  h1 {
    font-size: 8rem;
    margin-bottom: 0;
    color: #dc3545;
  }
  
  h2 {
    font-size: 2rem;
    margin-top: 0;
    color: #343a40;
  }
  
  p {
    font-size: 1.2rem;
    color: #6c757d;
    margin-bottom: 2rem;
  }
  
  .home-link {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }
  
  .home-link:hover {
    background-color: #0056b3;
  }
  </style> -->


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