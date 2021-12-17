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

function part2() {
  const data = readInput('input.txt');
  var bits = '';
  for (var i = 0; i < data.length; i= i + 2) {
    const hex = data.substring(i, i + 2);
    bits += parseInt(hex, 16).toString(2).padStart(8, '0');
  }
  
  const packetResult = parsePacket(bits, 99999)
  console.log(packetResult.results[0])
}

function parsePacket(bits, maxCount) {
  var currentIndex = 0;
  var mode = 'packetStart';

  var lastType;
  
  const operations = ['+', '*', 'min', 'max', '?', '>', '<', '=']
  var results = [];
  var packetCount = 0;

  while (currentIndex < bits.length) {
    currentIndex = currentIndex + 3;
    lastType = parseInt(bits.substr(currentIndex, 3), 2);
    currentIndex = currentIndex + 3;
    if (lastType == 4) {
      mode = 'constant';
    } else {
      mode = 'operator'
    }

    // TODO: how to decide how to ignore hex padding
    // Spoiler alert: it does not matter
    if (mode == 'constant') {
      var type;
      var literalStr = '';
      do  {
        type = bits[currentIndex];
        literalStr += bits.substr(currentIndex + 1, 4);
        currentIndex = currentIndex + 5;
      } while (type != 0);
      
      literalValue = parseInt(literalStr, 2);

      results.push(literalValue);
      packetCount++;
    }

    if (mode == 'operator') {
      var operatorResult;
      const op = operations[lastType];
      
      if (bits[currentIndex] == '0') {
        const operatorLength = parseInt(bits.substr(currentIndex + 1, 15), 2);
        currentIndex = currentIndex + 16;
        
        operatorResult = parsePacket(bits.substr(currentIndex, operatorLength))
        mode = 'packetStart';
      } else {
        const operatorCount = parseInt(bits.substr(currentIndex + 1, 11), 2);
        currentIndex = currentIndex + 12;
        operatorResult = parsePacket(bits.substring(currentIndex), operatorCount)
        mode = 'packetStart';
      }
      currentIndex = operatorResult.currentIndex + currentIndex;
      const theThing = performOperation(op, operatorResult.results)
      console.log(op, operatorResult.results, '-->', theThing);
      results.push(theThing);
      packetCount++;
    }
    
    if (maxCount != undefined && maxCount == packetCount || currentIndex > bits.length) {
      return { currentIndex, results };
    }
  }
  return { currentIndex, results };
}

function performOperation(op, array) {
  if (op == '*') {
    return array.reduce((prev, curr) => prev * curr, 1);
  }

  if (op == '+') {
    return array.reduce((prev, curr) => prev + curr, 0);
  }

  if (op == '=') {
    return array[0] == array[1] ? 1 : 0;
  }
  if (op == '>') {
    return array[0] > array[1] ? 1 : 0;
  }
  if (op == '<') {
    return array[0] < array[1] ? 1 : 0;
  }

  if (op == 'max') {
    return helpers.sortNumArrayDesc(array)[0];
  }

  if (op == 'min') {
    return helpers.sortNumArray(array)[0];
  }
}

part2(); // correct answer 246761930504