module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Fail";

  res.status(error.statusCode).json({
    status: error.status,
    requestedAt: req.requestedAt,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};
