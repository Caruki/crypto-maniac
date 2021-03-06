const { encrypt, decrypt, hashPassword } = require('./crypto');
const {
  getPassword,
  setPassword,
  unsetPassword,
  setMasterPassword,
  unsetAllPasswords,
} = require('./mongoaccess');

async function get(key, masterPassword) {
  const encryptedPassword = await getPassword(key);
  const password = decrypt(encryptedPassword, masterPassword);
  console.log(`${key}: "${password}"`);
}

async function set(key, value, masterPassword) {
  const encryptedValue = encrypt(value, masterPassword);
  await setPassword(key, encryptedValue);
}

async function unset(key) {
  await unsetPassword(key);
}

async function reset(masterPassword) {
  await setMasterPassword(hashPassword(masterPassword));
  await unsetAllPasswords();
  console.log('Reset database with new master password');
}

module.exports = { get, set, unset, reset };
