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
var index = -1;
var success = false;
var replacementOp;

function replaceOp(program) {
  for (var i = index + 1; i < program.length; i++) {
    if (program[i].operator == 'jmp') {
      replacementOp = 'nop';
      index = i;
      return;
    } else if (program[i].operator == 'nop') {
      replacementOp = 'jmp';
      index = i;
      return;
    }
  }
}

function runLine(program, line, hits) {
  if (hits[line]) {
    // console.log("LOOP")
    return;
  }
  if (line == program.length) {
    // console.log('success!', acc);
    success = true;
    return;
  }
  const op = program[line];
  if (!op) {
    return;
  }

  hits[line] = 1;
  var operator = op.operator;

  if (line == index) {
    operator = replacementOp;
  }

  if (operator == 'acc') {
    acc = acc + op.value;
  } else if (operator == 'jmp') {
    return runLine(program, line + op.value, hits);
  }
  return runLine(program, line + 1, hits);
}

async function start(filename) {
  const program = await readLines(filename);
  while (success == false) {
    acc = 0;
    replaceOp(program);
    runLine(program, 0, []);
  }
  console.log(acc);
}

start('input.txt')