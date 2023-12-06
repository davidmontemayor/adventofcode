const fs = require('fs');
const helpers = require('../helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');
  const times = lines[0].split(':')[1].trim().split(" ").filter(x => x.length > 0).map(parseDecimal);
  const distances = lines[1].split(':')[1].trim().split(" ").filter(x => x.length > 0).map(parseDecimal);
  
  return { times, distances };
}

function part1() {
  const data = readInput('input.txt');
  const array = [];

  for (var i = 0; i < data.times.length; i ++) {
    var raceLength = data.times[i]; 
    array.push(calculateRace(raceLength, data.distances[i]))
  }

  console.log(helpers.arrayMultiply(array))
}

function part2() {
  const data = readInput('input2.txt');
  const array = [];

  for (var i = 0; i < data.times.length; i ++) {
    var raceLength = data.times[i]; 
    array.push(calculateRace(raceLength, data.distances[i]))
  }

  console.log(helpers.arrayMultiply(array))
}

function calculateRace(raceLength, targetDistance) {
  const start = helpers.getTimeMs();
  var distances =[];
  for (var time = 0; time <= raceLength; time++) {
    var distance = time * (raceLength - time);
    distances.push(distance)
  }
  var wins = 0;
  distances.forEach(distance => 
    wins = wins + ((distance > targetDistance) ? 1 : 0))
  console.log(helpers.getTimeMs() - start, 'ms')
  return wins;
}

part1();
part2();

// const data = readInput('sample.txt');
// Helpers example: 
// helpers.sortNumArray())
// helpers.logObj(someComplicatedObject)
// helpers.containsAll(setA, setB)
// helpers.intersection(setA, setB)
// helpers.difference(setA, setB)
// helpers.union(setA, setB)
// console.log("=".repeat(80))

function parseDecimal(s) {
  return parseInt(s, 10);
}