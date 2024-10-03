<template>
  <div class="login-container">
    <h2>Login</h2>
    <form>
      <input type="email" placeholder="Email" required />
      <p class="email-requirements">
        Enter the email to get the reset password link
      </p>
      <button type="submit">Reset Password</button>
    </form>
  </div>
</template>
    
    
<script>
export default {};
</script>


<style scoped>
body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}
.login-container {
  margin: auto;
  margin-top: 10%;
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}
h2 {
  text-align: center;
  color: #333;
}
form {
  display: flex;
  flex-direction: column;
}
input {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
button:hover {
  background-color: #0056b3;
}
.email-requirements {
  font-size: 0.8rem;
  color: #666;
  margin-top: 5px;
}
</style>