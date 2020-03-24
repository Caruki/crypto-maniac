const { readPasswords, writePasswords } = require('./passwords');
const { encrypt, decrypt } = require('./crypto');

function get(key) {
  try {
    const passwords = readPasswords();
    const encryptedPassword = passwords[key];
    const password = decrypt(encryptedPassword);
    console.log(`${key}: "${password}"`);
  } catch (error) {
    console.error(error);
  }
}

function set(key, value) {
  const encryptedValue = encrypt(value);
  try {
    const passwords = readPasswords();
    passwords[key] = encryptedValue;
    writePasswords(passwords);
  } catch (error) {
    console.error(error);
  }
}

function unset(key) {
  try {
    const passwords = readPasswords();
    delete passwords[key];
    writePasswords(passwords);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { get, set, unset };
