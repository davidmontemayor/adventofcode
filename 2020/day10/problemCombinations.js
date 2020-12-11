// Interview question?
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
  return lines.filter(line => line.trim().length > 0).map(line => parseInt(line));
}

const input = readInput('input.txt');

const adapters = sortNumArray(input);
console.log(adapters);

var highest = adapters[adapters.length - 1] + 3;
adapters.push(highest)
adapters.unshift(0);

// console.log(adapters)

// First, for each adapter index, create an array of valid connection indexes
const validAdapterIndexes = [];
for (var i = 0; i < adapters.length; i++) {
  validAdapterIndexes[i] = [];
  for (var j = i + 1; j < adapters.length; j++) {
    const diff = adapters[j] - adapters[i];
    if (diff <= 3) {
      validAdapterIndexes[i].push(j);
    }
  }
}

// Print adapters, index and valid connection indexes
// for (var i = 0; i < adapters.length; i ++) {
//   console.log(adapters[i], i, validAdapterIndexes[i])
// }

// Adapter sums will have a count of how many valid paths are from here on out
const adapterSums = [];
// Assign a value of 1 to the last "adapter" (the device)
adapterSums[validAdapterIndexes.length - 1] = 1;

// For each adapter, sum the number of paths from each of the valid connections
// The count at index 0 will have the answer
for (var i = validAdapterIndexes.length - 2; i >= 0; i--) {
  // console.log(adapterCounts[i])
  adapterSums[i] = validAdapterIndexes[i].reduce((acc, curr) => acc = acc + adapterSums[curr], 0);
}

// console.log(adapterSums)
console.log('Answer:', adapterSums[0])
