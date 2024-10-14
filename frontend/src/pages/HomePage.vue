<!-- <template>
  <div>
    <section class="hero">
      <h1>Delicious Food Delivered</h1>
      <p>
        From local favorites to international cuisine, get it delivered to your
        doorstep.
      </p>
      <a href="#" class="cta-button">Order Now</a>
    </section>

    <section class="features">
      <div class="feature">
        <h2>Fast Delivery</h2>
        <p>Get your food delivered within 30 minutes or it's free!</p>
      </div>
      <div class="feature">
        <h2>Wide Selection</h2>
        <p>Choose from over 1000+ restaurants in your area.</p>
      </div>
      <div class="feature">
        <h2>Best Prices</h2>
        <p>Enjoy special deals and discounts on your favorite meals.</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.hero {
  background-color: #ff6b6b;
  color: white;
  padding: 4rem 5%;
  text-align: center;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.cta-button {
  background-color: #4caf50;
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
}

.features {
  padding: 4rem 5%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.feature {
  flex: 1;
  min-width: 250px;
  margin: 1rem;
  text-align: center;
}

.feature h2 {
  margin-bottom: 1rem;
  color: #333;
}
</style> -->



<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0">
        <v-row no-gutters>
          <v-col cols="12">
            <v-sheet
              color="#ff6b6b"
              dark
              class="text-center pa-12"
            >
              <h1 class="text-h3 font-weight-bold mb-4">Delicious Food Delivered</h1>
              <p class="text-h6 mb-6">
                From local favorites to international cuisine, get it delivered to your doorstep.
              </p>
              <v-btn
                color="green"
                x-large
                rounded
                class="font-weight-bold"
                href="#"
              >
                Order Now
              </v-btn>
            </v-sheet>
          </v-col>
        </v-row>

        <v-row class="pa-6">
          <v-col
            v-for="(feature, index) in features"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card
              class="text-center pa-4 mx-auto"
              max-width="400"
              height="100%"
            >
              <v-card-title class="justify-center text-h5 mb-2">
                {{ feature.title }}
              </v-card-title>
              <v-card-text>
                <p>{{ feature.description }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          title: 'Fast Delivery',
          description: 'Get your food delivered within 30 minutes or it\'s free!'
        },
        {
          title: 'Wide Selection',
          description: 'Choose from over 1000+ restaurants in your area.'
        },
        {
          title: 'Best Prices',
          description: 'Enjoy special deals and discounts on your favorite meals.'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Custom styles can be added here if needed */
</style>