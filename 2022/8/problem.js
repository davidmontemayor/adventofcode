const fs = require('fs');
const helpers = require('../helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Do further processing
  // return lines.map(line => line.split());
  return lines;
}

function part1() {
  const data = readInput('input.txt');
  const width = data[0].length;
  const height = data.length;
  var innerCount = 0;
  for (var i = 1; i < height - 1; i ++){
    for (var j = 1; j < width - 1; j++) {
      const visible = checkTree(j, i, data, width, height);
      if (visible) {
        innerCount++;
      }
    }
  }
  const count = innerCount + 2 * (height-1) + 2 * (width-1);
  console.log(count);
}

function checkTree(x, y, trees, width, height) {
  const myHeight = trees[y][x];
  var maxLeft = 0;
  var maxRight = 0;
  var maxTop = 0;
  var maxBottom = 0;
  for (var i = 0; i < width; i++) {
    if (i < x) {
      maxLeft = Math.max(maxLeft, trees[y][i]);
    }
    if (i > x) {
      maxRight = Math.max(maxRight,trees[y][i]);
    }
  }
  for (var i = 0; i < height; i++) {
    if (i < y) {
      maxTop = Math.max(maxTop, trees[i][x]);
    }
    if (i > y) {
      maxBottom = Math.max(maxBottom, trees[i][x]);
    }
    
  }
  const lowestEdge = Math.min(Math.min(Math.min(maxTop, maxBottom), maxLeft), maxRight);
  if (myHeight > lowestEdge) {
    return true;
  }
  return false;
}

function part2() {
  // countTrees
  const data = readInput('input.txt');
  const width = data[0].length;
  const height = data.length;
  var maxScore = 0;
  
  for (var i = 1; i < height - 1; i ++){
    for (var j = 1; j < width - 1; j++) {
      const score = countTrees(j, i, data, width, height);
      maxScore = Math.max(score, maxScore)
    }
  }
  console.log(maxScore)
}


function countTrees(x, y, trees, width, height) {
  const myHeight = trees[y][x];
  var maxLeft = 0;
  var maxRight = 0;
  var maxTop = 0;
  var maxBottom = 0;
  for (var i = x - 1; i >= 0; i --) {
    maxLeft++;
    if (trees[y][i] >= myHeight) {
      break;
    }
  }

  for (var i = x + 1; i < width; i ++) {
    maxRight++;
    if (trees[y][i] >= myHeight) {
      break;
    } 
  }

  for (var i = y - 1; i >= 0; i --) {
    maxTop++;
    if (trees[i][x] >= myHeight) {
      break;
    } 
  }

  for (var i = y + 1; i < height; i ++) {
    maxBottom++;
    if (trees[i][x] >= myHeight) {
      break;
    } 
  }
  const score = maxLeft * maxRight * maxTop * maxBottom;
  return score;
}

part1();
part2();

console.log(1693,
  422059
  )
// const data = readInput('sample.txt');
// Helpers example: 
// helpers.sortNumArray())
// helpers.logObj(someComplicatedObject)
// helpers.containsAll(setA, setB)
// helpers.intersection(setA, setB)
// helpers.difference(setA, setB)
// helpers.union(setA, setB)