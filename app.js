const { get, set, unset, reset } = require('./lib/commands');
const [command, key] = process.argv.slice(2);
const { askForPassword, askForMasterPassword } = require('./lib/questions');
const { verifyHash } = require('./lib/crypto');
const { readMasterPassword } = require('./lib/dbaccess');

async function run() {
  const inputMasterPassword = await askForMasterPassword();

  const masterPassword = readMasterPassword();

  if (!verifyHash(inputMasterPassword, masterPassword)) {
    console.log('Fuck Off!');
    return;
  }

  if (command === 'reset') {
    return reset(inputMasterPassword);
  }

  if (command === 'get') {
    get(key);
  } else if (command === 'set') {
    const password = await askForPassword(key);
    set(key, password);
  } else if (command === 'unset') {
    unset(key);
  } else {
    console.log('Fuck Off!');
    return 'Unknown command';
  }
}

run();
