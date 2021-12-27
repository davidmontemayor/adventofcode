const fs = require('fs');
const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  const b = lines.map(line => {
    return parsePair(line);
  });
  helpers.logObj(b);

  // Processing
  return b;
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


// Node = (left, right) => {
//   return {
//     parent: null,
//     left,
//     right,
//     isLeftRegular: () => {
//       return typeof left == 'number';
//     },
//     isRightRegular: () => {
//       return typeof left == 'number';
//     },
//     isLeftChild: (node) => {
//       return node == left;
//     },
//     isRightChild: (node) => {
//       return node == right;
//     },
//     toString: () => {
//       return '[' + (typeof left == 'number' ? left : left.toString()) + ',' + (typeof right == 'number' ? right : right.toString()) + ']'
//     }
//   }
// }

// return pair object
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

function pairToString(pair) {
  if (typeof pair == 'object') {
    return('[' + pairToString(pair.left) + ',' + pairToString(pair.right) + ']');
  } else {
    return '' + pair;
  }
}

function part1() {
  // const data = readInput('sample.txt');
  // var curr = data[0];
  // for (var i = 1; i < data.length; i++) {
  //   // addition
  //   const addResult = new Node(curr,data[i]);
  //   curr.parent = addResult;
  //   data[i].parent = addResult;
  //   console.log(pairToString(addResult))
  //   curr = reduce(addResult);
    
  //   // 
  // }
  // console.log(curr.toString())

  // const data = parsePair('[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]');
  const data = parsePair('[[[[[9,8],1],2],3],4]');
  console.log(data.toString());
  const x = reduce(data);
  console.log(x.toString());
}

function explode(pair, depth) {
  if (typeof pair != 'object') {
    return true;
  }
  // console.log(depth)
  if (depth == 4) {
    var curr = pair.parent;
    do {
      if (curr.isLeftRegular()) {
        console.log('has a regular left child', curr)
        curr.left = curr.left + pair.left;
        break;
      }
      curr = curr.parent;
    } while (curr != null);
    // try the right side
    var parent1 = pair.parent;
    var nonAncestorChain = null;
    if (parent1.right == pair) {
      var parent2 = parent1.parent;
      if (parent2.right.right == pair) {
        var parent3 = parent2.parent;
        if (parent3.right.right.right == pair) {
          var parent4 = parent3.parent;
          if (parent4.right.right.right.right == pair) {
            nonAncestorChain = null; // there's no ancestor that is not a parent of this node
          } else {
            nonAncestorChain = parent4.right;
          }
        } else {
          nonAncestorChain = parent3.right;
        }
      } else {
        nonAncestorChain = parent2.right;
      }
    } else {
      nonAncestorChain = parent1.right;
    }
    // need to find the first parent that has a right child that does not lead to me
    // ... I know i'm at depth four so there's not an infinite things to check..
    curr = nonAncestorChain;
    if (typeof curr == 'object') {
      do {
        if (curr.isLeftRegular()) {
          console.log('has a regular left child', curr)
          curr.left = curr.left + pair.right;
          break;
        }
        curr = curr.left;
      } while (curr != null);  
    } else {
      // normal
      
    }
    
    // find the parent side
    if (pair.parent.left == pair) {
      pair.parent.left = 0; // shouldn't happen?
    } else if (pair.parent.right == pair) {
      pair.parent.right = 0;
    }
    return true;
  } else {
    return explode(pair.left, depth + 1) && explode(pair.right, depth + 1);
  }
  return false;
}

function reduce(pair) {
  // explode
  if (explode(pair.left, 1) || explode(pair.right, 1)){

  }
  return pair;
}

function part2() {
  
}

part1();
