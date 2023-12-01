const fs = require('fs');
const helpers = require('../helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Do further processing
  // return lines.map(line => line.split());
  return lines;
}

function part1() {
  const data = readInput('input.txt');
  var total = 0;
  data.forEach(line => {
    var first = -1;
    var last = -1;
    Array.from(line).forEach(char => {
      const val = parseInt(char);
      if(val >=0 ) {
        if (first == -1) {
          first = val;
        } else {
          last = val;
        }
      }
    })
    if (last == -1) {
      last = first;
    }
    const thing = parseInt(("" + first + "" + last));
    total += thing;
    console.log('----------', thing, total)
  }) 
}

function findLowestIndex(string) {
  var lowestIdx = 1000;
  var number = null;
  
  if (string.indexOf("one") >= 0 && string.indexOf("one") < lowestIdx) {
    number = [ "one", "1"];
    lowestIdx = string.indexOf("one");
  }

  if (string.indexOf("two") >= 0 && string.indexOf("two") < lowestIdx) {
    number = ["two", 2];
    lowestIdx = string.indexOf("two");
  }

  if (string.indexOf("three") >= 0 && string.indexOf("three") < lowestIdx) {
    number = ["three", 3];
    lowestIdx = string.indexOf("three");
  }

  if (string.indexOf("four") >= 0 && string.indexOf("four") < lowestIdx) {
    number = ["four", 4];
    lowestIdx = string.indexOf("four");
  }

  if (string.indexOf("five") >= 0 && string.indexOf("five") < lowestIdx) {
    number = ["five", 5];
    lowestIdx = string.indexOf("five");
  }

  if (string.indexOf("six") >= 0 && string.indexOf("six") < lowestIdx) {
    number = ["six", 6];
    lowestIdx = string.indexOf("six");
  }

  if (string.indexOf("seven") >= 0 && string.indexOf("seven") < lowestIdx) {
    number = ["seven", 7];
    lowestIdx = string.indexOf("seven");
  }


  if (string.indexOf("eight") >= 0 && string.indexOf("eight") < lowestIdx) {
    number = ["eight", 8];
    lowestIdx = string.indexOf("eight");
  }

  if (string.indexOf("nine") >= 0 && string.indexOf("nine") < lowestIdx) {
    number = ["nine", 9];
    lowestIdx = string.indexOf("nine");
  }

  return number;
}

function findReverse(string) {
  var lowestIdx = 1000;
  var number = null;
  
  if (string.indexOf("eno") >= 0 && string.indexOf("eno") < lowestIdx) {
    number = [ "eno", "1"];
    lowestIdx = string.indexOf("eno");
  }

  if (string.indexOf("owt") >= 0 && string.indexOf("owt") < lowestIdx) {
    number = ["owt", 2];
    lowestIdx = string.indexOf("owt");
  }

  if (string.indexOf("eerht") >= 0 && string.indexOf("eerht") < lowestIdx) {
    number = ["eerht", 3];
    lowestIdx = string.indexOf("eerht");
  }

  if (string.indexOf("ruof") >= 0 && string.indexOf("ruof") < lowestIdx) {
    number = ["ruof", 4];
    lowestIdx = string.indexOf("ruof");
  }

  if (string.indexOf("evif") >= 0 && string.indexOf("evif") < lowestIdx) {
    number = ["evif", 5];
    lowestIdx = string.indexOf("evif");
  }

  if (string.indexOf("xis") >= 0 && string.indexOf("xis") < lowestIdx) {
    number = ["xis", 6];
    lowestIdx = string.indexOf("xis");
  }

  if (string.indexOf("neves") >= 0 && string.indexOf("neves") < lowestIdx) {
    number = ["neves", 7];
    lowestIdx = string.indexOf("neves");
  }


  if (string.indexOf("thgie") >= 0 && string.indexOf("thgie") < lowestIdx) {
    number = ["thgie", 8];
    lowestIdx = string.indexOf("thgie");
  }

  if (string.indexOf("enin") >= 0 && string.indexOf("enin") < lowestIdx) {
    number = ["enin", 9];
    lowestIdx = string.indexOf("enin");
  }

  return number;
}


function part2() {
  const data = readInput('input.txt');
  var total = 0;
  data.forEach(line => {
    var original = line;
    var reverse = line.split('').reverse().join('');
    var reverseOrig = reverse;
    var replacement = findLowestIndex(line)
    while (replacement != null) {
      line = line.replace(replacement[0], "" + replacement[1])
      // console.log(replacement, line)
      replacement = findLowestIndex(line)
    }

    replacement = findReverse(reverse) 
    while (replacement != null) {
      reverse = reverse.replace(replacement[0], "" + replacement[1])
      replacement = findReverse(reverse)
    }
     
    console.log(original, line, reverse, reverseOrig)

    var first = -1;
    var last = -1;
    Array.from(line).forEach(char => {
      const val = parseInt(char);
      if(first < 0 && val >=0 ) {
        if (first == -1) {
          first = val;
        }
      }
    })

    Array.from(reverse).forEach(char => {
      const val = parseInt(char);
      if(last < 0 && val >=0 ) {
        if (last == -1) {
          last = val;
        }
      }
    })
    
    const thing = parseInt(("" + first + "" + last));
    total += thing;
    console.log('----------', thing, total)
  })
}

function hasNumber(string) {
  var value = null;
  ['1','2','3','4','5','6','7','8','9'].forEach(x => {
    if (!value && string.indexOf(x) >= 0) {
      value = x;
    }
  })

  if (!value) {
    var numbers = ['zero', 'one','two','three','four','five', 'six', 'seven', 'eight', 'nine'];
    for (var i = 1; i <= 9; i++) {
      if (!value && string.indexOf(numbers[i]) >= 0) {
        value = "" + i;
      }
    }
  }
  return value;
}

function part2Improved() {
  const data = readInput('input.txt');
  var total = 0;
  data.forEach(line => {
    var original = line;
    var reverse = helpers.reverseString(line);
    
    var first = -1;
    var last = -1;
    var acc = '';
    Array.from(line).forEach(char => {
      if (first == -1) {
        acc = acc + char;
        var has = hasNumber(acc);
        if (has != null) {
          first = parseInt(has);
        }
      } 
    })
    
    acc = '';
    Array.from(line).reverse().forEach(char => {
      if (last == -1) {
        acc = char + acc;
        var has = hasNumber(acc);
        if (has != null) {
          last = parseInt(has);
        }
      } 
    })

    const thing = parseInt(("" + first + "" + last));
    total += thing;
  })
  console.log(total)
}

part2Improved();

// const data = readInput('sample.txt');
// Helpers example: 
// helpers.sortNumArray())
// helpers.logObj(someComplicatedObject)
// helpers.containsAll(setA, setB)
// helpers.intersection(setA, setB)
// helpers.difference(setA, setB)
// helpers.union(setA, setB)