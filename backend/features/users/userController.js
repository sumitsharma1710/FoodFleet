const { addOrUpdateUser } = require("./userService");

module.exports.registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, country_code, phone_number, password, dob, role_name } = req.body;


    // validating the request body
    if ( !first_name || !email || !country_code || !phone_number || !password || !dob || !role_name) {
      return res.status(400).json({
        status: "Failure",
        message: "Missing Required Fields!",
      });
    }

    // Check if user exists and update or create new user
    const { user, isNewUser, isNewRole } = await addOrUpdateUser({ 
      first_name, last_name, email, country_code, phone_number, password, dob 
    }, role_name);

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
    res.status(500).json({
      status: "Fail",
      message: error.message || "Sorry, Internal server error!",
    });
  }
};