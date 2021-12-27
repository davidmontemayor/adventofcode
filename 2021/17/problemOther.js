let count = 0
for (let y = -1000; y <= 1000; y += 1) {
  for (let x = 1; x <= 1000; x += 1) {
    const result = testProbe(x, y)
    if (result != null) {
      count++;
    }
    // console.log(x,y)
  }
}

console.log(count)

function testProbe(startX, startY) {
  // x=282..314, y=-80..-45
  const minX = 282;
  const maxX = 314;
  const minY = -80;
  const maxY = -45;

  let currentX = 0
  let currentY = 0
  let velocityX = startX
  let velocityY = startY
  let maxHeight = 0
  while (currentX <= maxX && currentY >= minY) {
    currentX += velocityX
    currentY += velocityY
    velocityX += velocityX < 0 ? 1 : velocityX > 0 ? -1 : 0
    velocityY -= 1
    if (currentY > maxHeight) {
      maxHeight = currentY
    }
    if (currentX >= minX && currentX <= maxX && currentY >= minY && currentY <= maxY) {
      return maxHeight
    }
  }
  return null
}