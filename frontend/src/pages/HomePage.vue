<template>
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
</style>
