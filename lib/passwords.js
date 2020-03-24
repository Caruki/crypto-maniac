const fs = require('fs');

function readPasswords() {
  const passwordsJSON = fs.readFileSync('./db.json', 'utf8');
  const passwords = JSON.parse(passwordsJSON);
  return passwords;
}

function writePasswords(passwords) {
  fs.writeFileSync('./db.json', JSON.stringify(passwords, null, 2));
}

function readMasterPassword() {
  const passwordsJSON = fs.readFileSync('./db.json', 'utf8');
  const passwords = JSON.parse(passwordsJSON);
  const masterPassword = passwords.masterPassword;
  return masterPassword;
}

module.exports = { readPasswords, writePasswords, readMasterPassword };
