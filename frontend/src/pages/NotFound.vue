<template>
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
  </style>