const fs = require('fs');
const { stringify } = require('querystring');
const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // const b = lines.map(line => {
  //   return parsePair(line);
  // });
  // helpers.logObj(b);

  // Processing
  return lines;
}

class Node {
  constructor(left, right) {
    this.left = left;
    this.right = right;
    this.parent = null;
  }

  isLeftRegular() {
    return typeof this.left == 'number';
  }

  isRightRegular() {
    return typeof this.right == 'number';
  }

  isLeftChild(node) {
    return node == this.left;
  }
  isRightChild(node){
    return node == this.right;
  }
  toString() {
    return '[' + (typeof this.left == 'number' ? this.left : this.left.toString()) + ',' + 
                 (typeof this.right == 'number' ? this.right : this.right.toString()) + ']'
  }
}

function parsePair(pairText) {
  if (pairText.indexOf('[') < 0) {
    return parseInt(pairText);
  }
  const contents = pairText.substring(1, pairText.length - 1);
  // find the valid comma
  const stack = [];
  for (var i = 0; i < contents.length; i++) {
    if (contents[i] == '[') {
      stack.push(i);
    }
    if (contents[i] == ']') {
      const match = stack.pop();
    }
    if (contents[i] == ',') {
      if (stack.length == 0) {
        const left = parsePair(contents.substring(0, i));
        const right = parsePair(contents.substring(i+1, contents.length));
        const node = new Node(left,right);

        left.parent = node;
        right.parent = node;
        return node;
      }
    }
  }
}

function part1() {
  const data = readInput('sample.txt');
  var curr = data[0];
  var result;
  for (var i = 1; i < data.length; i++) {
    // addition
    const addResult = '[' + curr + ',' + data[i] + ']';
    const reduced = reduceNumber(addResult); 
    curr = reduced;
    console.log(reduced)
  }
  console.log(curr)
}

function test() {
  
  // const snailNumber = '[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]';
  // const snailNumber = '[[[[[9,8],1],2],3],4]';
  // const snailNumber = '[7,[6,[5,[4,[3,2]]]]]';
  // const snailNumber ='[[6,[5,[4,[3,2]]]],1]'
  // const snailNumber = '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]'
  // var snailNumber = '[[[[4,0],[5,4]],[[7,7],[6,0]]],[[7,[5,5]],[[0,[11,3]],[[6,3],[8,8]]]]]';
  var snailNumber = '[[[[5,9],[5,0]],[[[31,32],20],[35,[14,0]]]],[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]]'
  const explodeResult = explode(snailNumber);
  console.log(explodeResult)
  
  // console.log(data.toString());
  // const x = reduce(data);
  // console.log(x.toString());
}

function reduceNumber(snailNumber) {
  var repeat = true;
  while (repeat) {
    const exIdx = getExplodeIndex(snailNumber);
    const spIdx = getSplitIndex(snailNumber);

    if (exIdx == null && spIdx == null) {
      return snailNumber;
    }

    const doExplode = spIdx == null || exIdx != null && exIdx < spIdx;
    if (doExplode) {
      const explodeResult = explode(snailNumber);
      if (explodeResult != null) {
        snailNumber = explodeResult;
        console.log('explode:', snailNumber);
        continue;
      }  
    }
    
    // must be split
    const splitResult = split(snailNumber);
    if (splitResult != null) {
      snailNumber = splitResult;
      console.log('split  :', snailNumber);
      continue;
    }
    repeat = false;
  }
  return snailNumber;
}

function getExplodeIndex(snailNumber) {
  var openCount = 0;
  for (var i = 0; i < snailNumber.length; i++) {
    if (snailNumber[i] == '[') {
      openCount ++;
    }
    if (snailNumber[i] == ']') {
      openCount --;
    }
    if (openCount <= 4) {
      continue;
    }
    return i;
  }
  return null;
}

function getSplitIndex(snailNumber) {
  const twoDigitArr = snailNumber.replaceAll('[', ',').replaceAll(']', ',').split(',').filter(x => x.length >= 2);
  if (twoDigitArr.length == 0) {
    return null;
  }
  const twoDigit = twoDigitArr[0];
  return snailNumber.indexOf(twoDigit);
}

function explode(snailNumber) {
  var openCount = 0;
  for (var i = 0; i < snailNumber.length; i++) {
    if (snailNumber[i] == '[') {
      openCount ++;
    }
    if (snailNumber[i] == ']') {
      openCount --;
    }
    if (openCount <= 4) {
      continue;
    }

    // four deep
    // find close bracket
    const closeIndex = snailNumber.substr(i).indexOf(']');
    const pairString = snailNumber.substring(i + 1, closeIndex + i)
    const pairs = pairString.split(',');
    const leftVal = parseInt(pairs[0]);
    const rightVal = parseInt(pairs[1]);
    const zero = '0'.padEnd(pairString.length + 2);
    var updated = snailNumber.substring(0, i) + zero + snailNumber.substring(closeIndex + i + 1); 
    // console.log(snailNumber)
    // console.log(updated)

    // Find first ... right?
    for (var j = closeIndex + i; j < snailNumber.length; j++) {
      // assumes one character number
      const parsed = parseInt(snailNumber[j]);
      if (!Number.isNaN(parsed)) {
         
        // found a right number
        const replacement = parsed + rightVal;
        updated = updated.substring(0, j) + replacement + updated.substring(j + 1);
        // console.log(updated)
        // console.log('Found right', parsed, j)
        break;
      }
    }

    // find first left
    for (var j = i; j >= 0; j--) {
      const parsed = parseInt(snailNumber[j]);
      if (!Number.isNaN(parsed)) {
        // found a left number
        const replacement = parsed + leftVal;
        updated = updated.substring(0, j) + replacement + updated.substring(j + 1);
        // console.log(updated)
        // console.log('Found left', parsed)
        break;
      }
    }

    return updated.replace(/\s+/g, '');
  }
  return null; // nothing
}

function split(snailNumber) {
  const twoDigitArr = snailNumber.replaceAll('[', ',').replaceAll(']', ',').split(',').filter(x => x.length >= 2);
  if (twoDigitArr.length == 0) {
    return null;
  }
  const twoDigit = twoDigitArr[0];
  const left = Math.floor(parseInt(twoDigit) / 2)
  const right = Math.ceil(parseInt(twoDigit) / 2)
  const pair = '[' + left + ',' + right + ']'
  // console.log(pair);
  const index = snailNumber.indexOf(twoDigit);
  return snailNumber.substring(0, index) + pair + snailNumber.substring(index + 2);
}

// part1();
test();