const fs = require('fs');
const helpers = require('../helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const inst = input.split('\n\n')[0].split('');
  const mapLines = input.split('\n\n')[1].split('\n');
  const map = {};
  mapLines.forEach(line => {
    const node = line.split('=')[0].trim();
    var leftRight = line.split('=')[1].trim().substring(1).split(')')[0];
    var L = leftRight.split(',')[0].trim();
    var R = leftRight.split(',')[1].trim();
    map[node] = { L, R}
  })
  
  return {inst,  map};
}

function part1() {
  const {inst, map} = readInput('input.txt');
  
  var currentNode = map['AAA']
  var index = 0;
  var max = inst.length;

  while (true) {
    const nextInst = inst[index++ % max];
    
    const nextNode = currentNode[nextInst];
    currentNode = map[nextNode];
    if (nextNode == 'ZZZ') {
      break;
    }
  }

  console.log(index)
}  

function isZNode(nodeName) {
  return nodeName.charAt(2)== 'Z';
}
function isANode(nodeName) {
  return nodeName.charAt(2)== 'A';
}

function part2() {
  const {inst, map} = readInput('input.txt');
  
  const array = [];
  
  var currNodes = [];
  var startKeys = [];
  Object.keys(map).forEach(key => {
    if (isANode(key)) {
      startKeys.push(key)
      currNodes.push(map[key])
    }
  })
  var index = 0;
  var max = inst.length;
  
  while (true) {
    const nextInst = inst[index++ % max];
    
    var nextNodes = [];
    var nextKeys = []
    currNodes.forEach(currentNode => {
      const nextNode = currentNode[nextInst];
      nextNodes.push(map[nextNode])
      nextKeys.push(nextNode)
    })
    
    for (var i = 0; i < nextKeys.length; i++) {
      // Once we find a Z, store that value and remove it from the nodes to visit.
      // We'll apply LCM later
      if (isZNode(nextKeys[i])) {
        array.push(index)
        nextNodes.splice(i, 1)
        startKeys.splice(i,1)
      }
    }
    
    // No more work!
    if (nextNodes.length == 0) {
      break;
    }
    
    currNodes = nextNodes;
  }
  
  console.log(helpers.arrayLcm(array))
}


// Answer 11567
console.log('==============================')
var tst0 = helpers.getTimeMs();
part1();
console.log('\nPart 1 time: ', helpers.getTimeMs() - tst0, 'ms\n')

// Answer 9858474970153
console.log('==============================')
tst0 = helpers.getTimeMs();
part2();
console.log('\nPart 2 time: ', helpers.getTimeMs() - tst0, 'ms\n')

// HANDY UTILS

function parseDecimal(s) {
  return parseInt(s, 10);
}


// REMINDERS

// const data = readInput('sample.txt');
// Helpers example: 
// helpers.sortNumArray())
// helpers.logObj(someComplicatedObject)
// helpers.containsAll(setA, setB)
// helpers.intersection(setA, setB)
// helpers.difference(setA, setB)
// helpers.union(setA, setB)
// console.log("=".repeat(80))
