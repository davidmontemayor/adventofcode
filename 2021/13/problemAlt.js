const fs = require('fs');
const helpers = require('./helpers.js');

function readInput(filename, x, y) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  const points = [];
  lines.filter(line => line.indexOf(',') >= 0).forEach(line => {
    const coords = line.split(',');
    points.push({x: parseInt(coords[0]), y: parseInt(coords[1])}); 
  });

  const folds = lines.filter(line => line.indexOf('=') >=0).map(instruction => {
    const split = instruction.split('=');
    return { axis: split[0][split[0].length - 1], coordinate: parseInt(split[1])}
  })
  
  return { points, folds };
}

function foldMap(points, fold) {
  points.forEach(point => {
    if (fold.axis == 'y' && fold.coordinate < point.y) {
      const newY = point.y - (point.y - fold.coordinate)*2;
      point.y = newY;
    }
    if (fold.axis == 'x' && fold.coordinate < point.x) {
      const newX = point.x - (point.x - fold.coordinate)*2;
      point.x = newX;
    }
  })
}
function part1() {
  const data = readInput('input.txt');
  helpers.logObj(data.folds)

  foldMap(data.points, data.folds[0]);
  
  const mapOfPoints = {}; // hash them to see which ones are unique
  data.points.forEach(point => {
    mapOfPoints[point.x +',' + point.y] = true;
  });
  
  console.log('Unique points left:', Object.keys(mapOfPoints).length)
}

function part2() {
  const data = readInput('input.txt');
  // helpers.logObj(data.folds)

  data.folds.forEach(fold => {
    foldMap(data.points, fold)
  })

  console.log('Unique:', countWithHash(data.points, (point) => point.x + ',' + point.y))
  helpers.renderPoints(data.points, "#");
}

countWithHash = (array, hashingFunction) => {
  const set = {}; // hash them to see which ones are unique  

  array.forEach(item => {
    set[hashingFunction(item)] = true;
  });

  return Object.keys(set).length;
};

part1();
part2();
