const fs = require('fs');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const line = input.split('\n')[0];

  // Processing
  return line.split(',').map(x => parseInt(x));
}

const seen = [];
const numbers = readInput('input.txt');
numbers.forEach((number, idx) => seen[number] = [idx]);

console.log(numbers, seen);

var previous = numbers[numbers.length - 1];
for (var i = numbers.length; i < 30000000; i++) {
  const arr = seen[previous];
  if (arr.length <= 1) {
    previous = 0;
    seen[0].push(i);
  } else {
    const diff = arr[arr.length - 1] - arr[arr.length - 2];
    previous = diff;
    const arrDiff= seen[diff];
    if (arrDiff) {
      arrDiff.push(i);
      if (arrDiff.length > 2) {
        arrDiff.shift()
      }
    } else {
      seen[diff] = [i];
    }
  }
}

console.log(previous)
