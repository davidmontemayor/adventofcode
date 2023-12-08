const fs = require('fs');
const helpers = require('../helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  const games = lines.map(x => {
    const cards = x.split(" ")[0].split('');
    const bid = parseDecimal(x.split(" ")[1]);
    return { cards, bid};
  }
    )

  return games;
}

const rankDesc = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
const rank = rankDesc.reverse();

const rank2Desc = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']
const rank2 = rank2Desc.reverse();

const countPoints = [0, 1, 10, 100, 1000, 10000];

function part1() {
  const games = readInput('input.txt');
  const array = [];
  games.forEach(game => {
    const cards = [];
    const counts = [];
    const cardSort = [];
    game.cards.forEach(card => {
      if (cards.indexOf(card) < 0) {
        cards.push(card);
      }
      var idx = cards.indexOf(card);
      if (counts[idx]) {
        counts[idx]++
      } else {
        counts[idx] = 1;
      }
    })
    
    var value = 0;
    
    counts.forEach(val => {
      value = value + countPoints[val];
    })
    game.value = value;
  });
  
  const sorted = sortCards(games, rank);

  for (var i = 0; i < sorted.length; i++) {
    array.push(sorted[i].bid * (i + 1))
  }
  // Answer 251806792
  console.log(helpers.arraySum(array))
  console.log(helpers.getTimeMs() - tst0, 'ms')
}

function part2() {
  const games = readInput('input.txt');
  const array = [];
  
  games.forEach(game => {
    const cards = [];
    const counts = [];
    var jokers = 0
    game.cards.forEach(card => {
      if (card == 'J') {
        jokers++;
      }
      if (cards.indexOf(card) < 0) {
        cards.push(card);
      }
      var idx = cards.indexOf(card);
      if (counts[idx]) {
        counts[idx]++
      } else {
        counts[idx] = 1;
      }
    })
    
    if (jokers > 0) {
      // convert jokers
      // find max value to replace
      var maxIdx = -1;
      var maxValue = 0;

      for( var i = 0; i< counts.length; i++) {
        if (cards[i] == 'J') { // don't replace jokers, duh
          continue;
        }
        if (counts[i] > maxValue) {
          maxValue = counts[i];
          maxIdx = i;
        }
      }

      if (maxIdx != -1) { // All jokers, skip
        counts[maxIdx] = counts[maxIdx] + jokers;
        counts[cards.indexOf('J')] = 0;
      }
    }
  
    var value = 0;
    counts.forEach(val => {
      value = value + countPoints[val];
    })
    game.value = value;
  });
  
  const sorted = sortCards(games, rank2);
  
  for (var i = 0; i < sorted.length; i++) {
    array.push(sorted[i].bid * (i + 1))
  }
  // sorted.forEach(s => console.log(s.cards.join(''), s.value))

  // Answer: 252113488
  console.log(helpers.arraySum(array))
  console.log(helpers.getTimeMs() - tst0, 'ms')
}

function sortCards (games, ranking) {
  return games.slice(0).sort((a,b) => { 
    if (a.value == b.value) {
      for (var i = 0; i < a.cards.length; i++) {
        var ranka = ranking.indexOf(a.cards[i]);
        var rankb = ranking.indexOf(b.cards[i]);
        if (ranka == rankb) {
          continue;
        }
        return ranka - rankb;
      }
    } else {
      return a.value - b.value
    }
  });
};

// OUTPUT 

var tst0 = helpers.getTimeMs();

part1();

console.log('\nPart 1 time: ', helpers.getTimeMs() - tst0, 'ms\n')

tst0 = helpers.getTimeMs();

part2();

console.log('\nPart 2 time: ', helpers.getTimeMs() - tst0, 'ms\n')

function parseDecimal(s) {
  return parseInt(s, 10);
}