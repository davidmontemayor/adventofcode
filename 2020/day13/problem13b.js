const fs = require('fs');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  const filtered = lines[1].split(',');
  const out = []
  const buses = []
  const times = []
  filtered.forEach((v, index) => {
    if (v == 'x') {
      return;
    }
    out.push({id: parseInt(v), offset: index});
  });
  return out;
}

const input = readInput('input.txt');

var found = false;

var maxMatch = 0;
var currTs = 0;
// To make this performant, the step size becomes the LCM at each synchronization point (the next
// sync point MUST be a multiple of the LCM).
var currStep = input[0].id;
do {
  currTs = currTs + currStep;

  for (var i = 1; i< input.length; i++) {
    const desiredDeparture = (currTs + input[i].offset);
    if (desiredDeparture % input[i].id != 0) {
      break;
    }
    if (i > maxMatch) {
      maxMatch = i;
      currStep = lcm(currStep, input[i].id);
    }
    if (i == input.length - 1) {
      console.log('FOUND IT!', currTs)
      found = true;
    }
  }
} while (found == false)
