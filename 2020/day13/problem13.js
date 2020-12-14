const fs = require('fs');

function sortNumArray(array) {
  return array.slice(0).sort((a,b) => a-b);
}

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  const times = lines[1].split(',').filter(s => s != 'x').map(x => parseInt(x));
  return [ lines[0], times ];
}

const input = readInput('input.txt');

var min = 100000;
var id = -1;
const desired = input[0];
input[1].forEach(depart => {
  // Do we need a special case for exact? A: Nope
  const closestDeparture = (Math.floor(desired / depart) + 1) * depart;
  const diff = closestDeparture - desired;
  if (diff < min) {
    min = diff;
    id = depart;
  }
});

console.log(id * min)
