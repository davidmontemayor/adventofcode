const fs = require('fs');
const helpers = require('../helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  var lines = input.split('\n');
  lines = lines.map(line => line.split(' ').map(parseDecimal))
  
  return lines;
}

function both() {
  const data = readInput('input.txt');
  var arrayPt1 = []
  var arrayPt2 = []
  data.forEach(entry => {
    const diffs = [];
    diffs.push(entry);
    
    var latest = entry;
    while(helpers.arraySum(latest) != 0) {
      latest = generateDiff(latest);
      diffs.push(latest)
    }
    
    var currPt1 = 0;
    var currPt2 = 0
    for (var i = diffs.length - 2; i >= 0; i --) {
      var curr = diffs[i]
      
      currPt1 = curr.slice(-1)[0] + currPt1;
      currPt2 = curr[0] - currPt2;
    }

    arrayPt1.push(currPt1)
    arrayPt2.push(currPt2)
  })

  console.log(helpers.arraySum(arrayPt1))
  console.log(helpers.arraySum(arrayPt2))
}

function generateDiff(array) {
  var diff = [];
  for (var i = 0; i < array.length - 1; i++) {
    diff.push(array[i + 1] - array[i]);
  }
  return diff;
}

// OUTPUT 
// Answer1: 1806615041
// Answer2: 1211
console.log('==============================')
tst0 = helpers.getTimeMs();
both();
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
