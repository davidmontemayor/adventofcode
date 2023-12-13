const fs = require('fs');
const helpers = require('../helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');
  return lines.map(line => line.split('').map(char=>char.replace('.',' ')))
}

function part1or2(number) {
  const tst0 = helpers.getTimeMs();

  const data = readInput('input.txt');
  const array = [];
  
  map = expand(data)
  
  const perStar = number;
  var galaxyPositions = [];
  var rowExtra = 0;
  map.forEach((row, index) => {
    var colExtra = 0;
    if (row[0] == '*') {
      rowExtra = rowExtra + perStar;
    }

    for (var i = 0; i < row.length; i++) {
      if (row[i] == '*') {
        colExtra = colExtra + perStar;
      };
      if (row[i] == '#') {
        galaxyPositions.push([index + rowExtra,i + colExtra])
      }
    }
  })
  // console.log(galaxyPositions)
  
  const pairs = [];
  for (var i = 0; i < galaxyPositions.length; i++) {
    for (var j = i + 1; j < galaxyPositions.length; j++) 
    pairs.push([galaxyPositions[i], galaxyPositions[j]])
  }

  pairs.forEach(pair => {
    array.push(Math.abs(pair[0][0] - pair[1][0]) + Math.abs(pair[0][1] - pair[1][1]))
  })
  console.log(helpers.arraySum(array))
}

function expand(map) {
  const emptyColumns = []
  const emptyRows = []
  
  const rows = map.length;
  const cols = map[0].length;
  for (var i = 0; i< rows; i++) {
    if(map[i].join('').trim().length == 0) {
      emptyRows.push(i)
    }
  }

  for (var i = 0; i< cols; i++) {
    var join = '';
    for (var j = 0; j < rows; j++) {
      join = join + (map[j][i])
    }
    if (join.trim().length == 0) {
      emptyColumns.push(i)
    }
  }

  emptyRows.reverse().forEach(index => {
    for (var i = 0; i < cols; i++) {
      map[index][i] = '*';
    }
  });

  var newRows = map.length;
  emptyColumns.reverse().forEach(index => {
    for (var i = 0 ; i < newRows; i ++) {
      map[i][index] = '*'
    }
  });

  return map;
}

// OUTPUT 
// Answer: 
console.log('==============================')
var tst0 = helpers.getTimeMs();
part1or2(1);
console.log('\nPart 1 time: ', helpers.getTimeMs() - tst0, 'ms\n')

// Answer: 
console.log('==============================')
tst0 = helpers.getTimeMs();
part1or2(999999);
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
