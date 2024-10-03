const { db } = require("../../models/dbConnection");
const { User, RefreshToken } = db;

module.exports.findUser = async (user) => {
  try {
    const userDetails = await User.findOne({
      where: { email: user.email },
      attributes: [
        "first_name",
        "password",
        "uuid",
        "last_name",
        "email",
      ],
    });
    return userDetails;
  } catch (error) {
    throw new Error("Unable to fetch user");
  }
};

module.exports.storeRefreshToken = async (userUuid, roleUuid, refreshToken, expiresAt) => {
  try {
    const token = await RefreshToken.create({
      user_uuid: userUuid,
      role_uuid: roleUuid,
      refresh_token: refreshToken,
      expires_at: expiresAt,
    });
    return token;
  } catch (error) {
    throw new Error("Unable to store refresh token");
  }
};

module.exports.removeRefreshToken = async (refreshToken) => {
  try {
    await RefreshToken.destroy({
      where: { refresh_token: refreshToken },
    });
  } catch (error) {
    throw new Error("Unable to remove refresh token");
  }
};

module.exports.findRefreshToken = async (userUuid, roleUuid) => {
  try {
    const refreshToken = await RefreshToken.findOne({
      where: {
        user_uuid: userUuid,
        role_uuid: roleUuid,
      },
    });
    return refreshToken;
  } catch (error) {
    throw new Error("Unable to find refresh token");
  }
};

module.exports.updateRefreshToken = async (userUuid, roleUuid, newRefreshToken, expiresAt) => {
  try {
    await RefreshToken.update(
      { refresh_token: newRefreshToken, expires_at: expiresAt },
      {
        where: {
          user_uuid: userUuid,
          role_uuid: roleUuid,
        },
      }
    );
  } catch (error) {
    throw new Error("Unable to update refresh token");
  }
};



module.exports.findUserByEmail = async (email) => {
  try {
    return await User.findOne({
      where: { email, is_deleted: false }
    });
  } catch (error) {
    throw new Error("Unable to fetch user");
  }
};


module.exports.findUserByResetToken = async (hashedToken) => {
  try {
    return await User.findOne({
      where: {
        reset_password_token: hashedToken,
        reset_password_token_expires_at: {
          [db.Sequelize.Op.gt]: new Date()
        },
        is_deleted: false
      }
    });
  } catch (error) {
    throw new Error("Unable to verify reset token");
  }
};

