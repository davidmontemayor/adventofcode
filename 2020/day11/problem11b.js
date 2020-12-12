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
    console.log(rowString, (rowString.match(/\#/g) || []).length)
  }
  return sum;
}

const map = readInput('input.txt');
// State -> New state
// Forever until no changes are made

function doOneStep(map) {
  var changed = false;

  function valid(i, j) {
    return map[i] && map[i][j];
  }

  function ocupado(i, j) {
    const char = valid(i, j) ? map[i][j] : '.';
    if (char === '#') {
      return 1;
    } else if (char == 'L') {
      return 2;
    }
    return 0;
  }

  function checkDirection(row, col, diffRow, diffCol) {
    var mult = 1;
    while(valid(row + diffRow * mult, col + diffCol * mult)) {
      var oc = ocupado(row + diffRow * mult, col + diffCol * mult);
      if (oc == 1) {
        return 1;
      } else if (oc == 2) { // empty seat
        return 0;
      }
      mult++;
    }
    return 0;
  }

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

      const count =
        checkDirection(row, col, -1, -1) +
        checkDirection(row, col, -1, 0) +
        checkDirection(row, col, -1, 1) +
        checkDirection(row, col, 0, -1) +
        checkDirection(row, col, 0, +1) +
        checkDirection(row, col, 1, -1) +
        checkDirection(row, col, 1, 0) +
        checkDirection(row, col, 1, 1);
      // console.log(count);
      // newRow[col] = count;
      if (curr == 'L' && count == 0) {
        newRow[col] = '#';
        changed = true;
      } else if (curr == '#' && count >= 5) {
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

  // nextStep = doOneStep(nextStep);
  // console.log(countSeats(nextStep));

do {
  nextStep = doOneStep(nextStep);
  console.log(countSeats(nextStep));
  change = nextStep.changed;
} while (change);

