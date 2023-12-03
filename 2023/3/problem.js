const fs = require('fs');
const helpers = require('../helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Do further processing
  // return lines.map(line => line.split());
  var map = [];
  lines.forEach(line => {
    var chars = line.split('')
    map.push(chars);
  })
  return map;
}

function part1() {
  const map = readInput('input.txt');
  
  const array = []
  for (var y = 0; y < map.length; y++ ) {
    var line = map[y];
    var curPart = '';
    var hasSymbol = false;
    for (var x = 0; x < line.length; x++) {
      if (isDigit(map[y][x])) {
        curPart = curPart + map[y][x]
      } 

      if (
        curPart.length > 0 && (
        checkPos(map, x -1, y -1) ||
        checkPos(map, x,    y - 1) ||
        checkPos(map, x + 1, y -1) ||

        checkPos(map, x - 1, y) ||
        checkPos(map, x + 1, y) ||
        checkPos(map, x -1, y +1) ||
        checkPos(map, x,    y +1) ||
        checkPos(map, x +1, y +1))
      ) {
        hasSymbol = true;
      }

      // End of line or digits
      if (x == line.length -1 || !isDigit(map[y][x+1])) {
        if (curPart.length > 0 && hasSymbol) {
          array.push(parseInt(curPart))
        }
        curPart = ''
        hasSymbol = false;
      }
    }
  }
  console.log(helpers.arraySum(array))

}

function checkPos(map, x, y) {
  if (map[y] && map[y][x]) {
    // console.log(x, y, map[y][x], isSymbol(map[y][x]))
    return isSymbol(map[y][x])
  }
  return false;
}

function isDigit(char) {
  return char >= '0' && char <= '9';
}

function isSymbol(char) {
  return char != '.' && !isDigit(char);
}

function isStar(char) {
  return char == '*';
}

function part2() {
  const map = readInput('input.txt');
  const array = []

  for (var y = 0; y < map.length; y++ ) {
    var line = map[y];
    var curPart = '';
    var curPos = [];

    for (var x = 0; x < line.length; x++) {
      if (isDigit(map[y][x])) {
        curPart = curPart + map[y][x]
        curPos.push([x, y])
      }
      
      if (x == line.length -1 || !isDigit(map[y][x+1])) {
        if (curPart.length > 0) {
          array.push({ 
            part: parseInt(curPart),
            pos: curPos
          });
        }
        curPart = ''
        curPos = [];
      }
    }    
  }
  
  var ratios = [];
  for (var y = 0; y < map.length; y++ ) {
    var line = map[y];
    var curPart = '';
    var curPos = [];
    for (var x = 0; x < line.length; x++) {
      var set = [];
      if (isStar(map[y][x])) {
        putIf(set, checkGears(array, x -1, y -1));
        putIf(set, checkGears(array, x,    y - 1));
        putIf(set, checkGears(array, x + 1, y -1));

        putIf(set, checkGears(array, x - 1, y));
        putIf(set, checkGears(array, x + 1, y));

        putIf(set, checkGears(array, x -1, y +1));
        putIf(set, checkGears(array, x,    y +1));
        putIf(set, checkGears(array, x +1, y +1));
        if (set.length == 2) {
          ratios.push(set[0] * set[1])
        }
      }
    }
  }
  console.log(helpers.arraySum(ratios))
}

function putIf(array, value) {
  if (!value) {
    return;
  }
  if (array.indexOf(value) < 0) {
    array.push(value)
  }
}

function checkGears(parts, x, y) {
  for (var i = 0; i< parts.length; i++) {
    if (partInPosition(parts[i].pos, x , y)) {
      return parts[i].part;
    }  
  }
  return null;
}

function partInPosition(positions, x, y) {
  var found = false;
  positions.forEach(p => {
    if (p[0] == x && p[1] == y) {
      found = true;
    }
  })
  return found;
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