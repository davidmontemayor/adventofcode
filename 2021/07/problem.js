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
  var min = 10000;
  var max = 0;
  data.forEach(x => {
    min = x < min ? x : min;
    max = x > max ? x : max;
  });
  console.log(min, max)
  var minFuel = 1000000000;
  for (var att = min; att < max; att++) {
    var fuel = 0;
    for (var i = 0; i < data.length; i++) {
      fuel+= Math.abs(att - data[i]);
    }
    console.log(fuel);
    if (fuel < minFuel) {
      minFuel = fuel;
    }
  }
  console.log(minFuel)
}

function part2() {
  const data = readInput('input.txt');
  var min = 10000;
  var max = 0;
  data.forEach(x => {
    min = x < min ? x : min;
    max = x > max ? x : max;
  });
  console.log(min, max)
  
  var minFuel = 1000000000;
  for (var att = min; att < max; att++) {
    var fuel = 0;
    for (var i = 0; i < data.length; i++) {
      var curCost = 1;
      for (var j = 0; j < Math.abs(att - data[i]); j ++ ) {
        fuel+= curCost;
        curCost++;
      }
    }
    console.log(att, fuel);
    if (fuel < minFuel) {
      minFuel = fuel;
      console.log("Latest min: ", att)
    }
  }
  console.log(minFuel)
}

part2();
