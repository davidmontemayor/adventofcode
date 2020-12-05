const readline = require('readline');
const fs = require('fs');

function readLines(filename) {
  return new Promise(resolve => {
    const read = [];
    var passport = 0;

    const readInterface = readline.createInterface({
      input: fs.createReadStream(filename),
      output: null,
      console: false
    });

    readInterface.on('line', function(line) {
      if (line.trim().length == 0) {
        read.push(passport);
        passport = 0;
      } else {
        const kvs = line.split(' ');
        const valid = kvs.filter(kv => validate(kv));
        passport = passport + valid.length;
      }
    });

    readInterface.on('close', function(line) {
      read.push(passport);
      resolve(read);
    });
  });
}

function validate(keyValue) {
  const sp = keyValue.split(':');
  const key = sp[0];
  const value = sp[1];
  if (key == 'cid') {
    return false;
  }
  if (key == 'byr') {
    const year = parseInt(value);
    return value.length == 4 && year >= 1920 && year <= 2002;
  }
  if (key == 'iyr') {
    const year = parseInt(value);
    return value.length == 4 && year >= 2010 && year <= 2020;
  }
  if (key == 'eyr') {
    const year = parseInt(value);
    return value.length == 4 && year >= 2020 && year <= 2030;
  }
  if (key == 'ecl') {
    return value == 'amb' ||
      value == 'blu' ||
      value == 'brn' ||
      value == 'gry' ||
      value == 'grn' ||
      value == 'hzl' ||
      value == 'oth';
  }
  if (key == 'pid') {
    // TODO: use regex?
    const pid = parseInt(value);
    return value.length == 9;
  }
  if (key == 'hcl') {
    return validateHex(value);
  }
  if (key == 'hgt') {
    if (value.endsWith('cm')) {
      const cm = parseInt(value.slice(0, -2));
      return cm >= 150 && cm <= 193;
    } else if (value.endsWith('in')) {
      const inches = parseInt(value.slice(0, -2));
      return inches >= 59 && inches <= 76;
    }
    return false;
  }

  return false;
}

function validateHex(string) {
  const regexp = /^#[0-9a-fA-F]{6}$/
  return regexp.test(string);
}

async function start(filename) {
  const passports = await readLines(filename);
  console.log(passports.filter(p => p == 7).length);
}

start('input.txt');