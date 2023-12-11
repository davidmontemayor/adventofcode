const fs = require('fs');
const helpers = require('../helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');
  var start;
  var map = lines.map((line, idx) => {
    if (line.indexOf('S') >= 0) {
      start = { x: line.indexOf('S'), y: idx};
    }
    return line.split('')
  })
  // Do further processing

  return { start, map}
}

function validUp(char) {
  return char == '|' ||
    char == 'F' ||
    char == '7'
}

function validDown(char) {
  return char == '|' ||
    char == 'J' ||
    char == 'L';
}

function validLeft(char) {
  return char == '-' ||
    char == 'F' ||
    char == 'L';
}

function validRight(char) {
  return char == '-' ||
    char == 'J' ||
    char == '7';
}

const dirs = {
  U: { x: 0, y: -1},
  D: { x: 0, y: +1},
  L: { x: -1, y: 0},
  R: { x: 1 , y: 0}
}

function nextPosition(current, direction) {
  return {
    x: current.x + dirs[direction].x,
    y: current.y + dirs[direction].y
  }
}

function nextDirection(character, direction) {
  if (direction == 'U') {
    if (character == '|') {
      return 'U'
    } else if (character == "F") {
      return 'R'
    } else if (character == '7') {
      return 'L'
    }
  }
  if (direction == 'D') {
    if (character == '|') {
      return 'D'
    } else if (character == "J") {
      return 'L'
    } else if (character == 'L') {
      return 'R'
    }
  }

  if (direction == 'R') {
    if (character == '-') {
      return 'R'
    } else if (character == "J") {
      return 'U'
    } else if (character == '7') {
      return 'D'
    }
  }

  if (direction == 'L') {
    if (character == '-') {
      return 'L'
    } else if (character == "F") {
      return 'D'
    } else if (character == 'L') {
      return 'U'
    }
  }
}

function part1() {
  const {start, map} = readInput('input.txt');
  // assume no false turns
  
  var directions = [];
  var positions = [start, start]
  if (validUp(map[ start.y - 1][start.x])) {
    directions.push('U')
  } 
  if (validLeft(map[ start.y][start.x - 1])) {
    directions.push('L')
  } 
  if (validRight(map[ start.y][start.x + 1])){
    directions.push('R')
  } 
  if (validDown(map[start.y + 1][start.x])) {
    directions.push('D')
  }
  
  var distance = 0;
  while (true) {
    for (var i = 0; i < positions.length; i++) {
      var next = nextPosition(positions[i], directions[i])
      var nextChar = map[next.y][next.x]
      var nextDir = nextDirection(nextChar, directions[i])
      positions[i] = next
      directions[i] = nextDir
    }
    distance++
    
    if (positions[0].x == positions[1].x &&
        positions[0].y == positions[1].y) {
        console.log(distance)
        break;
      }
  }
}

