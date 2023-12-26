const fs = require('fs');
const helpers = require('../helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Do further processing
  // return lines.map(line => line.split());
  return lines;
}

function part1() {
  const data = readInput('sample.txt');
  
  const array = [];

  console.log(helpers.arraySum(array))
}

function part2() {
  
}

// OUTPUT 
// Answer: 
console.log('==============================')
var tst0 = helpers.getTimeMs();
part1();
console.log('\nPart 1 time: ', helpers.getTimeMs() - tst0, 'ms\n')

// Answer: 
console.log('==============================')
tst0 = helpers.getTimeMs();
part2();
console.log('\nPart 2 time: ', helpers.getTimeMs() - tst0, 'ms\n')

// HANDY UTILS

function parseDecimal(s) {
  return parseInt(s, 10);
}


// REMINDERS

// const data = readInput('sample.txt');
// Helpers example: 
// helpers.sortNumArray())
// helpers.logObj(someComplicatedObject)
// helpers.containsAll(setA, setB)
// helpers.intersection(setA, setB)
// helpers.difference(setA, setB)
// helpers.union(setA, setB)
// console.log("=".repeat(80))
