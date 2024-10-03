'use strict';
const { Model } = require('sequelize');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Role, { through: 'UserRoles', foreignKey: 'user_uuid', otherKey: 'role_uuid' });
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    country_code: DataTypes.STRING,
    phone_number: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    dob: DataTypes.DATE,
    reset_password_token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reset_password_token_expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    created_by: DataTypes.UUID,
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_by: DataTypes.UUID,
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });

  User.addHook("beforeCreate", async (user) => {
    user.password = await bcrypt.hash(user.password, 8);
  });

  User.addHook("beforeUpdate", async (user) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
  });

  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  User.prototype.generateAuthToken = async function (role_uuid) {
    try {
      const user = this;
      const accessToken = jwt.sign(
        { uuid: user.uuid, role_uuid: role_uuid },
        process.env.JWT_SECRET,
        { expiresIn: parseInt(process.env.ACCESS_TOKEN_EXP)}
      );
      const refreshToken = jwt.sign(
        { uuid: user.uuid, role_uuid: role_uuid },
        process.env.JWT_SECRET,
        { expiresIn: parseInt(process.env.REFRESH_TOKEN_EXP)}
      );
      const refreshTokenExpiresAt = new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_EXP));

      return { accessToken, refreshToken, refreshTokenExpiresAt };
    } catch (error) {
      throw new Error("Unable to authenticate!");
    }
  };


  User.prototype.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    this.reset_password_token = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    
    this.reset_password_token_expires_at = new Date(Date.now() + 3600000); // 1h
    
    return resetToken;
  };

  return User;
};