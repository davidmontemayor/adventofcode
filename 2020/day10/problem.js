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
  return lines.filter(line => line.trim().length > 0).map(line => parseInt(line));
}

const input = readInput('input.txt');
const adapters = sortNumArray(input);
console.log(adapters);

var currJolts = 0;
var highest = adapters[adapters.length - 1] + 3;
adapters.push(highest)
var oneJolts = 0;
var threeJolts = 0;

for (var i = 0; i < adapters.length; i++) {
  const diff = adapters[i] - currJolts;
  // console.log(adapters[i], currJolts, diff)
  if (diff == 3) {
    threeJolts++;
  }
  if (diff == 1) {
    oneJolts++;
  }
  currJolts = adapters[i];
}

console.log(oneJolts, threeJolts, oneJolts * threeJolts);
