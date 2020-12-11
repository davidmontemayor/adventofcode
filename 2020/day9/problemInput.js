const fs = require('fs');

const [, , dayToRun, puzzleToRun] = process.argv;
const daySolution = require(`./src/day-${dayToRun}.js`);
const dayInput = fs.readFileSync(`./inputs/day-${dayToRun}.txt`, {
  encoding: 'utf-8',
});