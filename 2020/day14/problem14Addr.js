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
const memory = {};

var currMask;
for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf('mask = ') == 0) {
    currMask = lines[i].substring(7);
    console.log(currMask);
  } else if (lines[i].indexOf('mem[') == 0) {
    const addr = parseInt(lines[i].substring(4, lines[i].indexOf(']')));
    const value = parseInt(lines[i].substring(lines[i].indexOf(' = ') + 3))
    const base2 = value.toString(2).padStart(36, '0');

    const maskedAddress = applyMask(currMask, addr);
    console.log(addr, value, maskedAddress)

    const addresses = recurse([], "", maskedAddress, 0);
    addresses.forEach(addr => memory[''+addr] = value)
  }
}

const sum = Object.keys(memory).reduce((acc, key) => acc + memory[key], 0);
console.log(sum)

function applyMask(mask, decimal) {
  var base2 = decimal.toString(2).padStart(36, '0');
  for (var i = 0; i < 36; i++) {
    if (mask.charAt(i) == '1') {
      base2 = base2.substring(0,i) + '1' + base2.substring(i + 1);
    }
    if (mask.charAt(i) == 'X') {
      base2 = base2.substring(0,i) + 'X' + base2.substring(i + 1);
    }
  }
  return base2;
}

function recurse(accumulator, string, maskedAddress, index) {
  if (index == 36) {
    accumulator.push(parseInt(string, 2));
    return;
  }
  const bit = maskedAddress.charAt(index);
  if (bit == '0') {
    recurse(accumulator, string + '0', maskedAddress, index + 1);
  } else if (bit == '1') {
    recurse(accumulator, string + '1', maskedAddress, index + 1);
  } else if (bit == 'X') {
    recurse(accumulator, string + '0', maskedAddress, index + 1);
    recurse(accumulator, string + '1', maskedAddress, index + 1);
  }
  return accumulator;
}
