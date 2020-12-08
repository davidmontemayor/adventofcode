const readline = require('readline');
const fs = require('fs');

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

        // connection = { count , bag (node) }
        // array of nodes
        var containerBag;
        // if (!bagRules[bagType]) {
          containerBag = newNode(bagType);
          bagRules[bagType] = containerBag;
        // } else {
        //   containerBag = bagRules[bagType];
        // }
        contents.forEach(content => {
          const count = parseInt(content.slice(0, 2));
          const bagName = content.slice(2);
          // var bagNode;
          // if (!bagRules[bagName]) {
          //   bagNode = newNode(bagName);
          //   bagRules[bagName] = bagNode;
          // } else {
          //   bagNode = bagRules[bagName];
          // }

          const connection = {
            count,
            bag: bagName
          };
          containerBag.contents.push(connection);
        })
        // console.log(bagType, contents)
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

var total = 0;
function countBags(rules, currentRule, current) {
  if (currentRule.contents.length == 0) {
    return current;
  }

  // var total = 0;
  for (var i = 0; i < currentRule.contents.length; i++) {
    const conn = currentRule.contents[i];
    for (var j = 0; j < conn.count; j++) {
      // console.log(conn.bag);
      total++;
      current++;
      console.log(current)
      countBags(rules, rules[conn.bag], current);
    }
  }
  return current;
}

async function start(filename) {
  const rules = await readLines(filename);
  // console.log(JSON.stringify(rules, null, 2));

  const count = countBags(rules, rules['shiny gold'], 0);
  console.log(total);
  console.log(count);

}

start('input.txt')








/*
DR
DO
DY
DG
DB
DV
DV
DB
DV
DV
DG
DB
DV
DV
DB
DV
DV
DY
DG
DB
DV
DV
DB
DV
DV
DG
DB
DV
DV
DB
DV
DV
DO
DY
DG
DB
DV
DV
DB
DV
DV
DG
DB
DV
DV
DB
DV
DV
DY
DG
DB
DV
DV
DB
DV
DV
DG
DB
DV
DV
DB
DV
DV
DR
DO
DY
DG
DB
DV
DV
DB
DV
DV
DG
DB
DV
DV
DB
DV
DV
DY
DG
DB
DV
DV
DB
DV
DV
DG
DB
DV
DV
DB
DV
DV
DO
DY
DG
DB
DV
DV
DB
DV
DV
DG
DB
DV
DV
DB
DV
DV
DY
DG
DB
DV
DV
DB
DV
DV
DG
DB
DV
DV
DB
DV
DV








*/