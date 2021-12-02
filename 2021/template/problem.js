const fs = require('fs');
const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  return lines.map(x => parseInt(x));
}

/*
const data = readInput('sample.txt');
const data = readInput('input.txt');
*/

function part1() {
  console.log(helpers.sortNumArray([1,5,7,3,4,2,3,2,2,23,4]))
}

function part2() {
  
}

part1();


