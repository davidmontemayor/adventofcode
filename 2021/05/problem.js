const fs = require('fs');
const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  return lines.map(x => {
    const points = x.split(' -> ');
    const one = points[0].split(',')
    const two = points[1].split(',')
    return {
      x1: parseInt(one[0]),
      y1: parseInt(one[1]),
      x2: parseInt(two[0]),
      y2: parseInt(two[1]),
    }
  });
}

function part1() {
  const lines = readInput('input.txt');
  const map = Array(1000).fill().map(() => Array(1000).fill(0));
  
  lines.forEach(line => {
    const horizontal = line.x2 - line.x1;
    const vertical = line.y2 - line.y1
    const xMul = horizontal > 0 ? 1 : horizontal < 0 ? -1 : 0;
    const yMul = vertical > 0 ? 1 : vertical < 0 ? -1 : 0;
    
    if (horizontal != 0 && vertical != 0) {
      return;
    }
    const distance = Math.abs(horizontal) + Math.abs(vertical);
    for (var i = 0; i <= distance; i++) {
      map[line.y1 + yMul * i][line.x1 + xMul *i] ++; 
    }
  });
  
  const count = map.reduce((prev, row) => prev += row.filter(value => value > 1).length, 0)
  console.log(count)
}

function part2() {
  const lines = readInput('input.txt');
  const map = Array(1000).fill().map(() => Array(1000).fill(0));
  
  lines.forEach(line => {
    const horizontal = line.x2 - line.x1;
    const vertical = line.y2 - line.y1
    const xMul = horizontal > 0 ? 1 : horizontal < 0 ? -1 : 0;
    const yMul = vertical > 0 ? 1 : vertical < 0 ? -1 : 0;
    
    const distance = horizontal != 0 && vertical != 0 ?
      Math.abs(horizontal) :
      Math.abs(horizontal) + Math.abs(vertical);
    for (var i = 0; i <= distance; i++) {
      map[line.y1 + yMul * i][line.x1 + xMul *i] ++; 
    }
  });
  
  const count = map.reduce((prev, row) => prev += row.filter(value => value > 1).length, 0)
  console.log(count)
}

part2();


