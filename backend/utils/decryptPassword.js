function decryptPassword(encryptedPassword) {
    let decoded = window.atob(encryptedPassword);
    return decoded;
}

module.exports = decryptPassword;
