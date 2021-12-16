const fs = require('fs');
const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  return lines.map(line => {
    return Array.from(line).map(x => parseInt(x))
  });
}

function isValidCell(data, x, y) {
  return data[y] != undefined && data[y][x] != undefined;
}

function isValidCell2(data, x, y) {
  return y >= 0 && y < data.length * 5 && x >= 0 && x < data[0].length * 5;
}

// MinHeap from https://blog.bitsrc.io/implementing-heaps-in-javascript-c3fbf1cb2e65
// Adapted with custom comparators
class MinHeap {

  constructor (gtFn, ltFn) {
      /* Initialing the array heap and adding a dummy element at index 0 */
      this.heap = [null]
      this.greaterThanFn = gtFn;
      this.lessThanFn = ltFn;
  }

  getMin () {
      /* Accessing the min element at index 1 in the heap array */
      return this.heap[1]
  }
  
  insert (node) {

      /* Inserting the new node at the end of the heap array */
      this.heap.push(node)

      /* Finding the correct position for the new node */

      if (this.heap.length > 1) {
          let current = this.heap.length - 1

          /* Traversing up the parent node until the current node (current) is greater than the parent (current/2)*/
          while (current > 1 && this.greaterThanFn(this.heap[Math.floor(current/2)], this.heap[current])) {

              /* Swapping the two nodes by using the ES6 destructuring syntax*/
              [this.heap[Math.floor(current/2)], this.heap[current]] = [this.heap[current], this.heap[Math.floor(current/2)]]
              current = Math.floor(current/2)
          }
      }
  }
  
  remove() {
      /* Smallest element is at the index 1 in the heap array */
      let smallest = this.heap[1]

      /* When there are more than two elements in the array, we put the right most element at the first position
          and start comparing nodes with the child nodes
      */
      if (this.heap.length > 2) {
          this.heap[1] = this.heap[this.heap.length-1]
          this.heap.splice(this.heap.length - 1)

          if (this.heap.length === 3) {
              if (this.greaterThanFn(this.heap[1],this.heap[2])) {
                  [this.heap[1], this.heap[2]] = [this.heap[2], this.heap[1]]
              }
              return smallest
          }

          let current = 1
          let leftChildIndex = current * 2
          let rightChildIndex = current * 2 + 1

          while (this.heap[leftChildIndex] &&
                  this.heap[rightChildIndex] &&
                  (this.greaterThanFn(this.heap[current], this.heap[leftChildIndex]) ||
                      this.greaterThanFn(this.heap[current], this.heap[rightChildIndex]))) {
              if (this.lessThanFn(this.heap[leftChildIndex], this.heap[rightChildIndex])) {
                  [this.heap[current], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[current]]
                  current = leftChildIndex
              } else {
                  [this.heap[current], this.heap[rightChildIndex]] = [this.heap[rightChildIndex], this.heap[current]]
                  current = rightChildIndex
              }

              leftChildIndex = current * 2
              rightChildIndex = current * 2 + 1
          }
      }

      /* If there are only two elements in the array, we directly splice out the first element */

      else if (this.heap.length === 2) {
          this.heap.splice(1, 1)
      } else {
          return null
      }

      return smallest
  }
}

