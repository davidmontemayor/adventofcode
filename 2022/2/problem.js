const fs = require('fs');
const helpers = require('../helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  return lines.map(line => line.split(' '));
}

const map = {
  'A': 1, // R
  'B': 2, // P
  'C': 3, // S
  'X': 1, // R
  'Y': 2, // P
  'Z': 3  // S
}

const result = {
  'X': {
    'A':3, 
    'B':0,
    'C':6
  },
  'Y': { // Paper
    'A':6, 
    'B':3,
    'C':0
  },
  'Z': {
    'A':0, 
    'B':6,
    'C':3
  }
};
  // X == LOSE
  // Y DRAW
  // Z WIN
const strategyMap = {
  // R
  'A': {
    'X': 'Z',
    'Y': 'X',
    'Z': 'Y',
  }, 
  // P
  'B': { 
    'X': 'X',
    'Y': 'Y',
    'Z': 'Z',
  }, 
  // S
  'C': {
    'X': 'Y',
    'Y': 'Z',
    'Z': 'X',
  } 
}

// const data = readInput('sample.txt');
// Helpers example: 
// helpers.sortNumArray())
// helpers.logObj(someComplicatedObject)
function part1() {
  const data = readInput('input.txt');
  
  var total = 0;
  data.forEach(values => {
    const myPoints = map[values[1]];
    const theirPoints = map[values[0]];
    
    const outcome = myPoints - theirPoints;
    const points = outcome == 1 || outcome == -2 ? 6 : outcome == 0 ? 3 : 0;
    
    total+= points + myPoints;
  })
  console.log(total)
  
}

function part1Alt() {
  const data = readInput('input.txt');
  
  var total = 0;
  data.forEach(values => {
    const myPoints = map[values[1]];
    const points = result[values[1]][values[0]];
    
    total+= points + myPoints;
  })
  console.log(total)
  
}

function part2() {
  const data = readInput('input.txt');
  
  var total = 0;
  data.forEach(values => {
    const myMove = strategyMap[values[0]][values[1]]
    const myPoints = map[myMove];
    const theirPoints = map[values[0]];
    
    const outcome = myPoints - theirPoints;
    const points = outcome == 1 || outcome == -2 ? 6 : outcome == 0 ? 3 : 0;
    
    total+= points + myPoints;
  })
  console.log(total) // 10398
}

function part2Alt() {
  const data = readInput('input.txt');
  
  var total = 0;
  data.forEach(values => {
    const myMove = strategyMap[values[0]][values[1]]
    const myPoints = map[myMove];
    const points = result[myMove][values[0]]
    
    total+= points + myPoints;
  })
  console.log(total) // 10398
}

part1();
part1Alt();

part2();
part2Alt();