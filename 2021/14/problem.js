const fs = require('fs');
const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  const transforms = {};
  lines.slice(2).forEach(x => { 
    const split = x.split(' -> ')
    return transforms[split[0]] = split[1];

  });
  return { string: lines[0], transforms}
}

function part1Naive() {
  const data = readInput('input.txt');
  
  var current = data.string;
  for (var step = 0; step < 10; step++) {
    var next = '';
    for (var i = 0; i < current.length - 1; i++) {
      const piece = current.substring(i, i + 2);
      const replacement = data.transforms[piece];
      if (replacement) {
        next+= piece[0] + replacement;
      } else {
        next+= piece[0];
      } 
    }
    next+= current[current.length -1];
    current = next;
  }
  // count frequency of characters
  const freq = {};
  for (var i = 0; i < current.length; i++) {
    if (!freq[current[i]]) {
      freq[current[i]] = 0;
    }
    freq[current[i]]++;
  }
  var max = 0;
  var min = 10000000;
  
  helpers.logObj(freq)
  Object.keys(freq).forEach(char => {
    max = Math.max(max, freq[char])
    min = Math.min(min, freq[char])
  })
  console.log(max, min, max-min)
}

function addCountToMap(map, key, num) {
  if (!map[key]) {
    map[key] = 0;
  }
  map[key] = map[key] + num;
}

function part1Map() {
  const data = readInput('input.txt');
  
  var pairMap = { };
  var characterCount = {};
  for (var i = 0; i < data.string.length - 1; i++) {
    addCountToMap(pairMap, data.string.substring(i, i + 2), 1);
    addCountToMap(characterCount, data.string[i], 1);
  }
  addCountToMap(characterCount, data.string[data.string.length - 1], 1);

  for (var step = 0; step < 40; step ++) {
    var characterCount = { };
    var nextPairMap = { };
    Object.keys(pairMap).forEach(pair => { 
      const transform = data.transforms[pair];
      const count = pairMap[pair];
      const left = pair[0] + transform;
      const right = transform + pair[1];
      
      // Each pair spawns N left and right pairs
      addCountToMap(nextPairMap, left, count);
      addCountToMap(nextPairMap, right, count);
      // Add to the counts for the first one and the inserted one. 
      // The second character's counts will be added when the other pair is iterated through.
      addCountToMap(characterCount, pair[0], count);
      addCountToMap(characterCount, transform, count);
    });
    pairMap = nextPairMap;
  }
  // Add 1 for the last character in the string
  addCountToMap(characterCount, data.string[data.string.length - 1], 1);

  helpers.logObj(characterCount)
  var max = 0;
  var min = Number.MAX_VALUE;
  Object.keys(characterCount).forEach(char => {
    max = Math.max(max, characterCount[char])
    min = Math.min(min, characterCount[char])
  })
  console.log(max, min, max-min)
}

part1Map();
