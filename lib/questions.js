const readline = require('readline');

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askForPassword(key) {
  return new Promise((resolve) => {
    readlineInterface.question(`Enter password for ${key}: `, (password) => {
      resolve(password);
      readlineInterface.close();
    });
  });
}

// function askForMasterPassword() {}

exports.askForPassword = askForPassword;
