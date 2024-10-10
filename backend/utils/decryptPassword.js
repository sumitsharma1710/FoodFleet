// utils/decryptPassword.js
const forge = require('node-forge');

/**
 * Decrypts an encrypted password using the provided private key.
 * @param {string} encryptedPassword - The encrypted password in Base64 format.
 * @param {string} privateKeyPem - The private key in PEM format.
 * @returns {string} - The decrypted password.
 */
function decryptPassword(encryptedPassword, privateKeyPem) {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const encryptedBytes = forge.util.decode64(encryptedPassword);
    return privateKey.decrypt(encryptedBytes, 'RSA-OAEP');
}

module.exports = decryptPassword;
