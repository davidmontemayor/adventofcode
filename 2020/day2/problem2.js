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
      // console.log(line)
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

// BEGIN PROBLEM 2
function processLine(line) {
  const config = line.split(':');
  const range = config[0].split(' ')[0].split('-');
  // no need to substract because we have an extra space
  const firstIndex = parseInt(range[0]);
  const secondIndex = parseInt(range[1]);
  const character = config[0].split(' ')[1];

  const password = config[1];
  const secondCharacterMatch = password[secondIndex] == character;
  return password[firstIndex] == character ? !secondCharacterMatch : secondCharacterMatch;
}

start('input1.txt');
