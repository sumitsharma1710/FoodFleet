const { createUser, findUserByEmailOrPhone } = require("./userRepository"); // Import user-related functions
const { addUserRole, checkExistingUserRole } = require("./userRoleRepository"); // Import user role-related functions
const validator = require("validator"); // Import validator library
const validatePassword = require('../../utils/passwordValidator'); // Import password validation utility

// Function to add or update user details
module.exports.addOrUpdateUser = async (userDetails, role_name) => {
  try {
    // Validate email format
    if (!validator.isEmail(userDetails.email)) {
      throw new Error("Please enter correct email address");
    }
    // Validate password strength
    if (validatePassword(userDetails.password).isValid !== true) {
      throw new Error(validatePassword(userDetails.password));
    }

    // Check if user already exists by email or phone
    let user = await findUserByEmailOrPhone(userDetails.email, userDetails.phone_number);
    let isNewUser = false; // Flag for new user status
    let isNewRole = false; // Flag for new role status

    if (user) {
      // Check if the existing user already has the specified role
      const existingRole = await checkExistingUserRole(user.uuid, role_name);
      if (existingRole) {
        return { user, isNewUser, isNewRole }; // Return if user exists with this role
      }
      isNewRole = true; // Existing user, but assigning a new role
    } else {
      // Create a new user if none exists
      user = await createUser(userDetails);
      isNewUser = true; // Set flag indicating a new user
      isNewRole = true; // Also a new role for the new user
    }

    // Assign the new role to the user if applicable
    if (isNewRole) {
      await addUserRole(user.uuid, role_name);
    }

    return { user, isNewUser, isNewRole }; // Return user and status flags
  } catch (error) {
    // Throw error if user registration process fails
    throw new Error(error.message || "Unable to process user registration at the moment");
  }
};

// Function to find user by email or phone, returning null if not found
module.exports.findUserByEmailOrPhone = async (email, phone) => {
  try {
    const user = await findUserByEmailOrPhone(email, phone); // Check for user by email or phone
    return user; // Return found user
  } catch (error) {
    console.error("Error in findUserByEmailOrPhone:", error); // Log error for debugging
    return null; // Return null instead of throwing an error
  }
};
