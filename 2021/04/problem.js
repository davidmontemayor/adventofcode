const fs = require('fs');
const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  console.log(input.split('\n'))
  var x = input.split('\n')
  console.log(x)
  const called = x[0].split(',').map(n => parseInt(n));
  console.log(called)

  var boardLines = x.splice(1);
  // Processing
  const boards = [];
  var currentBoard = null;
  boardLines.forEach(line => {
    if (line.trim().length == 0) {
      if (currentBoard != null) {
        boards.push(currentBoard);
      }
      currentBoard = null;
    } else {
      if (currentBoard == null) {
        currentBoard = [];
      }
      currentBoard.push(line.split(' ').filter(thing => thing.trim().length != 0).map(n => parseInt(n)));
    }
  })
  if (currentBoard !=null) {
    boards.push(currentBoard);
  }
  return {
    called,
    boards
  };
}

/*
const data = readInput('sample.txt');
const data = readInput('input.txt');
// Example:
helpers.sortNumArray())
*/

function calculateBingo(board, numbers) {
  // Check each row
  console.log(board)

  for(var i = 0; i < board.length; i++) {
    var match = true;
    for (var j = 0; j < board[i].length; j ++) {
      if (!numbers.includes(board[i][j])) {
        match = false;
        continue;
      }
    }
    if (match) {
      console.log('Row ' + i + ' matches in board ', JSON.stringify(board));
      console.log(JSON.stringify(numbers))
      return true;
    }
  }

  // todo vertical
  for(var i = 0; i < board[0].length; i++) { // row
    var match = true;
    for (var j = 0; j < board.length; j ++) {
      if (!numbers.includes(board[j][i])) {
        match = false;
        continue;
      }
    }
    if (match) {
      console.log('Column ' + i + ' matches in board ', JSON.stringify(board));
      console.log(JSON.stringify(numbers))
      return true;
    }
  }
  return false;
}

function part1() {
  const input = readInput("input.txt");
  for(var i = 5; i < input.called.length;i++) {
    const called = input.called.slice(0,i);
    console.log(called);
    for(var j = 0; j < input.boards.length; j++) {
      const bingo = calculateBingo(input.boards[j], called);
      if (bingo) {
        console.log('bingo!', input.boards[j])
        return input.boards[j].flatMap(x => x).filter(n => !called.includes(n)).reduce((prev, x) => x + prev, 0) * called[called.length - 1];
      }
    }
  }
}

function part2() {
  const input = readInput("input.txt");
  var wonBoards = [];
  for(var i = 5; i < input.called.length;i++) {
    const called = input.called.slice(0,i);
    console.log(called);
    for(var j = 0; j < input.boards.length; j++) {
      if (wonBoards.includes(j)) {
        continue;
      }
      const bingo = calculateBingo(input.boards[j], called);
      if (bingo) {
        console.log('bingo!', input.boards[j])
        wonBoards.push(j);
        if (wonBoards.length == input.boards.length) {
          return input.boards[j].flatMap(x => x).filter(n => !called.includes(n)).reduce((prev, x) => x + prev, 0) * called[called.length - 1];
        }
      }
    }
  }
}

const result = part2();
console.log(result)


