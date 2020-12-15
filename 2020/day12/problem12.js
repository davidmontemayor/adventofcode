const fs = require('fs');

function sortNumArray(array) {
  return array.slice(0).sort((a,b) => a-b);
}

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  return lines.filter(line => line.trim().length > 0).map(line => [line.substring(0,1), parseInt(line.substring(1))]);
}

const input = readInput('input.txt');

var x = 0;
var y = 0;

var dirX = 1;
var dirY = 0;

// That feeling when you've forgotten your math and have to look it up
function rotate(cx, cy, x, y, angle) {
  var radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [Math.round(nx), Math.round(ny)];
}

for (var i = 0; i < input.length; i++) {
  const cmd = input[i][0];
  const value = input[i][1];
  if (cmd == 'F') {
    x = x + value * dirX;
    y = y + value * dirY;
  }
  if (cmd == 'N') {
    y = y + value;
  }
  if (cmd == 'S') {
    y = y - value;
  }
  if (cmd == 'E') {
    x = x + value;
  }
  if (cmd == 'W') {
    x = x - value;
  }
  if (cmd == 'R') {
    // assume 90 ...etc
    const rot = rotate(0, 0, dirX, dirY, value);
    dirX = rot[0];
    dirY = rot[1];
  }

  if (cmd == 'L') {
    const rot = rotate(0, 0, dirX, dirY, -1 * value);
    dirX = rot[0];
    dirY = rot[1];
  }
  // console.log(cmd, value)
  // console.log(x, y, '|', dirX, dirY)
}
console.log(Math.abs(x) + Math.abs(y))