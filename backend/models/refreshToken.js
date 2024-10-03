'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    // Define associations here if needed
    static associate(models) {
      RefreshToken.belongsTo(models.User, {
        foreignKey: "user_uuid",
        onDelete: "CASCADE", // Delete refresh tokens when the user is deleted
      });
      RefreshToken.belongsTo(models.Role, {
        foreignKey: "role_uuid",
        onDelete: "CASCADE", // Delete refresh tokens when the role is deleted
      });
    }
  }
  RefreshToken.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_uuid: {
        type: DataTypes.UUID,
        allowNull: false, // Should not be null
        references: {
          model: "users", // Name of the User table
          key: "uuid", // Primary key in the User table
        },
        onDelete: "CASCADE",
      },
      role_uuid: {
        type: DataTypes.UUID,
        allowNull: false, // Should not be null
        references: {
          model: "roles", // Name of the Role table
          key: "uuid", // Primary key in the Role table
        },
        onDelete: "CASCADE",
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: false, // Should not be null
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false, // Should not be null
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      created_by: DataTypes.INTEGER,
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_by: DataTypes.INTEGER,
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: "RefreshToken",
      tableName: "refresh_tokens",
      timestamps: false,
    }
  );
  return RefreshToken;
};