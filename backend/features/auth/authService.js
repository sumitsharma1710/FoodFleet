const crypto = require('crypto');
const { findUserByEmail, 
  findUserByResetToken, 
  findUser, 
  storeRefreshToken, 
  removeRefreshToken, 
  findRefreshToken, 
  updateRefreshToken} = require("./authRepository");
const { getUserRole } = require("./authRoleRepository");

module.exports.loginUser = async (user) => {
  try {
    const userDetails = await findUser(user);

    if (!userDetails) {
      throw new Error("User doesn't exist, Please sign up!");
    }
    if (!(await userDetails.validatePassword(user.password))) {
      throw new Error("Incorrect password");
    }
    
    const userRole = await getUserRole(userDetails.uuid, user.role_name);
    const { accessToken, refreshToken, refreshTokenExpiresAt } = await userDetails.generateAuthToken(
      userRole.role_uuid
    );

    // Check if the refresh token already exists
    const existingToken = await findRefreshToken(userDetails.uuid, userRole.role_uuid);
    
    if (existingToken) {
      // Update the existing refresh token
      await updateRefreshToken(userDetails.uuid, userRole.role_uuid, refreshToken, refreshTokenExpiresAt);
    } else {
    // Store refresh token in the database
      await storeRefreshToken(userDetails.uuid, userRole.role_uuid, refreshToken, refreshTokenExpiresAt);
    }
    
    return { userDetails, accessToken, refreshToken, refreshTokenExpiresAt };
  } catch (error) {
    throw new Error(error.message || "Unable to login user");
  }
};

module.exports.logoutUser = async (refreshToken) => {
  try {
    await removeRefreshToken(refreshToken);
  } catch (error) {
    throw new Error("Unable to logout user");
  }
};


module.exports.forgotPasswordService = async (email) => {
  try {
    const user = await findUserByEmail(email);
    
    if (!user) {
      throw new Error("No user found with this email address");
    }
    
    // Generate reset token
    const resetToken = user.createPasswordResetToken();
    await user.save();
    
    return resetToken;
  } catch (error) {
    throw new Error(error.message || "Unable to process forgot password request");
  }
};

module.exports.resetPasswordService = async (token, newPassword) => {
  try {
    // Hash token to compare with stored hashed token
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
      
    const user = await findUserByResetToken(hashedToken);
    
    if (!user) {
      throw new Error("Invalid or expired reset token");
    }
    
    user.password = newPassword;
    user.reset_password_token = null;
    user.reset_password_token_expires_at = null;
    
    await user.save();
    
    return true;
  } catch (error) {
    throw new Error(error.message || "Unable to reset password");
  }
};

