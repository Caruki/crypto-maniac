const { getCollection } = require('./mongo');

function getMasterPasswordsCollection() {
  return getCollection('masterPasswords');
}

async function getMasterPassword() {
  const masterPassword = await getMasterPasswordsCollection().findOne();
  return masterPassword.value;
}

exports.getMasterPassword = getMasterPassword;
