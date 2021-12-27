const fs = require('fs');
const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');
  const lineContents = lines[0].split(': ')[1].split(', ')
  // Processing
  const xData = lineContents[0].substr(2).split('..');
  const yData = lineContents[1].substr(2).split('..');
  console.log(xData, yData)
  return {
    x1: parseInt(xData[0]),
    x2: parseInt(xData[1]),
    y1: parseInt(yData[0]),
    y2: parseInt(yData[1]),
  };
}

/*
const data = readInput('sample.txt');
const data = readInput('input.txt');
// Helpers example: 
helpers.sortNumArray())
*/

function part1() {
  const target = readInput('input.txt');

  // Probe behavior
  // start at 0,0
  // x = x + xV
  // y = y + yV
  // x > 0 ? x-- : x > 0 ? x++ : 0
  // y = y - 1
  console.log(target)

  // var xv = 7;
  // var yv = 2;
  
  var maxY = 0;
  var num = 0;
  for (var ixv = -1000; ixv < 1000; ixv++) {
    for (var iyv = -1000; iyv < 1000; iyv++) {
      var xv = ixv;
      var yv = iyv;
      var cx = 0;
      var cy = 0;
      var iterMaxY = 0;
      while (cx <= target.x2 && cy >= target.y1) {
        cx = cx + xv;
        cy = cy + yv;
        iterMaxY = Math.max(iterMaxY, cy);
        xv = xv > 0 ? xv - 1 : xv < 0 ? xv + 1 : 0;
        yv--;
        if (withinTarget(cx, cy, target)) {
          num++;
          console.log(ixv, iyv);
          maxY = Math.max(maxY, iterMaxY);
          // console.log(cx, cy, iterMaxY);
          break;
        }
      }
    }
  }
  console.log(maxY, num);
}

function withinTarget(cx, cy, target) {
  return cx >= target.x1 && cx <= target.x2 && cy >= target.y1 && cy <= target.y2
}

function part2() {
  // not 1526, or 1727
  // have not tried 1762
  // hmm probably 1928
}

part1();
