const fs = require('fs');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  return lines.map(x => parseInt(x));
}

function arraySum(array) {
  return array.reduce((prev, curr) => prev + curr);
}

function part1() {
  
}

// Three value window
function part2() {
  
}

part1();
