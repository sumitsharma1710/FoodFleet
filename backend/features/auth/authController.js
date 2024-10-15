const sendMail = require("../../utils/sendMail"); // Import mail sending utility
const {
  loginUser,
  logoutUser,
  forgotPasswordService,
  resetPasswordService,
} = require("./authService"); // Import authentication services
const decryptPassword = require("../../utils/decryptPassword");

const asyncErrorHandler = require("../../utils/asyncErrorHandling");

// Handle user login
module.exports.loginUser = asyncErrorHandler(async (req, res) => {
  const { email, password, role_name } = req.body; // Destructure request body

  const privateKeyPem = process.env.PRIVATE_KEY_PEM; // Load your private key PEM from environment variables

  // Decrypt the password using the utility
  const decryptedPassword = decryptPassword(password, privateKeyPem);

  // Now use decryptedPassword in the login service
  const { userDetails, accessToken, refreshToken } = await loginUser({
    email,
    password: decryptedPassword,
    role_name,
  });

  const accessTokenExp = parseInt(process.env.ACCESS_TOKEN_EXP); // Access token expiration time
  const refreshTokenExp = parseInt(process.env.REFRESH_TOKEN_EXP); // Refresh token expiration time

  // Set access token cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    // secure: true,
    // sameSite: "None",
    maxAge: accessTokenExp, // Cookie expiration
  });

  // Set refresh token cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    // secure: true,
    // sameSite: "None",
    maxAge: refreshTokenExp, // Cookie expiration
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
        refreshToken,
      },
    },
  });
});

// Handle user logout
module.exports.logoutUser = asyncErrorHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken; // Get refresh token from cookies

  await logoutUser(refreshToken); // Logout user

  // Clear cookies
  res.clearCookie("accessToken", {
    httpOnly: true,
    // secure: true,
    // sameSite: "None"
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    // secure: true,
    // sameSite: "None"
  });

  return res.status(200).json({
    status: "Success",
    message: "User logged out successfully",
  });
});

// Handle forgot password request
module.exports.forgotPassword = asyncErrorHandler(async (req, res) => {
  const { email } = req.body; // Get email from request body
  const resetToken = await forgotPasswordService(email); // Generate reset token

  // Prepare email options
  const options = {
    to: email,
    subject: "Reset Password",
    link: `http://192.1.200.39:8080/user/v1/resetPassword/${resetToken}`, // Reset link
  };
  await sendMail(options); // Send reset email
  return res.status(200).json({
    status: "Success",
    message: "Password reset token sent to email",
    resetToken, // For demonstration purposes; remove in production
  });
});

// Handle password reset
module.exports.resetPassword = asyncErrorHandler(async (req, res) => {
  const { token } = req.params; // Get token from URL parameters
  const { encryptedPassword } = req.body; // Get new password from request body

  const privateKeyPem = process.env.PRIVATE_KEY_PEM; // Load your private key PEM from environment variables

  // Decrypt the password using the utility
  const decryptedPassword = decryptPassword(encryptedPassword, privateKeyPem);

  await resetPasswordService(token, decryptedPassword); // Reset user password

  return res.status(200).json({
    status: "Success",
    message: "Password has been reset successfully",
  });
});
