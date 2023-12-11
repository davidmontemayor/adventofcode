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
      positions[i] = next;
      directions[i] = nextDir;
    }
    distance++;
    
    if (positions[0].x == positions[1].x &&
        positions[0].y == positions[1].y) {
        console.log(distance)
        break;
      }
  }
}

function part2Edges(){
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
  
  var distance = 0;
  
  var mapCopy = [];
  for (var i = 0; i < map.length; i++) {
    mapCopy.push(new Array(map[i].length).fill(' '))
  }

  // TODO: For now, we have to hardcode what character S represents because I didn't want to write it
  //       TBH might as well hardcode that directions too.
  // mapCopy[start.y][start.x] = 'F'// sample4
  mapCopy[start.y][start.x] = '7'// input
  
  // Follow the path, copy ONLY the pieces to mapCopy
  while (true) {
    for (var i = 0; i < positions.length; i++) {
      var next = nextPosition(positions[i], directions[i])
      var nextChar = map[next.y][next.x]
      var nextDir = nextDirection(nextChar, directions[i])
      positions[i] = next
      directions[i] = nextDir
      mapCopy[positions[i].y][positions[i].x] = map[positions[i].y][positions[i].x]
    }
    distance++
    
    if (positions[0].x == positions[1].x &&
        positions[0].y == positions[1].y) {
      break;
    } 
  }
  // helpers.printMatrix(mapCopy, '')

  var enclosedSpace = 0;
  var inside = false;

  // Traverse horizontally and mark as inside/outside when we run into |, OR J and L. F and 7 don't count because they never enclose space.
  mapCopy.forEach(line => {
    line.forEach(char => {
      if (char == '|' || 
          char == 'L' || 
          char == 'J' ) {
        inside = !inside;
      }
      if (inside && char == ' ') {
        enclosedSpace++;
      }
    })
  })

  console.log(enclosedSpace)
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
part2Edges();
console.log('\nPart 2 EDGES time: ', helpers.getTimeMs() - tst0, 'ms\n')

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
