const readline = require('readline');
const fs = require('fs');

function readLines(filename) {
  return new Promise(resolve => {
    const read = [];
    var passport = [];

    const readInterface = readline.createInterface({
      input: fs.createReadStream(filename),
      output: null,
      console: false
    });

    readInterface.on('line', function(line) {
      if (line.trim().length == 0) {
        read.push(passport);
        passport = [];
      } else {
        const itemsInLine = line.match(/\w{3}:/g);
        passport = passport.concat(itemsInLine);
      }
    });

    readInterface.on('close', function(line) {
      read.push(passport);
      resolve(read);
    });
  });
}

async function start(filename) {
  const passports = await readLines(filename);
  var err = 0;
  const filtered = passports.filter(passport => {
    const sum = contains(passport, 'byr:') +
      contains(passport, 'iyr:') +
      contains(passport, 'eyr:') +
      contains(passport, 'hgt:') +
      contains(passport, 'hcl:') +
      contains(passport, 'ecl:') +
      contains(passport, 'pid:');
    console.log(passport.length, sum, passport.length - sum)
    return sum >= 7;
  });
  console.log(passports.length);
  console.log(filtered.length);
  console.log(err)
}

function contains(array, string) {
  return array.indexOf(string) >= 0 ? 1 : 0;
}

start('input.txt');