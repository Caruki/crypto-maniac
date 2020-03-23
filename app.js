const fs = require('fs');
const [command, key] = process.argv.slice(2);

function get() {
  try {
    const passwordsJSON = fs.readFileSync('./db.json', 'utf8');
    const passwords = JSON.parse(passwordsJSON);
    console.log(key, passwords[key]);
  } catch (err) {
    console.error(err);
  }
}

function set() {
  console.log('Called SET', key);
}

if (command === 'get') {
  get();
} else if (command === 'set') {
  set();
} else {
  console.log('Unknown command');
}
