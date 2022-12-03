const fs = require('fs');
const helpers = require('../helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  return lines;
}

// const data = readInput('sample.txt');
// Helpers example: 
// helpers.sortNumArray())
// helpers.logObj(someComplicatedObject)

function part1() {
  const data = readInput('input.txt');
  var total = 0;
  data.forEach(line => {
    const leftStr = line.substring(0, line.length / 2);
    const rightStr = line.substring(line.length / 2);
    
    const leftSet = new Set(Array.from(leftStr));
    const rightSet = new Set(Array.from(rightStr));
    
    const intersection = helpers.intersection(leftSet, rightSet);
    total += getCharValue(Array.from(intersection)[0]);
  })
  console.log(total)
}

function part2() {
  const data = readInput('input.txt');
  var total = 0;
  
  for (var j = 0; j < data.length; j = j + 3) {
    const setA = new Set(Array.from(data[j]));
    const setB = new Set(Array.from(data[j + 1]))
    const setC = new Set(Array.from(data[j + 2]));
    
    const intersectionAB = helpers.intersection(setA, setB);
    const intersection = helpers.intersection(intersectionAB, setC);

    total += getCharValue(Array.from(intersection)[0]);
  }
  console.log(total)
}

function getCharValue(char) {
  const code = char.charCodeAt(0)
  return code >= 97 ? code - 96 : code - 64 + 26;
}

part1();
console.log('========')
part2();
