/* eslint-disable operator-linebreak */
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Brick from './Brick.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ballRadius = 10;
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
const backgroundLineWidth = 3.5;
const backgroundOffset = 10;
const ARROW_RIGHT = 'ArrowRight';
const ARROW_LEFT = 'ArrowLeft';
const RIGHT = 'RIGHT';
const LEFT = 'LEFT';
const font = '16px Arial';
const bricks = [];

let x = canvas.width / 2;
let y = canvas.height - 30;
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

function drawScore() {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function drawBackground() {
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#202A25';
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (0 * backgroundOffset), 0, Math.PI * 2);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorPrimary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (1 * backgroundOffset), 0, Math.PI);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorSecondary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (3 * backgroundOffset), 180, Math.PI * 2);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorPrimary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (4 * backgroundOffset), 90, Math.PI);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorSecondary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (4 * backgroundOffset), 30, Math.PI / 2);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorPrimary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (5 * backgroundOffset), 180, Math.PI * 2);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorSecondary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (6 * backgroundOffset), 0, Math.PI);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorPrimary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (6 * backgroundOffset), 20, Math.PI);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorSecondary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (7 * backgroundOffset), 180, Math.PI * 2);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorPrimary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (8 * backgroundOffset), 0, Math.PI);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorSecondary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (9 * backgroundOffset), 60, Math.PI * 2);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorPrimary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2,
    2 + (10 * backgroundOffset), Math.PI * (5 / 3), Math.PI);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorSecondary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (11 * backgroundOffset), 180, Math.PI * 2);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorPrimary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (12 * backgroundOffset), Math.PI / 6, Math.PI);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorPrimary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (12 * backgroundOffset), 30, Math.PI * 2);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorSecondary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2,
    2 + (13 * backgroundOffset), Math.PI * (3 / 4), Math.PI);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorSecondary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2,
    2 + (14 * backgroundOffset), Math.PI * (2 / 3), Math.PI * 2);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorPrimary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (15 * backgroundOffset), 0, Math.PI / 2);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorSecondary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (16 * backgroundOffset), 0, Math.PI);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorPrimary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (16 * backgroundOffset), Math.PI / 2, Math.PI);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorSecondary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2,
    2 + (17 * backgroundOffset), Math.PI / 2, Math.PI * 2);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorPrimary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (18 * backgroundOffset), 0, Math.PI);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorPrimary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (19 * backgroundOffset), Math.PI, Math.PI / 24);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorSecondary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (19 * backgroundOffset), 0, Math.PI);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorPrimary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 2 + (20 * backgroundOffset), Math.PI / 3, Math.PI);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorSecondary;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2,
    2 + (21 * backgroundOffset), Math.PI * (3 / 4), Math.PI * 2);
  ctx.lineWidth = backgroundLineWidth;
  ctx.strokeStyle = colorSecondary;
  ctx.stroke();
}

function collisionCanvas() {
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives -= 1;
      if (!lives) {
        // alert('GAME OVER');
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
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
  drawScore();
  drawLives();
  collisionDetection();
  collisionCanvas();
  collisionPaddle();
  ball.moveBy(dx, dy);
  checkKeys();
  requestAnimationFrame(draw);
}

draw();
