const { Sequelize} = require("sequelize");

const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

// =================== Establishing connection with database =======================
const connection = new Sequelize(database, user, password, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = connection;



db.User = require("./users.js")(connection, Sequelize);
db.Role = require("./role.js")(connection, Sequelize);
db.UserRole = require("./userRole.js")(connection, Sequelize);
db.RefreshToken = require('./refreshToken.js')(connection, Sequelize);

// =================== Authenticating connection with database =======================
const checkConnection = async () => {
  try {
    await connection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = { db, checkConnection };