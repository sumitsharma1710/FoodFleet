const { db } = require("../../models/dbConnection"); // Import database connection
const { UserRole, Role } = db; // Get UserRole and Role models from the database

// Function to add a role to a user
module.exports.addUserRole = async (userUuid, role_name) => {
  try {
    // Find the role by its name
    const role = await Role.findOne({
      where: {
        name: role_name
      },
      attributes: ['uuid'] // Select only the uuid attribute
    });

    // Throw error if role does not exist
    if (!role) {
      throw new Error(`Role with name ${role_name} not found`);
    }

    // Create a new UserRole entry
    const userRole = await UserRole.create({
      user_uuid: userUuid, // Associate the user UUID
      role_uuid: role.uuid // Associate the role UUID
    });
    return userRole; // Return the newly created user role
  } catch (error) {
    throw error; // Rethrow error if any operation fails
  }
};

// Function to check if a user already has a specific role
module.exports.checkExistingUserRole = async (userUuid, role_name) => {
  try {
    // Find the role by its name
    const role = await Role.findOne({
      where: {
        name: role_name
      },
      attributes: ['uuid'] // Select only the uuid attribute
    });

    // Throw error if role does not exist
    if (!role) {
      throw new Error(`Role with name ${role_name} not found`);
    }

    // Check if the user already has this role
    const existingRole = await UserRole.findOne({
      where: {
        user_uuid: userUuid, // Filter by user UUID
        role_uuid: role.uuid // Filter by role UUID
      }
    });
    return existingRole; // Return the existing role if found
  } catch (error) {
    throw error; // Rethrow error if any operation fails
  }
};
