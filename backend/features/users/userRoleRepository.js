const { db } = require("../../models/dbConnection");
const { UserRole, Role } = db;

module.exports.addUserRole = async (userUuid, role_name) => {

  try {
    const role = await Role.findOne({
      where: {
        name: role_name
      },
      attributes: ['uuid']
    });

    if (!role) {
      throw new Error(`Role with name ${role_name} not found`);
    }

    const userRole = await UserRole.create({
      user_uuid: userUuid,
      role_uuid: role.uuid
    });
    return userRole;
  } catch (error) {
    throw error;
  }
};

module.exports.checkExistingUserRole = async (userUuid, role_name) => {
  try {
    const role = await Role.findOne({
      where: {
        name: role_name
      },
      attributes: ['uuid']
    });

    if (!role) {
      throw new Error(`Role with name ${role_name} not found`);
    }

    const existingRole = await UserRole.findOne({
      where: {
        user_uuid: userUuid,
        role_uuid: role.uuid
      }
    });
    return existingRole;
  } catch (error) {
    throw error;
  }
};