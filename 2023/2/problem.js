const fs = require('fs');
const helpers = require('../helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');
  var games = lines.map(line => {
    var picks = line.split(":")[1].split(';')
    var id = parseInt(line.split(':')[0].split(' ')[1]);
    return [id, picks];
  })
  return games;
}

function part1() {
  const cubeMax = {
    'red': 12,
    'green': 13,
    'blue': 14
  }
  const games = readInput('input.txt');
  const validGames = [];
  games.forEach(game => {
    var id = game[0];
    var valid = true;
    game[1].forEach(pull => {
      var cubes = pull.split(',');
      cubes.forEach(colorAndCount => {
        var splits = colorAndCount.trim().split(' ');
        var count = parseInt(splits[0]);
        var color = splits[1];
        if (count > cubeMax[color]) {
          valid = false;
        }
      })
    })
    if (valid) {
      validGames.push(id)
    }
  })
  console.log(helpers.arraySum(validGames))
}

function part2() {
  const games = readInput('input.txt');
  const set = [];
  games.forEach(game => {
    const cubeMax = {
      'red': 0,
      'green': 0,
      'blue': 0
    }
    game[1].forEach(pull => {
      var cubes = pull.split(',');
      cubes.forEach(colorAndCount => {
        var splits = colorAndCount.trim().split(' ');
        var count = parseInt(splits[0].trim());   
        var color = splits[1].trim();
        cubeMax[color] = Math.max(cubeMax[color], count);
      })
    })
    set.push(cubeMax['red'] * cubeMax['green'] * cubeMax['blue'])
  })
  console.log(helpers.arraySum(set))
}

part1();
part2();


// const data = readInput('sample.txt');
// Helpers example: 
// helpers.sortNumArray()
// helpers.logObj(someComplicatedObject)
// helpers.containsAll(setA, setB)
// helpers.intersection(setA, setB)
// helpers.difference(setA, setB)
// helpers.union(setA, setB)