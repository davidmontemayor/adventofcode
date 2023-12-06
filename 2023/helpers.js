// Other stuff we should remember:
// Number.MAX_SAFE_INTEGER
// Number.MAX_VALUE
// Push and generate a new array [...path, node]
// const map = Array(y).fill().map(() => Array(x).fill(0));
function addCountToMap(map, key, num) {
  if (!map[key]) {
    map[key] = 0;
  }
  map[key] = map[key] + num;
}

exports.intersection = (setA, setB) => {
  return new Set([...setA].filter(x => setB.has(x)));
}

exports.difference = (setA, setB) => {
  return new Set([...setA].filter(x => !setB.has(x)));
}

exports.union = (setA, setB) => {
  return new Set([...setA, ...setB]);
}

exports.containsAll = (setA, setB) => {
  const b = [...setB];
  
  // console.log('checking against', setA);
  for (var i = 0; i < b.length; i++) {
    // console.log(b[i], setA.has(b[i]))
    if (!setA.has(b[i])) {
      return false;
    }
  }
  return true;
}

// That feeling when you've forgotten your math and have to look it up
exports.rotate = (cx, cy, x, y, angle) => {
  var radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [Math.round(nx), Math.round(ny)];
};

exports.sortNumArrayAsc = (array) => {
  return array.slice(0).sort((a,b) => a-b);
};

exports.sortNumArrayDesc = (array) => {
  return array.slice(0).sort((a,b) => b-a);
};

exports.arraySum = (array) => {
  return array.reduce((prev, curr) => prev + curr, 0);
}

exports.arrayMultiply = (array) => {
  return array.reduce((prev, curr) => prev * curr, 1);
}
// Matrix
//const map = Array(1000).fill().map(() => Array(1000).fill(0));
/*
const matrix = [];
  console.log()
  for (var i = 0; i < sizeY; i++) {
    matrix.push(Array(sizeX).fill('.'))
  }
*/
exports.newMatrix = (xDim, yDim, value) => {
  return Array(yDim).fill().map(() => Array(xDim).fill(value));
}

// PrintMatrix
exports.printMatrix = (matrix, character) => {
  matrix.forEach(row =>
    console.log(row.join(character))
  )
}

exports.logObj = (obj) => {
  console.log(JSON.stringify(obj))
}

exports.renderPoints = (points, character) => {
  // Get canvas size
  var maxX = 0;
  var maxY = 0;
  points.forEach(point => {
    maxX = Math.max(maxX, point.x)
    maxY = Math.max(maxY, point.y)
  });

  const output = Array(maxY+1).fill().map(() => Array(maxX+1).fill('.'));
  data.points.forEach(point => {
    output[point.y][point.x] = character;
  });
}

exports.renderPointsArray = (points, character) => {
  // Get canvas size
  var maxX = 0;
  var maxY = 0;
  points.forEach(point => {
    maxX = Math.max(maxX, point[0] + 300)
    maxY = Math.max(maxY, point[1] + 300)
  });

  const output = Array(maxY+1).fill().map(() => Array(maxX+1).fill('.'));
  
  points.forEach(point => {
    // console.log(point[1], point[0])
    output[point[1] + 150][point[0] + 150] = character;
  });
  output[150][150]=  's'
  this.printMatrix(output, '')
}

exports.countWithHash = (array, hashingFunction) => {
  const set = {}; // hash them to see which ones are unique  

  array.forEach(item => {
    set[hashingFunction(item)] = true;
  });

  return Object.keys(set).length;
};

exports.reverseString = (string) => {
  return Array.from(string).reverse().join('');
}

exports.getTimeMs = () => {
  return new Date();
}