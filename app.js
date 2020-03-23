const fs = require('fs');
const [command, key, value] = process.argv.slice(2);

function get() {
  try {
    const passwordsJSON = fs.readFileSync('./db.json', 'utf8');
    const passwords = JSON.parse(passwordsJSON);
    console.log(key, passwords[key]);
  } catch (error) {
    console.error(error);
  }
}

function set() {
  try {
    const passwordsJSON = fs.readFileSync('./db.json', 'utf8');
    const passwords = JSON.parse(passwordsJSON);
    passwords[key] = value;
    fs.writeFileSync('./db.json', JSON.stringify(passwords));
  } catch (erroe) {
    console.error(error);
  }
}

if (command === 'get') {
  get();
} else if (command === 'set') {
  set();
} else {
  console.log('Unknown command');
}
