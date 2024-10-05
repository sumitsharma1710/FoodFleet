async function validateNewUser(user, userDetails) {
    if (user.email === userDetails.email) {
      throw new Error("User with the given email already exists");
    }
    
    if (user.phone_number === userDetails.phone_number) {
      throw new Error("User with the given phone number already exists");
    }
    
    // If we reach here, the user details are valid
    return true;
}

module.exports = validateNewUser;