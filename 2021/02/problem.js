const fs = require('fs');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  return lines.map(x => x.split(" "))
    .map(x => [x[0], parseInt(x[1])]);
}

function arraySum(array) {
  return array.reduce((prev, curr) => prev + curr);
}

function part1() {
  const data = readInput('input.txt');
  let horizontal = 0;
  let depth = 0;
  data.forEach(instruction => {
    switch(instruction[0]) {
      case 'forward': horizontal+=instruction[1]; break;
      case 'down': depth+=instruction[1]; break;
      case 'up': depth-=instruction[1]; break;
    }
  });
  console.log(horizontal, depth, horizontal * depth);
}

// Three value window
function part2() {
  const data = readInput('input.txt');
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  data.forEach(instruction => {
    switch(instruction[0]) {
      case 'forward': 
        horizontal+=instruction[1]; 
        depth+= aim * instruction[1];
        break;
      case 'down': aim+=instruction[1]; break;
      case 'up': aim-=instruction[1]; break;
    }
  });
  console.log(horizontal, depth, horizontal * depth);
}

part2();
