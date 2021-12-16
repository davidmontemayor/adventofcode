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

// That feeling when you've forgotten your math and have to look it up
exports.rotate = (cx, cy, x, y, angle) => {
  var radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [Math.round(nx), Math.round(ny)];
};

exports.sortNumArray = (array) => {
  return array.slice(0).sort((a,b) => a-b);
};

exports.arraySum = (array) => {
  return array.reduce((prev, curr) => prev + curr, 0);
}
// Matrix
//const map = Array(1000).fill().map(() => Array(1000).fill(0));

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
  helpers.printMatrix(output, '')
}

exports.countWithHash = (array, hashingFunction) => {
  const set = {}; // hash them to see which ones are unique  

  array.forEach(item => {
    set[hashingFunction(item)] = true;
  });

  return Object.keys(set).length;
};