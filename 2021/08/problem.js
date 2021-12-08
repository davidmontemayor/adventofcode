const fs = require('fs');
const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');
  const data = lines.map(line => { 
    // console.log(line)
    const vals = line.split('|');
    // console.log(vals)
    const signals = vals[0].trim().split(' ');
    const output = vals[1].trim().split(' ')
    return { signals, output }
  })

  return data;
}

// Segments
// 0 => 6
// 1 => 2   x
// 2 => 5
// 3 => 5
// 4 => 4   x
// 5 => 5
// 6 => 6
// 7 => 3   x
// 8 => 7   x
// 9 => 6
// 2 seg = 1  (c f)
// 4 seg = 4  (b c d f)
// 3 seg = 7  (a c f)
// 7 seg = 8  (a b c d e f g)
// 6 seg = 0, 6,  9
// 5 seg = 2, 3, 5

function part1() {
  const datas = readInput('input.txt');
  var easyDigits = 0;
  datas.forEach(data => {
    data.output.forEach(output => {
      if (output.length == 2 ||
          output.length == 4 ||
          output.length == 3 ||
          output.length == 7) {
            easyDigits ++;
          }
      });
  })
  console.log(easyDigits)
}

// From 2 get c/f
// From 3 get a
// from 

// b/d from 4
// e/g from 8
// 9 (6 segm)==> 7 + 4  + (1 segment (g))

function part2() {
  const datas = readInput('input.txt');
  var totalSum = 0;
  datas.forEach(data => {
    let includesAll = (arr, target) => target.every(v => arr.includes(v));
    // Conver the string to an array 
    // LATER: instead of an array this could be a bitmask
    const signalsArr = data.signals.map(x => Array.from(x));
    
    // First get the ones that are easy to deduce
    const one   = signalsArr.filter(x => x.length == 2)[0];
    const four  = signalsArr.filter(x => x.length == 4)[0];
    const seven = signalsArr.filter(x => x.length == 3)[0];
    const eight = signalsArr.filter(x => x.length == 7)[0];
    
    // Based on the easy ones, figure out the rest
    // First all of the six segment ones
    // Nine is 7 bits OR 4 bits
    const nine  = signalsArr.filter(signal => signal.length == 6 &&  includesAll(signal, seven) &&  includesAll(signal, four))[0];
    // Of the six-segments only zero and nine have the 1 bits on
    const zero  = signalsArr.filter(signal => signal.length == 6 &&  includesAll(signal, one)   && !includesAll(signal, nine))[0];
    // Six is the only six-segment left when you remove 9 and 0
    const six   = signalsArr.filter(signal => signal.length == 6 && !includesAll(signal, zero)  && !includesAll(signal, nine))[0];

    // Since we know what 6 looks like, 5 will be the only 5-segment that will have all of its bits included in 6
    const five  = signalsArr.filter(signal => signal.length == 5 &&  includesAll(six, signal))[0];
    // 9 includes all the bits for 3 and 5, so take it out if it is 5
    const three = signalsArr.filter(signal => signal.length == 5 &&  includesAll(nine, signal)  && !includesAll(signal, five))[0];
    // 2 is the only five segment left after removing 5 and 3
    const two   = signalsArr.filter(signal => signal.length == 5 && !includesAll(signal, three) && !includesAll(signal, five))[0];
    
    // Build an array of the digit segments
    const mapper = [zero, one, two, three, four, five, six, seven, eight, nine];
    
    var decoded = '';
    data.output.forEach(outputDigit => {
      for (var i = 0; i < mapper.length; i++) {
        const asArray = Array.from(outputDigit);
        if (mapper[i].length == asArray.length && includesAll(asArray, mapper[i])) {
          decoded+= i; // String concat
        }
      }
    });
    console.log(decoded)
    totalSum += parseInt(decoded);
  })
  console.log(totalSum)
}

part2();
