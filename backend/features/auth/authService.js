const crypto = require('crypto'); // Import crypto module for hashing
const { findUserByEmail, 
  findUser, 
  storeRefreshToken, 
  removeRefreshToken, 
  findRefreshToken, 
  updateRefreshToken, 
  findUserByResetToken } = require("./authRepository"); // Import user-related repository functions
const { getUserRole } = require("./authRoleRepository"); // Import user role repository function
const CustomError = require('../../utils/customErrorHandling')

// Handle user login
module.exports.loginUser = async (user) => {
  try {
    const userDetails = await findUser(user); // Find user by credentials

    if (!userDetails) {
      throw new CustomError("User doesn't exist with this email, Please sign up!", 404); // User not found
    }
    if (!(await userDetails.validatePassword(user.password))) {
      throw new CustomError("Incorrect password", 400); // Invalid password
    }
    
    const userRole = await getUserRole(userDetails.uuid, user.role_name); // Get user role

    if (!userRole) {
      throw new CustomError("User doesn't exist, With this role", 404); // User not found with this role
    }

    const { accessToken, refreshToken, refreshTokenExpiresAt } = await userDetails.generateAuthToken(
      userRole.role_uuid // Generate auth tokens
    );

    // Check if the refresh token already exists
    const existingToken = await findRefreshToken(userDetails.uuid, userRole.role_uuid);
    
    if (existingToken) {
      // Update the existing refresh token in the database
      await updateRefreshToken(userDetails.uuid, userRole.role_uuid, refreshToken, refreshTokenExpiresAt);
    } else {
      // Store new refresh token in the database
      await storeRefreshToken(userDetails.uuid, userRole.role_uuid, refreshToken, refreshTokenExpiresAt);
    }
    
    return { userDetails, accessToken, refreshToken, refreshTokenExpiresAt }; // Return user details and tokens
  } catch (error) {
    throw new CustomError(error.message || "DB Error : Server Side error", 500);
  }
};

// Handle user logout
module.exports.logoutUser = async (refreshToken) => {
  try {
    await removeRefreshToken(refreshToken); // Remove refresh token from the database
  } catch (error) {
    throw new CustomError(error.message || "DB Error : Server Side error", 500);
  }
};

// Handle password recovery request
module.exports.forgotPasswordService = async (email) => {
  try {
    const user = await findUserByEmail(email); // Find user by email
    
    if (!user) {
      throw new CustomError("No user found with this email address", 404); // User not found
    }
    
    // Generate password reset token
    const resetToken = user.createPasswordResetToken();
    await user.save(); // Save user with the reset token
    
    return resetToken; // Return the reset token
  } catch (error) {
    throw new CustomError(error.message || "DB Error : Server Side error", 500);
  }
};

// Handle password reset using the token
module.exports.resetPasswordService = async (token, newPassword) => {
  try {
    // Hash token to compare with stored hashed token
    const hashedToken = crypto
      .createHash('sha256') // Create SHA-256 hash
      .update(token) // Update with the token
      .digest('hex'); // Convert to hex format
      
    const user = await findUserByResetToken(hashedToken); // Find user by hashed token
    
    if (!user) {
      throw new Error("Invalid or expired reset token"); // Token is invalid or expired
    }
    
    user.password = newPassword; // Set new password
    user.reset_password_token = null; // Clear reset token
    user.reset_password_token_expires_at = null; // Clear expiration
    
    await user.save(); // Save updated user details
    
    return true; // Return success
  } catch (error) {
    throw new CustomError(error.message || "DB Error : Server Side error", 500);
  }
};
