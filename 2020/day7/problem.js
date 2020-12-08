const readline = require('readline');
const fs = require('fs');
const { listenerCount } = require('process');

function readLines(filename) {
  return new Promise(resolve => {
    const bagRules = {}; //map of bags?

    const readInterface = readline.createInterface({
      input: fs.createReadStream(filename),
      output: null,
      console: false
    });

    readInterface.on('line', function(line) {
      if (line.trim().length == 0) {
        // ?
      } else {
        // parse current rule
        const splits = line.replace(/\./g, "").replace(/ bags?/g,"").split(' contain ');
        const bagType = splits[0];
        const contents = splits[1].split(', ');
        if (contents.length == 1 && contents[0] == 'no other') {
          bagRules[bagType] = newNode(bagType);
          return;
        }

        // connection = { count , bag name }
        var containerBag;

        containerBag = newNode(bagType);
        bagRules[bagType] = containerBag;

        contents.forEach(content => {
          const count = content.slice(0, 2);
          const bagName = content.slice(2);
          const connection = {
            count,
            bag: bagName
          };
          containerBag.contents.push(connection);
        })
      }
    });

    readInterface.on('close', function(line) {
      resolve(bagRules);
    });
  });
}

function newNode(name) {
  return { name, contents: [] };
}

function findShinyGold(rules, current) {
  if (current.name == 'shiny gold') {
    return true;
  }
  var found = false;
  current.contents.forEach(connection => {
    if (!found) {
      found = findShinyGold(rules, rules[connection.bag]);
    }
  });
  return found;
}

async function start(filename) {
  const rules = await readLines(filename);
  var count = 0;
  Object.keys(rules).forEach(key => {
    // console.log(rules[key]);
    if (findShinyGold(rules, rules[key])) {
      count ++;
    }
  });
  console.log(count - 1); // substract shiny itself
}

start('input.txt')