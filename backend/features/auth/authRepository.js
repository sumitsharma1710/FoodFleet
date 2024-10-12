const { db } = require("../../models/dbConnection"); // Import database connection
const { User, RefreshToken } = db; // Import User and RefreshToken models

// Find a user by email
module.exports.findUser = async (user) => {
  // Fetch user details based on email
  const userDetails = await User.findOne({
    where: { email: user.email },
    attributes: ["first_name", "password", "uuid", "last_name", "email"],
  });
  return userDetails; // Return user details
};

// Store a new refresh token
module.exports.storeRefreshToken = async (
  userUuid,
  roleUuid,
  refreshToken,
  expiresAt
) => {
  // Create a new refresh token entry in the database
  const token = await RefreshToken.create({
    user_uuid: userUuid,
    role_uuid: roleUuid,
    refresh_token: refreshToken,
    expires_at: expiresAt,
  });
  return token; // Return the stored token
};

// Remove an existing refresh token
module.exports.removeRefreshToken = async (refreshToken) => {
  // Delete the refresh token from the database
  return await RefreshToken.destroy({
    where: { refresh_token: refreshToken },
  });
};

// Find a refresh token for a user
module.exports.findRefreshToken = async (userUuid, roleUuid) => {
  // Retrieve the refresh token based on user and role UUIDs
  const refreshToken = await RefreshToken.findOne({
    where: {
      user_uuid: userUuid,
      role_uuid: roleUuid,
    },
  });
  return refreshToken; // Return the found token
};

// Update an existing refresh token
module.exports.updateRefreshToken = async (
  userUuid,
  roleUuid,
  newRefreshToken,
  expiresAt
) => {
  // Update the refresh token and its expiration date in the database
  return await RefreshToken.update(
    { refresh_token: newRefreshToken, expires_at: expiresAt },
    {
      where: {
        user_uuid: userUuid,
        role_uuid: roleUuid,
      },
    }
  );
};

// Find a user by email, ensuring they are not deleted
module.exports.findUserByEmail = async (email) => {
  return await User.findOne({
    where: { email, is_deleted: false }, // Check if the user is not deleted
  });
};

// Find a user by reset token
module.exports.findUserByResetToken = async (hashedToken) => {
  return await User.findOne({
    where: {
      reset_password_token: hashedToken,
      reset_password_token_expires_at: {
        [db.Sequelize.Op.gt]: new Date(), // Check if token is still valid
      },
      is_deleted: false, // Ensure the user is not deleted
    },
  });
};
