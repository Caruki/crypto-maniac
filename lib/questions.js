const readline = require('readline');

function askForInput(question, hideAnswer) {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    readlineInterface.question(question, (input) => {
      resolve(input);
      readlineInterface.output.write('\n');

      readlineInterface.close();
    });
    if (hideAnswer) {
      readlineInterface._writeToOutput = function () {
        readlineInterface.output.write('');
      };
    }
  });
}

function askForPassword(key) {
  return askForInput(`Enter password of ${key}: `, { hideAnswer: true });
}

function askForMasterPassword() {
  return askForInput('Please enter master password: ', { hideAnswer: true });
}

exports.askForPassword = askForPassword;
exports.askForMasterPassword = askForMasterPassword;
