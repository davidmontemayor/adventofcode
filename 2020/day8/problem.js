const readline = require('readline');
const fs = require('fs');

function readLines(filename) {
  return new Promise(resolve => {
    const program = [];

    const readInterface = readline.createInterface({
      input: fs.createReadStream(filename),
      output: null,
      console: false
    });

    readInterface.on('line', function(line) {
      if (line.trim().length == 0) {
        // ?
      } else {
        const ops = line.split(' ');
        const op = {
          operator: ops[0],
          value: parseInt(ops[1])
        }
        program.push(op);
      }
    });

    readInterface.on('close', function(line) {
      resolve(program);
    });
  });
}

var acc = 0;
function runLine(program, line, hits) {
  if (hits[line]) {
    return;
  }
  const op = program[line];
  // console.log(op, hits)
  hits[line] = 1;
  if (op.operator == 'acc') {
    acc = acc + op.value;
    // console.log (acc);
  } else if (op.operator == 'jmp') {
    return runLine(program, line + op.value, hits);
  }
  return runLine(program, line + 1, hits);
}

async function start(filename) {
  const program = await readLines(filename);
  // console.log(program);
  runLine(program, 0, []);
  console.log(acc);
}

start('input.txt')

