'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      this.belongsToMany(models.User, { through: 'UserRoles', foreignKey: 'role_uuid', otherKey: 'user_uuid' });
    }
  }
  Role.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
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
    modelName: 'Role',
    tableName: 'roles',
    timestamps: false
  });
  return Role;
};