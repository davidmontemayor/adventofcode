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
  return array.reduce((prev, curr) => prev + curr);
}

