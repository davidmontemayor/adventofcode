const fs = require('fs');
const helpers = require('../helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n')
    .map(line => line.split(' '))
    .map(thing => ({ data:thing[0], groups: thing[1].split(',')}))

  return lines;
}

var table;

function part1() {
  const lines = readInput('input.txt');
  const array = [];
  
  lines.forEach(line => {
    const {data, groups} = line;
      
    // normalize the inputs so that they all end in '.'
    const suffix = data.slice(-1) == '.' ? '' : '.';
    table = new Map();
    array.push(generateAndMatch(data + suffix, 0, groups, -1))
  });
  
  console.log(helpers.arraySum(array))
}

function part2() {
  const lines = readInput('input.txt');
  const array = [];
  
  lines.forEach((line, index) => {
    const {data, groups} = line;
    // "unfold" the data
    const input = data + '?' + data + '?' + data + '?' + data + '?' + data;
    var moreGroups = [];
    moreGroups = moreGroups.concat(groups, groups, groups, groups, groups)
    // expand the data to deal with the end of the string
    const suffix = input.slice(-1) == '.' ? '' : '.';
    
    // var tst0 = helpers.getTimeMs();
    // console.log(input + suffix)//, moreGroups)
    table = new Map();
    array.push(generateAndMatch(input + suffix, 0, moreGroups, -1, ''))
    // console.log('Index: ', index + 1, helpers.getTimeMs() - tst0, 'ms')
    // console.log('==============')
  });
    console.log(helpers.arraySum(array))
}

function generateAndMatch(input, index, groups, charIndex) {
  const k = `${index}|${charIndex}|${groups.join(',')}`;
  if (table.has(k)) {
    return table.get(k);
  }

  const groupChar = groups.length > 0 && charIndex >= 0 ? r[groups[0]][charIndex] : '_';

  if (index == input.length -1) {
    // no groups left or i'm at the last character of the last group
    return groups.length == 0 || 
      (groups.length == 1 && groupChar == '.') ? 1 :0;
  }
  var matches = 0;
  const inputChar = input[index];
  
  // Take the two paths
  if (inputChar == '?') { 
    // not in a group
    if (charIndex < 0) {
      // .
      matches += generateAndMatch(input, index + 1, groups, -1)
      // # 
      if (groups.length > 0) { // no point in this path if we don't have any groups left
        matches += generateAndMatch(input, index + 1, groups, 1)
      } 
    } else {
      // end of the current group
      if (groupChar == '.') {
        matches += generateAndMatch(input, index + 1, groups.slice(1), -1);
      } else { // continue matching
        matches += generateAndMatch(input, index + 1, groups, charIndex + 1);
      }
    }
  }
  
  if (inputChar == '.') {
    // not in group, move on to next position
    if (charIndex < 0) {
      matches += generateAndMatch(input, index + 1, groups, -1);
    } else if (groupChar == '.') { // matches end of group
      matches += generateAndMatch(input, index + 1, groups.slice(1), -1);
    } 
    // else #, no match
  }

  if (inputChar == '#') {
    // not in group, start matching group if we have some left
    if (charIndex < 0 && groups.length > 0) {
      matches += generateAndMatch(input, index + 1, groups, 1)
    } else if (groupChar == '#') {
      matches += generateAndMatch(input, index + 1, groups, charIndex + 1);
    }
  }

  table.set(k, matches)
  return matches;
}

const r = [
  '',
  '#.',
  '##.',
  '###.',
  '####.',
  '#####.',
  '######.',
  '#######.',
  '########.',
  '#########.',
  '##########.',
  '###########.',
  '############.',
  '#############.',
  '##############.',
  '###############.'
]

// OUTPUT 
// Answer: 7541
console.log('==============================')
var tst0 = helpers.getTimeMs();
part1();
console.log('\nPart 1 time: ', helpers.getTimeMs() - tst0, 'ms\n')

// Answer: 17485169859432
console.log('==============================')
tst0 = helpers.getTimeMs();
part2();
console.log('\nPart 2 time: ', helpers.getTimeMs() - tst0, 'ms\n')
