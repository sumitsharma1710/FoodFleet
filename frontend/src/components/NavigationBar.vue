<template>
  <header>
    <nav>
      <div class="logo"><router-link to="/">FoodFleet</router-link></div>
      <div class="nav-links">
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Signup</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
header {
  background-color: #ff6b6b;
  color: white;
  padding: 1rem 5%;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.logo a {
    color: white;
    text-decoration: none;
}

.nav-links a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
}
</style>
