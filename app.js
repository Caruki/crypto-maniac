const { readPasswords, writePasswords } = require('./lib/passwords');

const [command, key, value] = process.argv.slice(2);

function get() {
  try {
    const passwords = readPasswords();
    console.log(`${key}: "${passwords[key]}"`);
  } catch (error) {
    console.error(error);
  }
}

function set() {
  try {
    const passwords = readPasswords();
    passwords[key] = value;
    writePasswords(passwords);
  } catch (error) {
    console.error(error);
  }
}

function unset() {
  try {
    const passwords = readPasswords();
    delete passwords[key];
    writePasswords(passwords);
  } catch (error) {
    console.error(error);
  }
}

if (command === 'get') {
  get();
} else if (command === 'set') {
  set();
} else if (command === 'unset') {
  unset();
}
