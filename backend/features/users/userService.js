const jwt = require('jsonwebtoken');
const { createUser, findUserByEmailOrPhone , findUserByEmailAndPhone } = require("./userRepository"); // Import user-related functions
const { addUserRole, checkExistingUserRole } = require("./userRoleRepository"); // Import user role-related functions
const validator = require("validator"); // Import validator library
const validatePassword = require('../../utils/passwordValidator'); // Import password validation utility
const validateNewUser = require('../../utils/newUser.js');
const CustomError = require('../../utils/customErrorHandling')

// Function to add or update user details
module.exports.addOrUpdateUser = async (userDetails, role_name) => {
  try {
    // Validate email format
    if (!validator.isEmail(userDetails.email)) {
      throw new CustomError("Please enter correct email address", 400);
    }
    // Validate password strength
    if (validatePassword(userDetails.password).isValid !== true) {
      throw new CustomError(validatePassword(userDetails.password), 400);
    }

    // Check if user already exists by email and phone
    let user = await findUserByEmailAndPhone(userDetails.email, userDetails.phone_number);
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
      // Create a new user 
      // checking if any other with the given phone number or email address already exits 
      let userCheck = await findUserByEmailOrPhone(userDetails.email, userDetails.phone_number);
      // if user found wanted to display that which one (email or password) already exists 
      if(userCheck){
        await validateNewUser(userCheck, userDetails);
      }
      // if no user exists creating a new user
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
    throw new CustomError(error.message || "DB Error : Server Side error", 500)
  }
};

// module.exports.getUserDetails = async (token)=>{
//   try{
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if(!decoded && !decoded.uuid){
//       throw new CustomError("Unable to fetch user details", );
//     }
//     else{
//       const user = await fetchUser(decoded.uuid);
//       if(!user){
//         throw new Error("user not found");
//       }
//       return user
//     }

//   }catch(error){
//     throw new CustomError(error.message || "DB Error : Server Side error", 500)
//   }
// }