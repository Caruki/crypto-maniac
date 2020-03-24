const { get, set, unset } = require('./lib/commands');
const [command, key] = process.argv.slice(2);
const { askForPassword, askForMasterPassword } = require('./lib/questions');
const { readMasterPassword } = require('./lib/dbaccess');

async function run() {
  const input = await askForMasterPassword();
  if (input === readMasterPassword()) {
    if (command === 'get') {
      get(key);
    } else if (command === 'set') {
      const password = await askForPassword(key);
      set(key, password);
    } else if (command === 'unset') {
      unset(key);
    } else {
      console.log('Unknown command');
    }
  }
}

run();
