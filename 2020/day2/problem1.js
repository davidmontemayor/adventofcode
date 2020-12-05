const readline = require('readline');
const fs = require('fs');

function readLines(filename) {
  return new Promise(resolve => {
    const read = [];

    const readInterface = readline.createInterface({
      input: fs.createReadStream(filename),
      output: null,
      console: false
    });

    readInterface.on('line', function(line) {
      read.push(line);
    });

    readInterface.on('close', function(line) {
      resolve(read);
    });
  });
}

async function start(filename) {
  const result = await readLines(filename);
  const matches = result.filter(processLine).length;
  console.log(matches);
}

// BEGIN PROBLEM
function processLine(line) {
  const config = line.split(':');
  const range = config[0].split(' ')[0].split('-');
  const min = parseInt(range[0]);
  const max = parseInt(range[1]);
  const character = config[0].split(' ')[1];

  const password = config[1];
  const matches = (password.match(new RegExp(character, 'g')) || []).length;
  return matches >= min && matches <= max;
}

start('input1.txt');
