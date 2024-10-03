const { addOrUpdateUser } = require("./userService"); // Import user service for adding or updating user

module.exports.registerUser = async (req, res) => {
  try {
    // Destructure required fields from request body
    const { first_name, last_name, email, country_code, phone_number, password, dob, role_name } = req.body;

    // Validate required fields
    if (!first_name || !email || !country_code || !phone_number || !password || !dob || !role_name) {
      return res.status(400).json({
        status: "Failure",
        message: "Missing Required Fields!",
      });
    }

    // Attempt to add or update user
    const { user, isNewUser, isNewRole } = await addOrUpdateUser({ 
      first_name, last_name, email, country_code, phone_number, password, dob 
    }, role_name);

    // Respond based on user and role creation status
    if (isNewUser) {
      res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: { user: { firstName: user.first_name, lastName: user.last_name, email: user.email } },
      });
    } else if (isNewRole) {
      res.status(200).json({
        status: "success",
        message: "New role added to existing user",
        data: { user: { firstName: user.first_name, lastName: user.last_name, email: user.email } },
      });
    } else {
      res.status(400).json({
        status: "Failure",
        message: "User already exists with this email and role",
      });
    }
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({
      status: "Fail",
      message: error.message || "Sorry, Internal server error!",
    });
  }
};
