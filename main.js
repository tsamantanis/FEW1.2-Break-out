/* eslint-disable import/extensions */
/* eslint-disable operator-linebreak */
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Label from './Label.js';
import Bricks from './Bricks.js';
import drawBackground from './background_helper.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 75;
const paddleHeight = 10;
const brickWidth = 75;
const brickHeight = 20;
const color = '#5BC0EB';
const ARROW_RIGHT = 'ArrowRight';
const ARROW_LEFT = 'ArrowLeft';
const RIGHT = 'RIGHT';
const LEFT = 'LEFT';
const font = '16px Arial';
const x = canvas.width / 2;
const y = canvas.height - 30;
let dx = 3;
let dy = -3;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;

const ball = new Ball(x, y, color);
const paddle = new Paddle(
  (canvas.width - paddleWidth) / 2, y, color, paddleWidth, paddleHeight,
);
const scoreLabel = new Label(8, 20, color, font, 'Score ', 'left', score);
const livesLabel = new Label(canvas.width - 65, 20, color, font, 'Lives ', 'left', lives);
const bricks = new Bricks();

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
    paddle.moveTo(relativeX - paddle.width / 2, paddle.y);
  }
}

function collisionDetection() {
  bricks.bricks.forEach((b) => {
    if (
      b.status === 1 &&
      ball.x > b.x &&
      ball.x < b.x + b.width &&
      ball.y > b.y &&
      ball.y < b.y + b.height
    ) {
      dy = -dy;
      b.setStatus(0);
      score += 1;
      ball.changeBallColor(score);
      if (score === bricks.rows * bricks.cols) {
        // alert('YOU WIN, CONGRATS!');
        document.location.reload();
      }
    }
  });
}

function collisionCanvas() {
  if (ball.x + dx > canvas.width - ball.radius || ball.x + dx < ball.radius) {
    dx = -dx;
  }
  if (ball.y + dy < ball.radius) {
    dy = -dy;
  } else if (ball.y + dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      dy = -dy;
    } else {
      lives -= 1;
      if (!lives) {
        // alert('GAME OVER');
        document.location.reload();
      } else {
        ball.moveTo(canvas.width / 2, canvas.height - 30);
        dx = 2;
        dy = -2;
        paddle.moveTo((canvas.width - paddle.width) / 2, paddle.y);
      }
    }
  }
}

function checkKeys() {
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);
  document.addEventListener('mousemove', mouseMoveHandler);
}

function draw() {
  // background
  drawBackground(ctx, canvas);

  // bricks
  bricks.render(ctx);

  // ball
  ball.render(ctx);
  ball.moveBy(dx, dy);

  // paddle
  paddle.render(ctx, canvas);
  paddle.collisions(canvas, rightPressed, leftPressed);

  // labels
  scoreLabel.render(ctx);
  livesLabel.render(ctx);

  // collisions
  collisionDetection();
  collisionCanvas();

  // controls
  checkKeys();

  requestAnimationFrame(draw);
}

bricks.setup(brickWidth, brickHeight);
draw();
