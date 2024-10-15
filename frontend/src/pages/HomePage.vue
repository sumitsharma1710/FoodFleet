<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0">
        <v-row no-gutters>
          <v-col cols="12">
            <v-sheet color="#ff6b6b" dark class="text-center pa-12">
              <h1 class="text-h3 font-weight-bold mb-4">
                Delicious Food Delivered
              </h1>
              <p class="text-h6 mb-6">
                From local favorites to international cuisine, get it delivered
                to your doorstep.
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
          title: "Fast Delivery",
          description:
            "Get your food delivered within 30 minutes or it's free!",
        },
        {
          title: "Wide Selection",
          description: "Choose from over 1000+ restaurants in your area.",
        },
        {
          title: "Best Prices",
          description:
            "Enjoy special deals and discounts on your favorite meals.",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>