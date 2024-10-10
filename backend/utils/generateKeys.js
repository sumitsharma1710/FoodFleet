// generateKeys.js
const forge = require('node-forge');
const fs = require('fs');

// Generate RSA key pair
const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);

// Convert keys to PEM format
const privateKeyPem = forge.pki.privateKeyToPem(privateKey);
const publicKeyPem = forge.pki.publicKeyToPem(publicKey);

// Save keys to files (or you can use environment variables)
fs.writeFileSync('privateKey.pem', privateKeyPem);
fs.writeFileSync('publicKey.pem', publicKeyPem);

console.log('Keys generated and saved to privateKey.pem and publicKey.pem');
