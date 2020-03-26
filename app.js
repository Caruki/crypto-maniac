const { get, set, unset, reset } = require('./lib/commands');
const [command, key] = process.argv.slice(2);
const { askForPassword, askForMasterPassword } = require('./lib/questions');
const { verifyHash } = require('./lib/crypto');
const { getMasterPassword } = require('./lib/mongoaccess');
const { connect, close } = require('./lib/mongo');

async function run() {
  try {
    await connect();
    const inputMasterPassword = await askForMasterPassword();
    const masterPassword = await getMasterPassword();

    if (command === 'reset') {
      await reset(inputMasterPassword);
      return;
    }

    if (!verifyHash(inputMasterPassword, masterPassword)) {
      console.log('Fuck Off!');
      return;
    }

    if (command === 'get') {
      await get(key, masterPassword);
    } else if (command === 'set') {
      const password = await askForPassword(key);
      await set(key, password, masterPassword);
    } else if (command === 'unset') {
      await unset(key);
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
