const jwt = require("jsonwebtoken");

const { db } = require("../models/dbConnection");

const User = db.User;

const authMiddleware = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const { accessToken } = req.cookies;

  if (!refreshToken) {
    if (accessToken) {
      res.clearCookie("accessToken", {
        httpOnly: true,
        // secure: true,
        // sameSite: "None"
      });
    }
    return res.status(401).json({
      status: "Fail",
      message: "Your session has expired please login again",
    });
  }

  if (!accessToken && refreshToken) {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const accessToken = jwt.sign(
      { uuid: decoded.uuid, role_uuid: decoded.role_uuid },
      process.env.JWT_SECRET,
      { expiresIn: parseInt(process.env.ACCESS_TOKEN_EXP) }
    );

    const accessTokenExp = parseInt(process.env.ACCESS_TOKEN_EXP); // Access token expiration time

    // Set access token cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: true,
      // sameSite: "None",
      maxAge: accessTokenExp, // Cookie expiration
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.uuid);

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
