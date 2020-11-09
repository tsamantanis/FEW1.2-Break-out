/* eslint-disable import/extensions */
import Brick from './Brick.js';

const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = [30, 10, 50];
const colors = ['#FDE74C', '#9BC53D', '#C3423F'];

class Bricks {
  constructor(rows = 3, cols = 5) {
    this.rows = rows;
    this.cols = cols;
    this.bricks = [];
    this.setup();
  }

  setup(brickWidth, brickHeight) {
    for (let c = 0; c < this.cols; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        this.bricks[c][r] = new Brick(
          c * (brickWidth + brickPadding) + brickOffsetLeft[r % 3],
          r * (brickHeight + brickPadding) + brickOffsetTop,
          colors[r % 3],
          brickWidth,
          brickHeight,
          1,
        );
      }
    }
  }

  render(ctx) {
    for (let c = 0; c < this.cols; c += 1) {
      for (let r = 0; r < this.rows; r += 1) {
        if (this.bricks[c][r].status === 1) {
          this.bricks[c][r].render(ctx);
        }
      }
    }
  }
}

export default Bricks;