function part1() {
  const data = readInput('sampleBig.txt');
  
  const nodeMatrix = Array(data.length).fill().map(() => Array.from({length:data[0].length},()=> ({})));

  // Initialize nodes
  for (var y = 0; y < data.length; y ++ ) {
    for (var x = 0; x < data[y].length; x ++) {
      nodeMatrix[y][x].visited = false;
      nodeMatrix[y][x].cost = data[y][x];
      nodeMatrix[y][x].neighbors = [];
      if (y == 0 && x == 0) {
        nodeMatrix[y][x].distance = 0;
      } else {
        nodeMatrix[y][x].distance = Number.MAX_SAFE_INTEGER
      }

      if (isValidCell(data, x, y + 1)) {
        nodeMatrix[y][x].neighbors.push(nodeMatrix[y + 1][x])
      }

      if (isValidCell(data, x, y - 1)) {
        nodeMatrix[y][x].neighbors.push(nodeMatrix[y - 1][x])
      }

      if (isValidCell(data, x - 1, y)) {
        nodeMatrix[y][x].neighbors.push(nodeMatrix[y][x - 1])
      }

      if (isValidCell(data, x + 1, y)) {
        nodeMatrix[y][x].neighbors.push(nodeMatrix[y][x + 1])
      }
    }
  }
  
  const allNodes = nodeMatrix.flatMap(x => x);
  var currentNode = nodeMatrix[0][0];
  var iter = 0;
  do {
    if (iter%1000 == 0) {
      console.log(iter)

    }
    iter++;
    currentNode.neighbors.forEach(neighbor => {
      const distance = currentNode.distance + neighbor.cost;
      if (distance < neighbor.distance) {
        neighbor.distance = distance;
      }
    })
    currentNode.visited = true;
    
    const sorted = allNodes.slice(0).sort((a,b) => a.distance-b.distance).filter(x => !x.visited);
    currentNode = sorted[0]
  } while (!nodeMatrix[data.length - 1][data[0].length - 1].visited);

  helpers.logObj(allNodes.length)
  console.log(nodeMatrix[data.length - 1][data[0].length - 1])
}

// Cycle through the possible values of the cells (9 -> 1, not zero)
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9]
function getValue(cost, addX, addY) {
  return values[(cost + addX + addY - 1) % 9]
}

function part2() {
  const data = readInput('input.txt');
  
  const width = data[0].length;
  const height = data.length;
  const nodeMatrix = Array(height*5).fill().map(() => Array.from({length:width * 5},()=> ({})));
  
  // Expand the map.
  var it = 0;
  for (var y = 0; y < data.length; y ++ ) {
    for (var x = 0; x < data[y].length; x ++) {
      for (var addY = 0; addY < 5; addY++) {
        for (var addX = 0; addX < 5; addX++) {
          const xp = addX * width;
          const yp = addY * height;
          it++;
          const node = nodeMatrix[y + yp][x + xp];
          node.visited = false;
          node.cost = getValue(data[y][x], addX, addY);
          
          if (y == 0 && x == 0 && addY == 0 && addX == 0) {
            node.distance = 0;
          } else {
            node.distance = Number.MAX_SAFE_INTEGER
          }

          node.neighbors = [];
          if (isValidCell2(data, x + xp, y + 1 + yp)) {
            node.neighbors.push(nodeMatrix[y + 1 + yp][x + xp])
          }

          if (isValidCell2(data, x + xp, y - 1 + yp)) {
            node.neighbors.push(nodeMatrix[y - 1 + yp][x + xp])
          }

          if (isValidCell2(data, x - 1 + xp, y + yp)) {
            node.neighbors.push(nodeMatrix[y + yp][x - 1 + xp])
          }

          if (isValidCell2(data, x + 1 + xp, y + yp)) {
            node.neighbors.push(nodeMatrix[y + yp][x + 1 + xp])
          }
        }
      }
    }
  }
  
  // Djikstra
  const allNodes = nodeMatrix.flatMap(x => x);
  var currentNode = nodeMatrix[0][0];
  
  const minHeap = new MinHeap(
    (a, b) => a!= null && a.distance > b.distance, //gt
    (a, b) => a!= null && a.distance < b.distance //lt
  );

  const start = new Date();
  do {
    currentNode.neighbors.forEach(neighbor => {
      if (!neighbor.visited) {
        minHeap.insert(neighbor)
      }
      // nodesSeen.push(neighbor);
      const distance = currentNode.distance + neighbor.cost;
      if (distance < neighbor.distance) {
        neighbor.distance = distance;
      }
    })
    currentNode.visited = true;
    
    // nodesSeen = nodesSeen.filter(x => !x.visited); // performance
    // // Pick the node with the smallest distance as the next current one
    // const sorted = nodesSeen.slice(0).sort((a,b) => a.distance-b.distance).filter(x => !x.visited);
    // currentNode = sorted[0]
    
    do {
      currentNode = minHeap.remove();
    } while (currentNode != null && currentNode.visited);
    
    
  } while (!nodeMatrix[nodeMatrix.length - 1][nodeMatrix[0].length - 1].visited);

  // 2957 = answer
  console.log(nodeMatrix[nodeMatrix.length - 1][nodeMatrix[0].length - 1])
  console.log(new Date() - start);
}

part2();
