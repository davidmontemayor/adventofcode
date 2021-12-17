const fs = require('fs');
const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  return lines[0];
}

// Literal D2FE28
// operator type 0 38006F45291200
// operator type 1 EE00D40C823060
// example 1 8A004A801A8002F478
// example 3 A0016C880162017C3686B18A3D4780 (does cause a NaN)
function part1() {
  const data = readInput('sample.txt');
  var bits = '';
  for (var i = 0; i < data.length; i= i + 2) {
    const hex = data.substring(i, i + 2);
    bits += parseInt(hex, 16).toString(2).padStart(8, '0');
  }
  
  var currentIndex = 0;
  var mode = 'packetStart';

  var lastVersion;
  var versionSum = 0;
  var lastType;
  var hasMore = false;
  var literalStr = '';
  var literalValue;

  var operatorLength;
  var operatorCount;

  while (currentIndex < bits.length) {
    if (mode == 'packetStart') {
      packetStartIndex = currentIndex;
      lastVersion = parseInt(bits.substr(currentIndex, 3), 2);
      versionSum+= lastVersion;
      currentIndex = currentIndex + 3;
      mode = 'type'
      continue;
    }

    if (mode == 'type') {
      lastType = parseInt(bits.substr(currentIndex, 3), 2);
      currentIndex = currentIndex + 3;
      if (lastType == 4) {
        mode = 'constant';
        hasMore = true;
      } else {
        mode = 'operator'
      }
      continue;
    }

    // TODO: how to decide how to ignore hex padding
    if (mode == 'constant') {
      const type = bits[currentIndex];
      literalStr += bits.substr(currentIndex + 1, 4);
      currentIndex = currentIndex + 5;
      
      if (type == '0') {
        literalValue = parseInt(literalStr, 2);
        
        // move current index to the next nibble?
        literalStr = '';
        mode = 'packetStart'
      }
      continue;
    }

    if (mode == 'operator') {
      if (bits[currentIndex] == '0') {
        // length type -> read 15 bits 
        operatorLength = parseInt(bits.substr(currentIndex + 1, 15), 2);
        console.log('operator length', operatorLength)
        currentIndex = currentIndex + 16;
        // not sure what the length actually matters?
        // other than i'm in a packet?
        mode = 'packetStart';
      } else {
        operatorCount = parseInt(bits.substr(currentIndex + 1, 11), 2);
        console.log('operator count', operatorCount)
        currentIndex = currentIndex + 12;
        mode = 'packetStart';
      }
    }
  }

  console.log(versionSum)
}

part1();
