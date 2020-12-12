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

var wayX = 10;
var wayY = 1;
var shipX = 0;
var shipY = 0;

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
    shipX = shipX + value * wayX;
    shipY = shipY + value * wayY;
  }
  if (cmd == 'N') {
    wayY = wayY + value;
  }
  if (cmd == 'S') {
    wayY = wayY - value;
  }
  if (cmd == 'E') {
    wayX = wayX + value;
  }
  if (cmd == 'W') {
    wayX = wayX - value;
  }
  if (cmd == 'R') {
    const rot = rotate(0, 0, wayX, wayY, 1 * value);
    wayX = rot[0];
    wayY = rot[1];
  }

  if (cmd == 'L') {
    const rot = rotate(0, 0, wayX, wayY, -1 * value);
    wayX = rot[0];
    wayY = rot[1];
  }

  // console.log(cmd, value)
  // console.log(shipX, shipY, '|', wayX, wayY)
}
console.log(Math.abs(shipX) + Math.abs(shipY))