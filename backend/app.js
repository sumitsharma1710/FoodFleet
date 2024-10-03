const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors')

const { checkConnection } = require("./models/dbConnection");
// const logger = require("./src/middleware/log");
const userApi = require("./features/users/userApi");
const authApi = require("./features/auth/authApi");

const app = express();
app.use(cors({
  credentials:true,
  origin:"http://localhost:8080"
}))
app.use(cookieParser());

app.use(express.json());

app.use(userApi);
app.use(authApi);


app.get("/", (req, res) => {
  res.send("Working on user authentication");
});


app.listen(process.env.PORT || 8010 , (req, res)=>{
    checkConnection();
    console.log('App is running on port : '+ process.env.PORT);

})