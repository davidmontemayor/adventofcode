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
// Helpers example: 
helpers.sortNumArray())
*/

function part1() {

}

function part2() {
  
}

part1();
