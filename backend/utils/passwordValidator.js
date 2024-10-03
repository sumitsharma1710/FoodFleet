function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password); 
  const hasNonalphas = /\W/.test(password);

  if (password.length < minLength) {
    return {
      isValid: false,
      message: `Password must be at least ${minLength} characters long.`,
    };
  }

  if (!hasUpperCase) {
    return {
      isValid: false,
      message: "Password must contain at least one uppercase letter.",
    };
  }

  if (!hasLowerCase) {
    return {
      isValid: false,
      message: "Password must contain at least one lowercase letter.",
    };
  }

  if (!hasNumbers) {
    return {
      isValid: false,
      message: "Password must contain at least one number.",
    };
  }

  if (!hasNonalphas) {
    return {
      isValid: false,
      message: "Password must contain at least one special character.",
    };
  }

  return { isValid: true, message: "Password is valid." };
}

module.exports = validatePassword;
