const { addOrUpdateUser, getUserDetails } = require("./userService"); // Import user service for adding or updating user
const decryptPassword = require("../../utils/decryptPassword");

module.exports.registerUser = async (req, res) => {
  try {
    // Destructure required fields from request body
    const {
      first_name,
      last_name,
      email,
      country_code,
      phone_number,
      password,
      dob,
      role_name,
    } = req.body;

    // Validate required fields
    if (
      !first_name ||
      !email ||
      !country_code ||
      !phone_number ||
      !password ||
      !dob ||
      !role_name
    ) {
      return res.status(400).json({
        status: "Failure",
        message: "Missing Required Fields!",
      });
    }

    const privateKeyPem = process.env.PRIVATE_KEY_PEM; // Load your private key PEM from environment variables

    // Decrypt the password using the utility
    const decryptedPassword = decryptPassword(password, privateKeyPem);

    // Attempt to add or update user
    const { user, isNewUser, isNewRole } = await addOrUpdateUser(
      {
        first_name,
        last_name,
        email,
        country_code,
        phone_number,
        password: decryptedPassword,
        dob,
      },
      role_name
    );

    // Respond based on user and role creation status
    if (isNewUser) {
      res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: {
          user: {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
          },
        },
      });
    } else if (isNewRole) {
      res.status(200).json({
        status: "success",
        message: "New role added to existing user",
        data: {
          user: {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
          },
        },
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

module.exports.getUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      res.status(400).json({
        status: "Failure",
        message: "Not Authenticated",
      });
    } else {
      const userDetails = await getUserDetails(refreshToken);

      if (!userDetails) {
        res.status(400).json({
          status: "Fail",
          message: "Sorry, Recieved a malformed token",
        });
      }

      res.status(200).json({
        status: "Success",
        message: "Authenticated",
        data: {
          user: {
            firstName: userDetails.first_name,
            lastName: userDetails.last_name,
            email: userDetails.email,
          },
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message || "Sorry, Internal server error!",
    });
  }
};
