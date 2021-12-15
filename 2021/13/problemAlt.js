const fs = require('fs');
const helpers = require('./helpers.js');

function readInput(filename, x, y) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  const map = Array(y).fill().map(() => Array(x).fill(0));
  const points = [];
  lines.filter(line => line.indexOf(',') >= 0).forEach(line => {
    const coords = line.split(',');
    points.push({x: parseInt(coords[1]), y: parseInt(coords[0])}); 
  });

  const folds = lines.filter(line => line.indexOf('=') >=0).map(instruction => {
    const split = instruction.split('=');
    return { axis: split[0][split[0].length - 1], coordinate: parseInt(split[1])}
  })
  
  return { points, folds };
}

/*
const data = readInput('sample.txt');
const data = readInput('input.txt');
// Example:
helpers.sortNumArray())
*/

function foldMap(map, fold) {
  for (var y = 0; y < map.length; y ++) {
    for (var x = 0; x < map[y].length; x ++) { 
      if (fold.axis == 'y' && fold.coordinate < y) {
        if (map[y][x] == 1) {
          map[y][x] = 0;
          const newY = y - (y - fold.coordinate)*2;
          map[newY][x] = 1;
        }
      } 
      
      if (fold.axis == 'x' && fold.coordinate < x) {
        if (map[y][x] == 1) {
          map[y][x] = 0;
          const newX = x - (x - fold.coordinate)*2;
          map[y][newX] = 1;
        }
      }
    }
  }
  console.log('======')
  const count = map.reduce((prev, row) => prev += row.filter(x => x == 1).length, 0)
  console.log(count)
  // return newData;
}
function part1() {
  // const data = readInput('sample.txt', 11, 15);
  const data = readInput('input.txt', 1310, 894);
  // helpers.printMatrix(data.map, '')
  helpers.logObj(data.folds)

  foldMap(data.map, data.folds[0]);
  
  console.log('======')
  // helpers.printMatrix(data.map, '')
  const count = data.map.reduce((prev, row) => prev += row.filter(x => x == 1).length, 0)
  console.log(count)
}

function part2() {
  const data = readInput('input.txt', 1310, 894);
  // helpers.printMatrix(data.map, '')
  helpers.logObj(data.folds)

  data.folds.forEach(fold => {
    foldMap(data.map, fold)
  })

  data.map.slice(0,20).forEach(row =>
    console.log(row.slice(0,50).join('').replaceAll('0', ' ').replaceAll('1','#'))
  )
}

part2();