function part2(){
  const {start, map} = readInput('input.txt');
  // assume no false turns
  var directions = [];
  var positions = [start, start]
  if (validUp(map[start.y - 1][start.x])) {
    directions.push('U')
  } 
  if (validLeft(map[ start.y][start.x - 1])) {
    directions.push('L')
  } 
  if (validRight(map[ start.y][start.x + 1])){
    directions.push('R')
  } 
  if (validDown(map[start.y + 1][start.x])) {
    directions.push('D')
  }
  
  // map[start.y][start.x] = 'F'// sample4
  // map[start.y][start.x] = 'F'// sample4
  
  var distance = 0;
  var mapCopy = [];
  for (var i = 0; i < map.length; i++) {
    mapCopy.push(map[i].slice(0))
  }
  // Hardcode what S represents in the map and copy
  map[start.y][start.x] = '7'// input
  mapCopy[start.y][start.x] = '▓'
  
  while (true) {
    for (var i = 0; i < positions.length; i++) {
      var next = nextPosition(positions[i], directions[i])
      var nextChar = map[next.y][next.x]
      var nextDir = nextDirection(nextChar, directions[i])
      positions[i] = next
      directions[i] = nextDir
      mapCopy[positions[i].y][positions[i].x] = '▓'
    }
    distance++
    
    if (positions[0].x == positions[1].x &&
        positions[0].y == positions[1].y) {
      console.log(distance)
      break;
    } 
  }
  // helpers.printMatrix(map, '')
  // helpers.printMatrix(mapCopy, '')
  
  var highRes = [];
  for (var i = 0; i < mapCopy.length; i++) {
    var s1 = '';
    var s2 = '';
    var s3 = '';
    for (var j = 0; j < mapCopy[i].length; j++) {
      if (mapCopy[i][j] == '▓') {
        if (map[i][j] == '|') {
          s1 = s1 + " ▓ "
          s2 = s2 + " ▓ "
          s3 = s3 + " ▓ "
        } else if (map[i][j] == '7') {
          s1 = s1 + '   '
          s2 = s2 + '▓▓ '
          s3 = s3 + ' ▓ '
        } else if (map[i][j] == 'F') {
          s1 = s1 + '   '
          s2 = s2 + ' ▓▓'
          s3 = s3 + ' ▓ '
        } else if (map[i][j] == 'J') {
          s1 = s1 + ' ▓ '
          s2 = s2 + '▓▓ '
          s3 = s3 + '   '
        } else if (map[i][j] == 'L') {
          s1 = s1 + ' ▓ '
          s2 = s2 + ' ▓▓'
          s3 = s3 + '   '
        } else if (map[i][j] == '-') {
          s1 = s1 + '   '
          s2 = s2 + '▓▓▓'
          s3 = s3 + '   '
        }
      } else {
        s1 = s1 + '   '
        s2 = s2 + '   '
        s3 = s3 + '   '
      }
    }
    highRes.push(s1.split(''))
    highRes.push(s2.split(''))
    highRes.push(s3.split(''))
  }

  // helpers.printMatrix(highRes, '')
  
  fill(highRes, 0, 0, 'X', ' ')

  // an empty space is a completely empty 3x3 space
  var enclosedSpace = 0;
  for (var i = 0; i < highRes.length; i = i + 3) {
    for (var j = 0; j < highRes[i].length; j = j + 3) {
      if (highRes[i][j] == ' ' && highRes[i][j + 1] == ' ' && highRes[i][j + 2] == ' ' &&
          highRes[i + 1][j] == ' ' && highRes[i + 1][j + 1] == ' ' && highRes[i + 1][j + 2] == ' ' &&
          highRes[i + 2][j] == ' ' && highRes[i + 2][j + 1] == ' ' && highRes[i + 2][j + 2] == ' '
      ) {
        enclosedSpace++;
      }
    }
  }
  console.log(enclosedSpace)
}

function isValidSquare(map, x, y, colourToReplace) {
  
  const valid = y >= 0 && y < map.length && x >= 0 && x < map[y].length &&  map[y][x] === colourToReplace;
  if (valid && map[y][x] == '▓') {
    console.log(valid)
  }
  return valid
}

const directions = [
  [0,1],
  [0,-1],
  [1,0],
  [-1,0]
];

const fill = (grid, y, x, newColor, colorToReplace) => {
  let stack = [{ x, y, colorToReplace, newColor }];

  while (stack.length > 0) {
    let current = stack.pop();
    for (let i = 0; i < directions.length; i++) {
      // console.log(stack)
      let child = {
        x: current.x + directions[i][0],
        y: current.y + directions[i][1]
      }
      if (isValidSquare(grid, child.x, child.y, colorToReplace)) {
        // console.log('updated to ',child.x, child.y, 'new:', newColor)

        grid[child.y][child.x] = newColor
        stack.push(child);
        // console.log(stack)
      }
    }
  }
}

// OUTPUT 
// Answer: 6907
console.log('==============================')
var tst0 = helpers.getTimeMs();
part1();
console.log('\nPart 1 time: ', helpers.getTimeMs() - tst0, 'ms\n')

// Answer: 541
console.log('==============================')
tst0 = helpers.getTimeMs();
part2();
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
