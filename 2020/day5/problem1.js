
// B = 1
// F = 0

// R = 1
// L = 0

const readline = require('readline');
const fs = require('fs');

function readLines(filename) {
  return new Promise(resolve => {
    const read = [];

    const readInterface = readline.createInterface({
      input: fs.createReadStream(filename),
      output: null,
      console: false
    });

    readInterface.on('line', function(line) {
      const rStr = line.slice(0, -3)
        .replace(/B/g, '1')
        .replace(/F/g, '0');
      const cStr = line.slice(-3)
        .replace(/R/g, '1')
        .replace(/L/g, '0');

      const r = parseInt(rStr, 2);
      const c = parseInt(cStr,2);
      // console.log(r, c);
      read.push(r * 8 + c);
    });

    readInterface.on('close', function(line) {
      resolve(read);
    });
  });
}

async function start(filename) {
  const ids = await readLines(filename);
  const max = ids.reduce((max, curr) => {
    return curr > max ? curr : max;
  }, 0);
  console.log(max, ids.length)

  // Problem 2 - print out the sorted values and copied them to Code to scan for the
  // missing value visually
  ids.sort((a, b) => a - b).forEach(id => console.log(id))
}

start('input.txt');