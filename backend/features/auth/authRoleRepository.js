const { db } = require("../../models/dbConnection"); // Import database connection
const { UserRole, Role } = db; // Import UserRole and Role models

// Get the role associated with a user
module.exports.getUserRole = async (userId, role_name) => {
  try {
    // Find the role by its name
    const role = await Role.findOne({
      where: {
        name: role_name // Filter by role name
      }
    });
    
    // Find the user-role association
    const userRole = await UserRole.findOne({
      where: {
        user_uuid: userId, // Filter by user ID
        role_uuid: role.uuid // Filter by role ID
      },
    });
    
    return userRole; // Return the user-role association
  } catch (error) {
    throw new Error("Unable to identify user"); // Handle errors
  }
};
