const fs = require('fs');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  return lines.map(x => parseInt(x));
}

function arraySum(array) {
  return array.reduce((prev, curr) => prev + curr);
}

function part1() {
  // const depthReadings = readInput('sample.txt');
  const depthReadings = readInput('input.txt');
  let previous = Number.MAX_SAFE_INTEGER;
  let increases = 0;
  depthReadings.forEach(value => {
    let increase = value > previous ? 1 : 0;
    increases+= increase;
    previous = value;
  })
  console.log(increases)
}

// Three value window
function part2() {
  // const depthReadings = readInput('sample.txt');
  const depthReadings = readInput('input.txt');

  var increases = 0;
  for (var i = 0; i <= depthReadings.length - 4; i++) {
    const window1 = depthReadings.slice(i, i + 3);
    const window2 = depthReadings.slice(i + 1, i + 4);
    console.log(window1, arraySum(window1))
    console.log(window2, arraySum(window2))
    const increase = arraySum(window2) > arraySum(window1) ? 1 : 0;
    increases+= increase;
  }
  console.log(increases)
  // let window1 = [];
  // let window2 = [];
  // let increases = 0;
  // depthReadings.forEach(valueStr => {
  //   const value = parseInt(valueStr);
  //   let increase = value > previous ? 1 : 0;
  //   increases+= increase;
  //   previous = value;
  // })
  // console.log(increases)
}
part2();
