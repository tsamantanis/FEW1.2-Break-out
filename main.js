/* eslint-disable import/extensions */
/* eslint-disable operator-linebreak */
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Brick from './Brick.js';
import Label from './Label.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 75;
const paddleHeight = 10;
const brickRowCount = 5;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = [30, 10, 50];
const color = '#5BC0EB';
const colors = ['#FDE74C', '#9BC53D', '#C3423F'];
const colorPrimary = 'rgba(134, 250, 243, 0.8)';
const colorSecondary = 'rgba(134, 160, 250, 0.8)';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_LEFT = 'ArrowLeft';
const RIGHT = 'RIGHT';
const LEFT = 'LEFT';
const font = '16px Arial';
const bricks = [];
const radians = [
  Math.PI / 2,
  3 * (Math.PI / 4),
  Math.PI,
  5 * (Math.PI / 4),
  (3 * Math.PI) / 2,
  (7 * Math.PI) / 4,
  2 * Math.PI];
const x = canvas.width / 2;
const y = canvas.height - 30;
let dx = 3;
let dy = -3;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;

const ball = new Ball(x, y, color);
const paddle = new Paddle(
  (canvas.width - paddleWidth) / 2, y, color, paddleWidth, paddleHeight,
);

for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = new Brick(
      c * (brickWidth + brickPadding) + brickOffsetLeft[r % 3],
      r * (brickHeight + brickPadding) + brickOffsetTop,
      colors[r % 3],
      brickWidth,
      brickHeight,
      1,
    );
  }
}

function keyDownHandler(e) {
  if (e.key === RIGHT || e.key === ARROW_RIGHT) {
    rightPressed = true;
  } else if (e.key === LEFT || e.key === ARROW_LEFT) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === RIGHT || e.key === ARROW_RIGHT) {
    rightPressed = false;
  } else if (e.key === LEFT || e.key === ARROW_LEFT) {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddle.width / 2;
  }
}

// ball.changeBallColor(score)

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (
          ball.x > b.x &&
          ball.x < b.x + brickWidth &&
          ball.y > b.y &&
          ball.y < b.y + brickHeight
        ) {
          dy = -dy;
          b.setStatus(0);
          score += 1;
          ball.changeBallColor(score);
          if (score === brickRowCount * brickColumnCount) {
            // alert('YOU WIN, CONGRATS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        bricks[c][r].render(ctx);
      }
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateArcPositionPairs(arcRadius, arcWidth) {
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

function drawArcs(arcPositions, arcWidth) {
  arcPositions.forEach((position) => {
    ctx.beginPath();
    ctx.arc(x, y / 2, position.arcRadius, position.x, position.y);
    ctx.strokeStyle = getRandomInt() % 2 === 0 ? colorPrimary : colorSecondary;
    ctx.lineWidth = arcWidth;
    ctx.stroke();
  });
}

function drawBackground() {
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#202A25';
  ctx.fill();
  ctx.closePath();

  const arcRadius = 100;
  const arcWidth = 100;
  drawArcs(generateArcPositionPairs(arcRadius), arcWidth);
}

function collisionCanvas() {
  if (ball.x + dx > canvas.width - ball.radius || ball.x + dx < ball.radius) {
    dx = -dx;
  }
  if (ball.y + dy < ball.radius) {
    dy = -dy;
  } else if (ball.y + dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddleX + paddle.width) {
      dy = -dy;
    } else {
      lives -= 1;
      if (!lives) {
        // alert('GAME OVER');
        document.location.reload();
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddle.x = (canvas.width - paddleWidth) / 2;
      }
    }
  }
}

function collisionPaddle() {
  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
}

function checkKeys() {
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);
  document.addEventListener('mousemove', mouseMoveHandler);
}

function draw() {
  drawBackground();
  drawBricks();
  ball.render(ctx);
  paddle.render(ctx, canvas);
  const scoreLabel = new Label(8, 20, color, font, 'Score ', 'left', score);
  const livesLabel = new Label(canvas.width - 65, 20, color, font, 'Lives ', 'left', lives);
  scoreLabel.render(ctx);
  livesLabel.render(ctx);
  collisionDetection();
  collisionCanvas();
  collisionPaddle();
  ball.moveBy(dx, dy);
  checkKeys();
  requestAnimationFrame(draw);
}

draw();
