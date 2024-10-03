const { Op } = require("sequelize");
const { db } = require("../../models/dbConnection");
const { User } = db;

module.exports.createUser = async (user) => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    throw error;
  }
};

module.exports.findUserByEmailOrPhone = async (email, phone) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ phone_number: phone }, { email: email }],
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};