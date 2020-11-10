/* eslint-disable import/extensions */
/* eslint-disable operator-linebreak */
import drawBackground from './background_helper.js';

import {
  ctx,
  canvas,
  brickWidth,
  brickHeight,
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

import checkKeys, {
  rightPressed,
  leftPressed,
} from './keyPressed_helper.js';

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
