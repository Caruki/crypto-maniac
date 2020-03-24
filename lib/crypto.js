const crypto = require('crypto');
const { readMasterPassword } = require('./dbaccess');

let resizedIV = Buffer.allocUnsafe(16);
const iv = crypto.createHash('sha256').update('myHashedIV').digest();
iv.copy(resizedIV);

function getCipherKey(secret) {
  return crypto.createHash('sha256').update(secret).digest();
}

function encrypt(value) {
  const cipherKey = getCipherKey(readMasterPassword());

  const cryptoCipher = crypto.createCipheriv('aes256', cipherKey, resizedIV);

  let encryptedValue = cryptoCipher.update(value, 'utf-8', 'hex');
  encryptedValue += cryptoCipher.final('hex');

  return encryptedValue;
}

function decrypt(encryptedValue) {
  const cipherKey = getCipherKey(readMasterPassword());

  const cryptoCipher = crypto.createDecipheriv('aes256', cipherKey, resizedIV);

  let decryptedValue = cryptoCipher.update(encryptedValue, 'hex', 'utf-8');
  decryptedValue += cryptoCipher.final('utf-8');

  return decryptedValue;
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;
