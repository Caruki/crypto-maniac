const { readPasswords, writePasswords } = require('./passwords');

function get(key) {
  try {
    const passwords = readPasswords();
    console.log(`${key}: "${passwords[key]}"`);
  } catch (error) {
    console.error(error);
  }
}

function set(key, value) {
  try {
    const passwords = readPasswords();
    passwords[key] = value;
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
