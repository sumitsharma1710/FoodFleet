// Importing required modules
const express = require('express'); 
const cookieParser = require("cookie-parser"); 
const cors = require('cors'); 
const { checkConnection } = require("./models/dbConnection"); 
const userApi = require("./features/users/userApi"); 
const authApi = require("./features/auth/authApi"); 

// Creating an instance of the Express application
const app = express();

// Using middleware cors to accept requests from the frontend
app.use(cors({
  credentials: true, // Allow credentials (like cookies) to be sent
  origin: "http://localhost:8080" // Specify the frontend origin
}));

// Using cookieParser middleware to parse cookies from requests
app.use(cookieParser());

// Middleware to parse JSON request bodies
app.use(express.json());

// Registering API routes
app.use(userApi);
app.use(authApi);

// Setting up a basic route for the root URL
app.get("/", (req, res) => {
  res.send("Working on user authentication"); 
});

// Starting the server and listening on a specified port
app.listen(process.env.PORT || 8010, (req, res) => {
  checkConnection(); // Checking the database connection
  // console.log(process.env.PUBLIC_KEY_PEM);
  console.log('App is running on port: ' + (process.env.PORT || 8010)); // Logging the running port
});
