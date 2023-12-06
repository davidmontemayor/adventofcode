const fs = require('fs');
const helpers = require('../helpers.js');
const { parse } = require('path');
const { Worker } = require('worker_threads')

function readInput(filename) {

  // maps are 
  // source | destination | range size
  // seed 79 goes to 
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Do further processing
  // return lines.map(line => line.split());
  return lines;
}

function part1() {
  const lines = readInput('sample.txt');
  const array = [];

  var seeds = lines[0].split(':')[1].trim().split(" ").map(parseDecimal)
  console.log(seeds)

  var nextSet = [];
  var lineIdx = 3;

  
  for (var i = 0; i < 7; i ++) {
    var set = getSet(lines, lineIdx);
    console.log(set)
    lineIdx = lineIdx + set.length + 2;
    
    seeds = doMap(seeds, set)
    console.log(seeds)
  }
  

  console.log(helpers.sortNumArrayAsc(seeds))
}
/*
52 50 48
*/
function doMap(seeds, set) {
  var seedsOut = [];
  seeds.forEach(seed => {
    var found = false;
    set.forEach(range => {
      if (!found && seed >= range.source && seed <= range.source + range.size) {
        var dest = range.dest + (seed - range.source);
        // console.log('match', seed, dest)
        seedsOut.push(dest)
        found = true;
      }
    })
    if (!found) {
      seedsOut.push(seed)
    }
  })
  return seedsOut;
}

function getSet(lines, lineIdx) {
  var ret = [];
  var line = lines[lineIdx]
  while(line.length > 0) {
    var range = line.split(" ").map(parseDecimal);
    ret.push({ 
      source: range[1],
      dest: range[0],
      size: range[2],
    });
    lineIdx ++;
    line = lines[lineIdx]
  }
  return ret;
}

function part2() {
  const lines = readInput('sample.txt');
  const array = [];

  var lineIdx = 3;

  var sets = []
  for (var i = 0; i < 7; i ++) {
    var set = getSet(lines, lineIdx);
    sets.push(set);
    lineIdx = lineIdx + set.length + 2;
  }
  // console.log(sets)
  
  console.log('1')
  var seedTuples = lines[0].split(':')[1].trim().split(" ").map(parseDecimal)
  console.log('?')
  var seeds = [];
  
  var minLocation = -1;
  for (var j = 0; j < seedTuples.length; j = j +2) {
    var date = new Date();
    console.log ("Seed Tuple: ", j / 2, '; Seed start', seedTuples[j].toLocaleString(), '; Seed size', seedTuples[j+1].toLocaleString())
    console.log(minLocation)
    for (var k = 0; k < seedTuples[j + 1]; k++) {
      var seed = seedTuples[j] + k;
      var location = doMapPart2(seed, sets)
      if (minLocation < 0) {
        minLocation = location;
      } else {
        minLocation = Math.min(minLocation, location)
      }
    }
    console.log('Time:', (new Date() - date).toLocaleString() , 'ms')
  }

  console.log(minLocation)
}

function doMapPart2(seed, sets) {
  sets.forEach(set => {
    var found = false;
    set.forEach(range => {
      if (!found && seed >= range.source && seed < range.source + range.size) {
        var dest = range.dest + (seed - range.source);
        seed = dest
        found = true;
      }
    })
  })
  return seed;
}

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