const readline = require('readline');
const fs = require('fs');

function readLines(filename) {
  return new Promise(resolve => {
    const read = [];

    const readInterface = readline.createInterface({
      input: fs.createReadStream(filename),
      output: null,
      console: false
    });

    readInterface.on('line', function(line) {
      read.push(line);
    });

    readInterface.on('close', function(line) {
      resolve(read);
    });
  });
}

async function start(filename) {
  const result = await readLines(filename);
  const slope1 = countTrees(result, 1, 1);
  const slope2 = countTrees(result, 3, 1);
  const slope3 = countTrees(result, 5, 1);
  const slope4 = countTrees(result, 7, 1);
  const slope5 = countTrees(result, 1, 2);
  console.log('Total Trees: ',
    slope1,
    slope2,
    slope3,
    slope4,
    slope5
    );
  console.log(slope1 * slope2 * slope3 * slope4 * slope5)
}

function countTrees(result, xSlope, ySlope) {
  var x = 0;
  var line = 0;
  var count = 0;
  for (var i = 0; i < result.length - 1; i++) {
    console.log(line)
    line = line + ySlope;
    console.log(line)
    x = x + xSlope;
    if (result[line]) {
      const foundTree = isTree(result[line],[x]);
      count = count + foundTree;
    }
  }
  return count;
}

function isTree(string, indexes) {
  return indexes.reduce((acc, index) => {
    const realIndex = index % string.length;
    return acc + (string[realIndex] == '#' ? 1 : 0);
  }, 0);
}

start('input.txt');