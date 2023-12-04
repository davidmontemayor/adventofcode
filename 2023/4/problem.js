const fs = require('fs');
const helpers = require('../helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');
  const res = lines.map( line => {
    var data = line.split(':')[1].split('|');
    var winning = data[0].trim().split(' ').map(parseDecimal);
    var mine  = data[1].trim().split(' ').filter(x => x!='').map(parseDecimal)
    return { winning, mine, copies: 1}
  })
  return res;
}

function part1() {
  const data = readInput('input.txt');
  const array = [];
  data.forEach(game => {
    array.push(scoreCard(game)[0])
  })
  console.log(helpers.arraySum(array))
}

function part2() {
  const data = readInput('input.txt');
  const array = [];
  // calculate the number of matches (extra cards)
  data.forEach(game => {
    var result = scoreCard(game);
    game.extraCards = result[1]
  })

  // Iterate through the cards and increase the copies of the next N cards, 
  // taking into account the current copies
  for (var i = 0; i< data.length; i++) {
    for (var j = 1; j <= data[i].extraCards; j++) {
      data[i + j].copies = data[i + j].copies + data[i].copies
    }
  }
  data.forEach(card => array.push(card.copies))
  console.log(helpers.arraySum(array))
}

function scoreCard(card) {
  var cardValue = 0;
  var matches = 0;
  card.mine.forEach(v => {
    if (card.winning.indexOf(v) >= 0) {
      cardValue = cardValue== 0 ? 1 : cardValue * 2;
      matches++;
    }
  })
  return [ cardValue, matches ]
}

part1();
part2();

function parseDecimal(s) {
  return parseInt(s, 10);
}