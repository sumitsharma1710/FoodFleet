'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
      // associations can be defined here if needed
    }
  }
  UserRole.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_uuid: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'uuid'
      }
    },
    role_uuid: {
      type: DataTypes.UUID,
      references: {
        model: 'roles',
        key: 'uuid'
      }
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
  }, {
    sequelize,
    modelName: 'UserRole',
    tableName: 'user_roles',
    timestamps: false
  });
  return UserRole;
};