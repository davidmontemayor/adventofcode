const exp = require('constants');
const fs = require('fs');
const helpers = require('./helpers.js');

function readInput(filename) {
  const input = fs.readFileSync(filename, {
    encoding: 'utf-8',
  });
  const lines = input.split('\n');

  // Processing
  return lines.map(x => x);
}

/*
const data = readInput('sample.txt');
const data = readInput('input.txt');
// Example:
helpers.sortNumArray())
*/

function evaluateExpression(expression) {
  const expressionList = []

  // Tokenize as list
  var currentList = expressionList;
  var token = '';
  for (var i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (char.trim().length == 0) {
      if (token.trim().length != 0) { currentList.push(parseInt(token)); token = ''; }
      token = '';
      continue;
    }

    if (!isNaN( parseInt(char) )) {
      token += char;
      continue;
    }

    if (char == '+') {
      currentList.push('SUM');
      continue;
    }

    if (char == '*') {
      currentList.push('MUL');
      continue;
    }

    if (expression[i] == '(') {
      const newList = [];
      newList.parent = currentList;

      currentList.push(newList);
      currentList = newList;
      
    } else if(expression[i] == ')') {
      if (token.trim().length != 0) { currentList.push(parseInt(token)); token = ''; }
      currentList = currentList.parent; 
    }
  }
  // Sometimes there will be numbers left
  if (token.trim().length != 0) { currentList.push(parseInt(token)); token = ''; }

  console.log(JSON.stringify(expressionList));
  // Evaluate
  const result = evaluateListWithPrecedence(expressionList);
  console.log(result);
  return result;
}

function evaluateList(list) {
  var operand = null;
  var operation = null;
  
  for (var i = 0; i < list.length; i++) {
    if(typeof list[i] == 'number') {
      if (operand == null) {
        operand = list[i];
        continue;
      }
      if (operation == 'SUM') {
        operand = operand + list[i];
      } else if (operation == 'MUL') {
        operand = operand * list[i];
      }
      operation = null;
    } else if (typeof list[i] == 'string') {
      operation = list[i];
    } else {
      const result = evaluateList(list[i]);
      if (operand == null) {
        operand = result;
        continue;
      }
      if (operation == 'SUM') {
        operand = operand + result;
      } else if (operation == 'MUL') {
        operand = operand * result;
      }
      operation = null;
    }
  }  
  return operand;
}

function evaluateListWithPrecedence(originalList) {
  var list = [];
  // Resolve the list first, then evaluate
  for (var i = 0; i < originalList.length; i++) {
    if(typeof originalList[i] == 'number') {
      list.push(originalList[i]);
    } else if (typeof originalList[i] == 'string') {
      list.push(originalList[i]);
    } else {
      // TODO: verify
      list.push(evaluateList(originalList[i]));
    }
  }

  console.log(JSON.stringify(list));

  var operand = null;
  var operation = null;
  for (var i = 0; i < list.length; i++) {
    if(typeof list[i] == 'number') {
      if (operand == null) {
        operand = list[i];
        continue;
      }
      if (operation == 'SUM') {
        operand = operand + list[i];
      } else if (operation == 'MUL') {
        operand = operand * list[i];
      }
      operation = null;
    } else if (typeof list[i] == 'string') {
      operation = list[i];
    } else {
      const result = evaluateList(list[i]);
      if (operand == null) {
        operand = result;
        continue;
      }
      if (operation == 'SUM') {
        operand = operand + result;
      } else if (operation == 'MUL') {
        operand = operand * result;
      }
      operation = null;
    }
  }  
  return operand;
}

function part1() {
  const data = readInput('input.txt');
  console.log('Sum of all: ', data.reduce((prev, expr) => prev + evaluateExpression(expr), 0));
}

function part2() {
  evaluateExpression("1 + 2 * 3 + 4 * 5 + 6");
}

part2();


