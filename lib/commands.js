const { readPasswords, writePasswords, writeDB } = require('./dbaccess');
const { encrypt, decrypt, hashPassword } = require('./crypto');

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

function reset(masterPassword) {
  const db = {
    masterPassword: hashPassword(masterPassword),
    passwords: {},
  };

  writeDB(db);
  console.log('Reset database with new master password');
}

module.exports = { get, set, unset, reset };
