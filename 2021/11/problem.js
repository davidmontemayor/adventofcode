const fs = require('fs');
const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  return lines.map(line => Array.from(line).map(x => parseInt(x)));
}

function incrementIfValid(data, x, y) {
  if (data[y] != undefined && data[y][x] != undefined && data[y][x] < 10) {
    data[y][x]++;
  }
}

function part1() {
  const data = readInput('sample.txt');
  const next = Array(10).fill().map(() => Array(data[0].length).fill(0));
  
  var x = 0;
  var bursts = 0;
  const steps = 100;
  for (var step = 0; step < steps; step++) {
    // Each step
    // Increase every cell by 1
    for (var i = 0; i < data.length; i ++) { // Rows
      for (var j = 0; j < data[i].length; j++) { //Cols
        const curr = data[i][j];
        data[i][j] = curr + 1;
      }
    }

    // Do passes, for each cell that is EXACTLY 10, burst
    var found = false;
    for (var pass = 0; pass < 20; pass ++) {
      for (var i = 0; i < data.length; i ++) { // Rows
        for (var j = 0; j < data[i].length; j++) { //Cols
          if (data[i][j] != 10) {
            continue;
          }
          bursts ++;
          data[i][j] ++; // make the 10 an 11 so it doesn't explode again
          found = true;
          incrementIfValid(data, j - 1 , i - 1);
          incrementIfValid(data, j - 1, i);
          incrementIfValid(data, j - 1, i + 1);
          incrementIfValid(data, j, i - 1);
          incrementIfValid(data, j, i + 1);
          incrementIfValid(data, j + 1, i - 1);
          incrementIfValid(data, j + 1, i);
          incrementIfValid(data, j + 1, i + 1);
        }
      }
      if (!found) { // no tens, you can stop making passes
        break;
      }
    }

    // Reset >10 to 0
    for (var i = 0; i < data.length; i ++) { // Rows
      for (var j = 0; j < data[i].length; j++) { //Cols
        if (data[i][j] >= 10) {
          data[i][j] = 0;
        }
      }
    }
    
    if (allZeroes(data)) {
      console.log('FOUND IT', step + 1)
      break;
    }
  }
  console.log(bursts)
}

function allZeroes(d) {
  for (var i = 0; i < d.length; i ++) { // Rows
    for (var j = 0; j < d[i].length; j++) { //Cols
      if (d[i][j] != 0) {
        return false;
      }
    }
  }
  return true;
}

function print(d) {
  d.forEach(line => console.log(line.map(x => x == 10 ? 'X' : x > 10 ? 'Y' : x).join('')));
  console.log('--------------------')
}

function part2() {
  
}

part1();
