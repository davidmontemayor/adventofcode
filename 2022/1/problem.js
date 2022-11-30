const fs = require('fs');
const helpers = require('../helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  var counts = [];
  var curMax = 0;
  lines.forEach(line => {
    if (line.length == 0) {
      counts.push(curMax);
      curMax = 0;
    } else {
      curMax+=parseInt(line);
    }
  });
  counts.push(curMax);
  return helpers.sortNumArrayDesc(counts);
}


// const data = readInput('sample.txt');
// Helpers example: 
// helpers.sortNumArray())
// helpers.logObj(someComplicatedObject)

function part1() {
  const data = readInput('input.txt');
  console.log(data[0])
}

function part2() {
  const data = readInput('input.txt');
  console.log(data[0] + data[1] + data[2])
}

part1();
part2();
