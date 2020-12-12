const fs = require('fs');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  // . : Floor
  // L : Empty seat
  // # : Occupied
  return lines.filter(line => line.trim().length > 0)
    .map(line => line.split(''));
}

function countSeats(map) {
  var sum = 0;
  for (var row = 0; row < map.length; row++) {
    const rowString = map[row].join('');
    sum += (rowString.match(/\#/g) || []).length;
    // console.log(rowString, (rowString.match(/\#/g) || []).length)
  }
  return sum;
}

const map = readInput('input.txt');
// State -> New state
// Forever until no changes are made

function doOneStep(map) {
  var changed = false;
  function ocupado(i, j) {
    const char = map[i] ? map[i][j]  ? map[i][j] : '.' : '.';
    return char === '#';
  }

  function checkCell(row, col, diff) {
    return ocupado(row - diff, col - diff) +
      ocupado(row - diff, col) +
      ocupado(row - diff, col + diff) +

      ocupado(row, col - diff) +
      ocupado(row, col + diff) +

      ocupado(row + diff, col - diff) +
      ocupado(row + diff, col) +
      ocupado(row + diff, col + diff);
  }

  const max = Math.max(map.length,map[0].length);
  const output = [];
  for (var row = 0; row < map.length; row++) {
    const newRow = [];
    for (var col = 0; col < map[row].length; col++) {
      curr = map[row][col];
      if (curr === '.') {
        newRow[col] = '.';
        continue;
      }

      // Occupied or Not

      const count = checkCell(row, col, 1);
      if (curr == 'L' && count == 0) {
        newRow[col] = '#';
        changed = true;
      } else if (curr == '#' && count >= 4) {
        newRow[col] = 'L';
        changed = true;
      } else {
        newRow[col] = curr;
      }
    }
    output.push(newRow);
  }
  output.changed = changed;
  return output;
}

var change = false;
var nextStep = map;
do {
  nextStep = doOneStep(nextStep);
  console.log(countSeats(nextStep));
  change = nextStep.changed;
} while (change);

