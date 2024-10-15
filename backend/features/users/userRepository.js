const { Op } = require("sequelize"); // Import Sequelize operators for query conditions
const { db } = require("../../models/dbConnection"); // Import database connection
const { User } = db; // Get User model from the database

// Function to create a new user in the database
module.exports.createUser = async (user) => {
    const newUser = await User.create(user); // Create and return the new user
    return newUser;
};

// Function to find a user by email and phone number
module.exports.findUserByEmailAndPhone = async (email, phone) => {
    const user = await User.findOne({
      where: {
        [Op.and]: [{ phone_number: phone }, { email: email }], // Query for matching phone or email
      },
    });
    return user; // Return found user
};

// Function to find a user by email or phone number
module.exports.findUserByEmailOrPhone = async (email, phone) => {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ phone_number: phone }, { email: email }], // Query for matching phone or email
      },
    });
    return user; // Return found user
};