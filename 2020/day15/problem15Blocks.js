const fs = require('fs');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const line = input.split('\n')[0];

  // Processing
  return line.split(',').map(x => parseInt(x));
}

const numbers = readInput('input.txt');

// 100,000 ~ 6.5 secs
// 1,000,000 ~ 7.8 secs
const blockSize = 256;
console.log(blockSize)
const blocks = [];

function getBlock(number) {
  const idx = Math.floor(number / blockSize)
  var block = blocks[idx];
  if (!block) {
    blocks[idx] = [];
    block = blocks[idx];
  }
  const mod = number % blockSize;
  if (!block[mod]) {
    block[mod] = [];
  }
  return block[mod];
}

function setBlock(number, value) {
  const idx = Math.floor(number / blockSize)
  var block = blocks[idx];
  if (!block) {
    blocks[idx] = [];
    block = blocks[idx];
  }
  block[number] = [value];
}

numbers.forEach((number, idx) => setBlock(number, idx));

// 100 000 - 409
// 1 000 000 - 155
// 10 000 000 - 3155
// 20 000 000 - 30839
// 30 000 000 - 47205
var previous = numbers[numbers.length - 1];
const start = new Date();
for (var i = numbers.length; i < 30000000; i++) {
  const arr = getBlock(previous);
  if (arr.length <= 1) {
    previous = 0;
    getBlock(0).push(i);
  } else {
    const diff = arr[arr.length - 1] - arr[arr.length - 2];
    previous = diff;
    const diffArr = getBlock(diff);
    if (diffArr) {
      diffArr.push(i);
      if (diffArr.length > 2) {
        diffArr.shift()
      }
    } else {
      diffArr = [i];
    }
  }
}

console.log(previous)
console.log('Time:', new Date() - start)
