const fs = require('fs');
const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  const connections = {};
  lines.map(line => line.split('-')).forEach(array => {
    connections[array[0]] = connections[array[0]] ? connections[array[0]] : [];
    connections[array[0]].push(array[1]);
    connections[array[1]] = connections[array[1]] ? connections[array[1]] : [];
    connections[array[1]].push(array[0]);
  });
  return connections;
}

function isLowercase(string) {
  return string == string.toLowerCase();
}

function part1() {
  const connections = readInput('sample.txt');
  console.log(JSON.stringify(connections));

  var count = 0;

  const findEnd = (nodesToVisit, visited, path) => {
    nodesToVisit.forEach(node => {
      if (visited.indexOf(node) >= 0) {
        // skip
      } else {
        var visitedLocal = visited.slice(0);
        if (isLowercase(node)) {
          visitedLocal.push(node);
        }
        if (node != 'end') {
          findEnd(connections[node], visitedLocal, [...path, node]);
        } else {
          // found end!
          console.log(path.join(','), ',end')
          count++;
        }
      }
    });
  };

  findEnd(connections['start'], ['start'], ['start']);
  console.log(count)
}

function part2() {
  const connections = readInput('input.txt');
  console.log(JSON.stringify(connections));

  var count = 0;

  const findEnd = (nodesToVisit, visited, extraVisit, path) => {
    nodesToVisit.forEach(node => {
      if (visited.indexOf(node) >= 0) {
        // skip
      } else {
        var visitedLocal = visited.slice(0);
        var extra = extraVisit;
        if (isLowercase(node)) {
          if (node == extraVisit) {
            extra = ''; // remove it
          } else {
            visitedLocal.push(node);
          }
        }
        if (node != 'end') {
          findEnd(connections[node], visitedLocal, extra, [...path, node]);
        } else {
          // UGH i'm producing duplicates... just ignore them. 
          const stringVersion = path.join(',') + ',end';
          count++;
          if (asString.indexOf(stringVersion) < 0) {
            asString.push(stringVersion)
          }
        }
      }
    });
  };

  const extraList = Object.keys(connections).filter(node => node != 'start' && node != 'end' && isLowercase(node));

  const asString = [];
  // make each of the lowecase nodes an extra visitable node
  extraList.forEach(extra => {
    findEnd(connections['start'], ['start'], extra, ['start']);
  })
  console.log(count, asString.length)
}

function part2_correct() {
  const connections = readInput('input.txt');
  var count = 0;

  const findEnd = (nodesToVisit, visited, extraVisit, path) => {
    nodesToVisit.forEach(node => {
      if (visited.indexOf(node) >= 0) {
        if (isLowercase(node) && node != 'start' && extraVisit) {
          findEnd(connections[node], visited, false, [...path, node])
        } else {
          // skip
        }
      } else {
        if (node != 'end') {
          var visitedCopy = isLowercase(node) ? [...visited, node] : [...visited];
          findEnd(connections[node], visitedCopy, extraVisit, [...path, node]);
        } else {
          count++;
        }
      }
    })
  };

  findEnd(connections['start'], ['start'], true, ['start']);
  console.log(count)
}

// current sample 3509
part2_correct(); // answer 116985


