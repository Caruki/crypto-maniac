const { get, set, unset, reset } = require('./lib/commands');
const [command, key] = process.argv.slice(2);
const { askForPassword, askForMasterPassword } = require('./lib/questions');
const { verifyHash } = require('./lib/crypto');
const { getMasterPassword } = require('./lib/mongoaccess');
const { connect, close } = require('./lib/mongo');

async function run() {
  try {
    await connect();
    const masterPassword = await getMasterPassword();
    const inputMasterPassword = await askForMasterPassword();

    if (command === 'reset') {
      reset(inputMasterPassword);
    }

    if (!verifyHash(inputMasterPassword, masterPassword)) {
      console.log('Fuck Off!');
      return;
    }

    if (command === 'get') {
      get(key, masterPassword);
    } else if (command === 'set') {
      const password = await askForPassword(key);
      set(key, password, masterPassword);
    } else if (command === 'unset') {
      unset(key);
    } else {
      console.error('Unknown command');
    }
  } catch (error) {
    console.error(error);
  } finally {
    await close();
  }
}

run();
