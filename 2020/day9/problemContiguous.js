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
        // parse current answer,
        values.push(parseInt(line));
      }
    });

    readInterface.on('close', function(line) {
      resolve(values);
    });
  });
}

function sumToValue(array, startIndex, wantedValue) {
  var sum = 0;
  for (var j = startIndex; j < array.length; j++) {
    sum += array[j];
    if (sum == wantedValue) {
      return array.slice(startIndex, j + 1);
    }
    if (sum > wantedValue) {
      return [];
    }
  }
  return [];
}

async function start(filename, wantedValue) {
  const fullArray = await readLines(filename);

  for (var i = 0; i < fullArray.length; i++) {
    const result = sumToValue(fullArray, i, wantedValue);
    if (result.length > 0) {
      console.log(result)
      result.sort((a,b) => a - b);
      const min = result[0];
      const max = result[result.length -1 ];
      console.log('min:', min);
      console.log('max:', max);
      console.log('Result:', min + max)
      return;
    }
  }

}

// start('sample.txt', 127);
start('input.txt', 133015568);