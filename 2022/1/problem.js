const fs = require('fs');
const helpers = require('../helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  return lines.map(line => line.split());
}


// const data = readInput('sample.txt');
// Helpers example: 
// helpers.sortNumArray())

function part1() {
  const data = readInput('sample.txt');
  helpers.printMatrix(data);
}

function part2() {
  
}

part1();
