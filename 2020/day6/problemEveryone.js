const readline = require('readline');
const fs = require('fs');

function readLines(filename) {
  return new Promise(resolve => {
    const groups = [];
    var group = [];
    group.peopleCount = 0;

    const readInterface = readline.createInterface({
      input: fs.createReadStream(filename),
      output: null,
      console: false
    });

    readInterface.on('line', function(line) {
      if (line.trim().length == 0) {
        groups.push(group);
        // console.log('=========', group.peopleCount)
        group = [];
        group.peopleCount = 0;
      } else {
        // parse current answer,
        group.peopleCount++;
        for (var i = 0; i < line.length; i++) {
          const idx = line.charCodeAt(i) - 97;
          if (group[idx]) {
            group[idx]++;
          } else {
            group[idx] = 1;
          }
          // console.log(line[i], group[idx]);
        }
        // console.log(line)
      }
    });

    readInterface.on('close', function(line) {
      groups.push(group);
      // console.log('=========', group.peopleCount)
      resolve(groups);
    });
  });
}

async function start(filename) {
  const groups = await readLines(filename);
  const sum = groups.reduce((acc, group) => {
    return acc + group.reduce((acc2, answer) => {
      return answer == group.peopleCount ? acc2 + 1 : acc2;
    }, 0);
  }, 0);
  // console.log(groups)
  console.log(sum);
}

start('input.txt');