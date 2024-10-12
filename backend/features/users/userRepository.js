const { Op } = require("sequelize"); // Import Sequelize operators for query conditions
const { db } = require("../../models/dbConnection"); // Import database connection
const { User } = db; // Get User model from the database
// const CustomError = require('../../utils/customErrorHandling')

// Function to create a new user in the database
module.exports.createUser = async (user) => {
  // try {
    const newUser = await User.create(user); // Create and return the new user
    return newUser;
  // } catch (error) {
  //   // next(new CustomError(error.message || "DB Error : Unable to create user", 500)); // Handle errors
  //   throw new CustomError(error.message || "DB Error : Unable to create user", 500); // Handle errors
  // }
};

// Function to find a user by email or phone number
module.exports.findUserByEmailAndPhone = async (email, phone) => {
  // try {
    const user = await User.findOne({
      where: {
        [Op.and]: [{ phone_number: phone }, { email: email }], // Query for matching phone or email
      },
    });
    return user; // Return found user
  // } catch (error) {
  //   // next(new CustomError(error.message || "DB Error : Unable to identify user", 500)); // Handle errors
  //   throw new CustomError(error.message || "DB Error : Unable to identify user", 500); // Handle errors
  // }
};

module.exports.findUserByEmailOrPhone = async (email, phone) => {
  // try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ phone_number: phone }, { email: email }], // Query for matching phone or email
      },
    });
    return user; // Return found user
  // } catch (error) {
  //   // next(new CustomError(error.message || "DB Error : Unable to identify user", 500))  // Handle errors
  //   throw new CustomError(error.message || "DB Error : Unable to identify user", 500); // Handle errors
  // }
};


module.exports.fetchUser = async(userUuid)=>{
  // try {
    const user = await User.findOne({
      where: {
        uuid : userUuid
      }
    });
    return user; // Return found user
  // } catch (error) {
  //   // next( new CustomError(error.message || "DB Error : Unable to identify user", 500)); // Handle errors
  //   throw new CustomError(error.message || "DB Error : Unable to identify user", 500); // Handle errors
  // }
}
