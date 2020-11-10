/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/extensions */
import Label from './Label.js';
import {
  canvas,
  ball,
  paddle,
  bricks,
  color,
  font,
} from './variables.js';

let dx = 3;
let dy = -3;
const scoreLabel = new Label(8, 20, color, font, 'Score ', 'left', 0);
const livesLabel = new Label(canvas.width - 65, 20, color, font, 'Lives ', 'left', 3);

function collisionDetection() {
  bricks.bricks.forEach((b) => {
    if (
      b.status === 1
      && ball.x > b.x
      && ball.x < b.x + b.width
      && ball.y > b.y
      && ball.y < b.y + b.height
    ) {
      dy = -dy;
      b.setStatus(0);
      scoreLabel.value += 1;
      ball.changeBallColor(scoreLabel.value);
      if (scoreLabel.value === bricks.rows * bricks.cols) {
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
      livesLabel.value -= 1;
      if (!livesLabel.value) {
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

function checkCollisions() {
  collisionDetection();
  collisionCanvas();
}

export {
  dy,
  dx,
  livesLabel,
  scoreLabel,
};
export default checkCollisions;
