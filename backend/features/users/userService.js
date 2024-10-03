const { createUser, findUserByEmailOrPhone } = require("./userRepository");
const { addUserRole, checkExistingUserRole } = require("./userRoleRepository");
const validator = require("validator");
const validatePassword = require('../../utils/passwordValidator')

module.exports.addOrUpdateUser = async (userDetails, role_name) => {
  try {
    if (!validator.isEmail(userDetails.email)) {
      throw new Error("Please enter correct email address");
    }
    if (validatePassword(userDetails.password).isValid !== true) {
      throw new Error(validatePassword(userDetails.password));
    }
    // Check if user already exists
    let user = await findUserByEmailOrPhone(userDetails.email, userDetails.phone_number);
    let isNewUser = false;
    let isNewRole = false;

    if (user) {
      // Check if user already has this role
      const existingRole = await checkExistingUserRole(user.uuid, role_name);
      if (existingRole) {
        return { user, isNewUser, isNewRole }; // User exists with this role
      }
      isNewRole = true; // Existing user, but new role
    } else {
      // Create new user
      user = await createUser(userDetails);
      isNewUser = true;
      isNewRole = true;
    }

    // Add new user role
    if (isNewRole) {
      await addUserRole(user.uuid, role_name);
    }

    return { user, isNewUser, isNewRole };
  } catch (error) {
    throw new Error(error.message || "Unable to process user registration at the moment");
  }
};

module.exports.findUserByEmailOrPhone = async (email, phone) => {
  try {
    const user = await findUserByEmailOrPhone(email, phone);
    return user;
  } catch (error) {
    console.error("Error in findUserByEmailOrPhone:", error);
    return null; // Return null instead of throwing an error
  }
};
