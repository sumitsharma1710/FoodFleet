const sendMail = require("../../utils/sendMail"); // Import mail sending utility
const { loginUser, logoutUser, forgotPasswordService, resetPasswordService } = require("./authService"); // Import authentication services

// Handle user login
module.exports.loginUser = async (req, res) => {
  try {
    const { email, password, role_name } = req.body; // Destructure request body
    // Authenticate user and retrieve tokens
    const { userDetails, accessToken, refreshToken } = await loginUser({ email, password, role_name });

    const accessTokenExp = parseInt(process.env.ACCESS_TOKEN_EXP); // Access token expiration time
    const refreshTokenExp = parseInt(process.env.REFRESH_TOKEN_EXP); // Refresh token expiration time

    // Set access token cookie
    res.cookie("accessToken", accessToken, {
      maxAge: accessTokenExp, // Cookie expiration
    });

    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: refreshTokenExp // Cookie expiration
    });

    return res.status(200).json({
      status: "Success",
      message: "User Logged in successfully",
      data: {
        user: {
          firstName: userDetails.first_name,
          lastName: userDetails.last_name,
          email: userDetails.email,
          accessToken,
          refreshToken
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message || "Sorry, Internal server error!", // Handle errors
    });
  }
};

// Handle user logout
module.exports.logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken; // Get refresh token from cookies
    
    if (!refreshToken) {
      return res.status(400).json({
        status: "Fail",
        message: "No refresh token provided", // Error if no token is found
      });
    }

    await logoutUser(refreshToken); // Logout user

    // Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
      status: "Success",
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message || "Sorry, Internal server error!", // Handle errors
    });
  }
};

// Handle forgot password request
module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body; // Get email from request body
    const resetToken = await forgotPasswordService(email); // Generate reset token

    // Prepare email options
    const options = {
      to: email,
      subject: "Reset Password",
      link: `http://localhost:8080/user/v1/resetPassword/${resetToken}` // Reset link
    };
    await sendMail(options); // Send reset email
    return res.status(200).json({
      status: "Success",
      message: "Password reset token sent to email",
      resetToken // For demonstration purposes; remove in production
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message || "Sorry, Internal server error!", // Handle errors
    });
  }
};

// Handle password reset
module.exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params; // Get token from URL parameters
    const { password } = req.body; // Get new password from request body
    
    await resetPasswordService(token, password); // Reset user password
    
    return res.status(200).json({
      status: "Success",
      message: "Password has been reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message || "Sorry, Internal server error!", // Handle errors
    });
  }
};
