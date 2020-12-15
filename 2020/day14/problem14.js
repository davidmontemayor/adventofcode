// TAG: Interview question
const fs = require('fs');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  return lines;
}

const lines = readInput('input.txt');
const memory = [];

var currMask;
for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf('mask = ') == 0) {
    currMask = lines[i].substring(7);
  } else if (lines[i].indexOf('mem[') == 0) {
    const addr = parseInt(lines[i].substring(4, lines[i].indexOf(']')));
    const value = parseInt(lines[i].substring(lines[i].indexOf(' = ') + 3))
    const base2 = value.toString(2).padStart(36, '0');

    const newValue = applyMask(currMask, value);

    memory[addr] = newValue;
  }
}

const sum = memory.reduce((acc, v) => acc + v, 0);
console.log(sum)

function applyMask(mask, decimal) {
  var base2 = decimal.toString(2).padStart(36, '0');
  for (var i = 0; i < 36; i++) {
    if (mask.charAt(i) == '1') {
      base2 = base2.substring(0,i) + '1' + base2.substring(i + 1);
    }
    if (mask.charAt(i) == '0') {
      base2 = base2.substring(0,i) + '0' + base2.substring(i + 1);
    }
  }
  return parseInt(base2, 2);
}
