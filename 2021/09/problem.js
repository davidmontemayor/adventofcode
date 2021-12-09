const fs = require('fs');
const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  return lines.map(line => Array.from(line).map(x => parseInt(x)));
}

/*
const data = readInput('sample.txt');
const data = readInput('input.txt');
// Example:
helpers.sortNumArray())
*/

function part1() {
  const data = readInput('input.txt');
  // console.log(JSON.stringify(data));
  var risk = 0;
  for(var j = 0; j < data.length; j ++) {
    for (var i = 0; i < data[j].length; i++) {
      // console.log(data[j][i])
      var lowestNeighbor = 10;
      lowestNeighbor = Math.min(cellHeight(data, i - 1, j), lowestNeighbor);
      lowestNeighbor = Math.min(cellHeight(data, i + 1, j), lowestNeighbor);
      lowestNeighbor = Math.min(cellHeight(data, i, j - 1), lowestNeighbor);
      lowestNeighbor = Math.min(cellHeight(data, i, j + 1), lowestNeighbor);
      if (data[j][i] < lowestNeighbor) {
        // console.log(data[j][i], j, i)
        risk += data[j][i] + 1;
      }
    }
    // console.log('=======================')
  }
  console.log(risk)
}

function findBasin(data, visited, j, i) {
  if (!validCell(data, i, j)) {
    return 0;
  }
  
  if (visited[j][i] || cellHeight(data, i, j) >= 9) {
    return 0;
  }
  
  visited[j][i] = true;
  var size = 1;
  size+= findBasin(data, visited, j - 1, i);
  size+= findBasin(data, visited, j + 1, i);
  size+= findBasin(data, visited, j, i - 1);
  size+= findBasin(data, visited, j, i + 1);

  return size;
}

function cellHeight(data, x, y) {
  if (validCell(data, x, y)) {
    return data[y][x];
  }
  return 99;
}

function validCell(data, x, y) {
  if (data[y] != undefined && data[y][x] != undefined) {
    return true;
  }
  return false;
}

function part2() { // Find basins
  const data = readInput('input.txt');
  // console.log(JSON.stringify(data));
  var largestBasins = []; // always sorted
  for(var j = 0; j < data.length; j ++) {
    for (var i = 0; i < data[j].length; i++) {
      // console.log(data[j][i])
      var lowestNeighbor = 10;
      lowestNeighbor = Math.min(cellHeight(data, i - 1, j), lowestNeighbor);
      lowestNeighbor = Math.min(cellHeight(data, i + 1, j), lowestNeighbor);
      lowestNeighbor = Math.min(cellHeight(data, i, j - 1), lowestNeighbor);
      lowestNeighbor = Math.min(cellHeight(data, i, j + 1), lowestNeighbor);
      if (data[j][i] < lowestNeighbor) {
        const visited = Array(data.length).fill().map(() => Array(data[0].length).fill(false));
        // console.log(data[j][i], j, i)
        // risk += data[j][i] + 1;
        const basinSize = findBasin(data, visited, j, i);
        largestBasins.push(basinSize);
      }
    }
    // console.log('=======================')
  }
  helpers.sortNumArray(largestBasins)
  console.log(helpers.sortNumArray(largestBasins).splice(-3).reduce((prev, curr) => prev * curr, 1))
}

part2();
