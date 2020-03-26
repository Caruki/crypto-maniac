const { getCollection } = require('./mongo');

function getMasterPasswordsCollection() {
  return getCollection('masterPasswords');
}

async function getMasterPassword() {
  const masterPassword = await getMasterPasswordsCollection().findOne();
  if (!masterPassword) {
    return null;
  }
  return masterPassword.value;
}

function deleteMasterPassword() {
  return getMasterPasswordsCollection().deleteOne({});
}

async function setMasterPassword(newMasterPassword) {
  await deleteMasterPassword();
  return getMasterPasswordsCollection().insertOne({
    value: newMasterPassword,
  });
}

function getPasswordsCollection() {
  return getCollection('passwords');
}

async function getPassword(name) {
  const passwordDocument = await getPasswordsCollection().findOne({ name });
  return passwordDocument.value;
}

function getAllPasswords() {
  return getPasswordsCollection().find({}).toArray();
}

function setPassword(name, value) {
  return getPasswordsCollection().updateOne(
    {
      name,
    },
    {
      $set: {
        value,
      },
    },
    { upsert: true }
  );
}

function unsetPassword(name) {
  return getPasswordsCollection().deleteOne({ name });
}

function unsetAllPasswords() {
  return getPasswordsCollection().deleteMany({});
}

module.exports = {
  getMasterPassword,
  setMasterPassword,
  getPassword,
  getAllPasswords,
  setPassword,
  unsetPassword,
  unsetAllPasswords,
};
