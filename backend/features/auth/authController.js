const sendMail = require("../../utils/sendMail");
const { loginUser, logoutUser, forgotPasswordService, resetPasswordService } = require("./authService");

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password, role_name } = req.body;
    const { userDetails, accessToken, refreshToken, refreshTokenExpiresAt } = await loginUser({
      email,
      password,
      role_name
    });

    const accessTokenExp = parseInt(process.env.ACCESS_TOKEN_EXP)
    const refreshTokenExp = parseInt(process.env.REFRESH_TOKEN_EXP)

    // Set cookies
    res.cookie("accessToken", accessToken, {
      // httpOnly: true,
      // sameSite: "Strict",
      maxAge: accessTokenExp,
    });

    res.cookie("refreshToken", refreshToken, {
      // httpOnly: true,
      // sameSite: "Strict",
      maxAge: refreshTokenExp
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
      message: error.message || "Sorry, Internal server error!",
    });
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) {
      return res.status(400).json({
        status: "Fail",
        message: "No refresh token provided",
      });
    }

    await logoutUser(refreshToken);

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
      message: error.message || "Sorry, Internal server error!",
    });
  }
};


module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const resetToken = await forgotPasswordService(email);
    
    // In a real application, you would send this token via email
    // For demonstration, we're returning it in the response
    const options = {
      to: email,
      subject: "Reset Password",
      link: `http://localhost:8080/user/v1/resetPassword/${resetToken}`
    }
    await sendMail(options)
    return res.status(200).json({
      status: "Success",
      message: "Password reset token sent to email",
      resetToken // In production, remove this line
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message || "Sorry, Internal server error!",
    });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    
    await resetPasswordService(token, password);
    
    return res.status(200).json({
      status: "Success",
      message: "Password has been reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message || "Sorry, Internal server error!",
    });
  }
};