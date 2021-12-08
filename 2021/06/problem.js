const fs = require('fs');
const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n')[0].split(',');

  // Processing
  return lines.map(x => parseInt(x));
}

/*
const data = readInput('sample.txt');
const data = readInput('input.txt');
// Example:
helpers.sortNumArray())
*/

function part1() {
  const data = readInput('input.txt');
  console.log(JSON.stringify(data))

  for (var time = 0; time < 80; time++ ) {
    for (var i = 0; i < data.length; i++) {
      if (data[i] == 0) {
        data[i] = 6;
        data.push(9);
      } else {
        data[i] --;
      }
    }
  }  
  console.log(data.length)
}

function part2() {
  const data = readInput('input.txt');
  console.log(JSON.stringify(data))
  var fishCount = [0,0,0,0,0,0,0,0,0,0];
  data.forEach(value => fishCount[value]++);
  console.log(fishCount)

  for (var time = 0; time < 256; time++ ) {
    var nextCount = [0,0,0,0,0,0,0,0,0,0];
    for (var i = 0; i < fishCount.length; i++) {
      if (i == 0) {
        nextCount[8] = fishCount[0];
        nextCount[6] = fishCount[0];
        continue;
      }
      nextCount[i - 1]+= fishCount[i];
    }
    fishCount = nextCount;
    console.log(JSON.stringify(fishCount))
  }
  console.log(helpers.arraySum(fishCount));
}

part2();


