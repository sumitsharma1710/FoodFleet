const { db } = require("../../models/dbConnection");
const { UserRole , Role} = db;

module.exports.getUserRole = async (userId, role_name) => {
  try {
    const role = await Role.findOne({
      where:{
        name: role_name
      }
    })
    const userRole = await UserRole.findOne({
      where: {
        user_uuid : userId,
        role_uuid : role.uuid
      },
    });
    return userRole;
  } catch (error) {
    throw new Error("Unable to identify user");
  }
};