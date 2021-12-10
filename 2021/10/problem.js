const fs = require('fs');
const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  return lines;
}

const open = '([{<';
const close = ')]}>';
const points = [3, 57, 1197, 25137]
const points2 = [1, 2, 3, 4]

function isOpen(char) {
  return open.indexOf(char) >= 0;
}

function isClose(char) {
  return close.indexOf(char) >= 0;
}

function getClose(char) {
  return close[open.indexOf(char)];
}

function getPoints(char) {
  return points[close.indexOf(char)];
}

function getPointsPart2(char) {
  return points2[open.indexOf(char)];
}

function part1() {
  const data = readInput('input.txt');
  console.log(data)
  var sum = 0;

  data.forEach(line => {
    var characterStack = [];
    characterStack.push(line[0]); //assume open thing
    for (var i = 1; i < line.length; i++ ) {
      if (isOpen(line[i])) {
        characterStack.push(line[i]);
        continue;
      }

      if (isClose(line[i])) {
        const expected = getClose(characterStack[characterStack.length - 1]);
        if (expected == line[i]) {
          characterStack.pop();
          continue;
        }
        console.log('ERROR - mismatch', line[i], getPoints(line[i]));
        sum += getPoints(line[i])
        break;
      }
    }
  })
  console.log(sum)
}

function part2() {
  const data = readInput('input.txt');
  const invalidArray = [];
  
  data.forEach(line => {
    var characterStack = [];
    characterStack.push(line[0]); //assume open character
    var corrupted = false;
    for (var i = 1; i < line.length; i++ ) {
      if (isOpen(line[i])) {
        characterStack.push(line[i]);
        continue;
      }

      if (isClose(line[i])) {
        const expected = getClose(characterStack[characterStack.length - 1]);
        if (expected == line[i]) {
          characterStack.pop();
          continue;
        }
        corrupted = true;
        break;
      }
    }
    if (!corrupted) {
      var total = 0;
      for (var i = characterStack.length - 1; i >= 0; i --) {
        total= total * 5;
        total += getPointsPart2(characterStack[i]);
      }
      invalidArray.push(total)
    }
  })
  const sorted = helpers.sortNumArray(invalidArray)
  console.log(sorted[Math.floor(sorted.length / 2)])
}

part2();
