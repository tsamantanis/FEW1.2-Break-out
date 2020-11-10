const colorPrimary = 'rgba(134, 250, 243, 0.8)';
const colorSecondary = 'rgba(134, 160, 250, 0.8)';
const radians = [
  Math.PI / 2,
  3 * (Math.PI / 4),
  Math.PI,
  5 * (Math.PI / 4),
  (3 * Math.PI) / 2,
  (7 * Math.PI) / 4,
  2 * Math.PI];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateArcPositionPairs(canvas, arcRadius, arcWidth) {
  const arcPositionPairs = [];
  for (let k = arcRadius; k < canvas.width; k += 5 * arcWidth) {
    arcPositionPairs.push({
      x: radians[getRandomInt(radians.length)],
      y: radians[getRandomInt(radians.length)],
      arcRadius: k,
    });
  }
  return arcPositionPairs;
}

function drawArcs(ctx, canvas, arcPositions, arcWidth) {
  arcPositions.forEach((position) => {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, (canvas.height - 30) / 2, position.arcRadius, position.x, position.y);
    ctx.strokeStyle = getRandomInt() % 2 === 0 ? colorPrimary : colorSecondary;
    ctx.lineWidth = arcWidth;
    ctx.stroke();
  });
}

function drawBackground(ctx, canvas) {
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#202A25';
  ctx.fill();
  ctx.closePath();

  const arcRadius = 100;
  const arcWidth = 100;
  drawArcs(ctx, canvas, generateArcPositionPairs(canvas, arcRadius, arcWidth), arcWidth);
}

export default drawBackground;
