const readline = require('readline');
const fs = require('fs');

function readLines(filename) {
  return new Promise(resolve => {
    const values = [];

    const readInterface = readline.createInterface({
      input: fs.createReadStream(filename),
      output: null,
      console: false
    });

    readInterface.on('line', function(line) {
      if (line.trim().length == 0) {
        // nothing
      } else {
        values.push(parseInt(line));
      }
    });

    readInterface.on('close', function(line) {
      resolve(values);
    });
  });
}

function findInSorted(search, input) {
  for (var j = input.length; j--; j >= 0) {
    if (search == input[j]) {
      return true;
    }
    if (search > input[j]) {
      return false;
    }
  }
  return false;
}

function checkIfSum(valueToCheck, array) {
  array.sort((a,b) => a - b);
  for (var i = 0; i < array.length; i ++) {
    const found = findInSorted(valueToCheck - array[i], array);
    // console.log(array[i], 'looking for', valueToCheck - array[i], 'found?', found);
    if (found) {
      return true;
    }
  }
  return false;
}

async function start(filename, preamble) {
  const fullArray = await readLines(filename);
  console.log(fullArray);

  for (var i = preamble; i < fullArray.length; i++) {
    const isSum = checkIfSum(fullArray[i], fullArray.slice(i - preamble, i));
    if (!isSum) {
      console.log(fullArray[i]);
      return;
    }
  }

}

// start('sample.txt', 5);
start('input.txt', 25);