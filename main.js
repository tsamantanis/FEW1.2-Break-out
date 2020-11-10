/* eslint-disable import/extensions */
/* eslint-disable operator-linebreak */
import drawBackground from './background_helper.js';

import {
  ctx,
  canvas,
  brickWidth,
  brickHeight,
  ARROW_RIGHT,
  ARROW_LEFT,
  RIGHT,
  LEFT,
  ball,
  paddle,
  bricks,
} from './variables.js';

import checkCollisions, {
  dx,
  dy,
  livesLabel,
  scoreLabel,
} from './collisions_helper.js';

let rightPressed = false;
let leftPressed = false;

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
  checkCollisions();

  // controls
  checkKeys();

  requestAnimationFrame(draw);
}

bricks.setup(brickWidth, brickHeight);
draw();
