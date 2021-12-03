const fs = require('fs');
const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  return lines.map(x => x);
}

/*
const data = readInput('sample.txt');
const data = readInput('input.txt');
// Example:
helpers.sortNumArray())
*/

function part1() {
  const data = readInput('input.txt');
  const zeroes = Array(12).fill(0);
  const ones = Array(12).fill(0);
  
  data.forEach(binaryNumber => {
    for (var i = 0; i < binaryNumber.length; i++) {
      if (binaryNumber[i] == '1') {
        ones[i]++;
      } else {
        zeroes[i] = zeroes[i] + 1; 
      }
    }
  });
  console.log(zeroes);
  console.log(ones);
  // what if they're equal? - not an issue for this one
  var gamma = '';
  var epsilon = '';
  for (var i = 0; i < zeroes.length; i++) {
    if (zeroes[i] > ones[i]) {
      gamma += '0';
      epsilon += '1';
    } else {
      gamma += '1';
      epsilon += '0';
    }
  }
  console.log(gamma, epsilon);
  console.log(parseInt(gamma,2), parseInt(epsilon,2));
  console.log(parseInt(gamma,2) * parseInt(epsilon,2))
}

function part1Better() {
  const data = readInput('input.txt');

  var gamma = '';
  var epsilon = '';
  for (var i = 0; i < data[0].length; i ++) {
    const zeroCount = data.map((string) => string[i]).filter(x => x == '0').length;
    gamma+= zeroCount > data.length/2 ? 0 : 1; 
    epsilon+= zeroCount > data.length/2 ? 1 : 0; 
  }

  console.log(gamma, epsilon);
  console.log(parseInt(gamma,2), parseInt(epsilon,2));
  console.log(parseInt(gamma,2) * parseInt(epsilon,2))
}

function part2a1(mostCommon) {
  const data = readInput('input.txt');
  var filtered = data;
  for (var i = 0; i < data[0].length; i++) {
    const zeroCount = filtered.map((string) => string[i]).filter(x => x == '0').length;
    
    // scrubber - we want least common
    // oxygen - we want most common
    if (mostCommon) {
      var filterCharacter = zeroCount > filtered.length /2 ? 0 : 1;
    } else {
      var filterCharacter = zeroCount <= filtered.length /2 ? 0 : 1;
    }
    filtered = filtered.filter(number => {
      return number[i] == filterCharacter;
    });
    console.log(filtered);
    if (filtered.length == 1) {
      return filtered[0];
    }
  }
}


// part1();
// part1Better();

const oxygen = part2a1(true);
const scrubber = part2a1(false);
//Expected: 111100011111 001001100101

console.log(oxygen, scrubber);
console.log(parseInt(oxygen,2) * parseInt(scrubber,2));