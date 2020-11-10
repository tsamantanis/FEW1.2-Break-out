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
    const total = this.cols * this.rows;
    let r = 0;
    let c = 0;
    for (let i = 0; i < total; i += 1) {
      if (i > 0 && i % this.cols === 0) {
        r += 1;
        c = 0;
      }
      this.bricks[i] = new Brick(
        c * (brickWidth + brickPadding) + brickOffsetLeft[r % 3],
        r * (brickHeight + brickPadding) + brickOffsetTop,
        colors[r % 3],
        brickWidth,
        brickHeight,
        1,
      );
      c += 1;
    }
  }

  render(ctx) {
    for (let i = 0; i < this.cols * this.rows; i += 1) {
      if (this.bricks[i].status === 1) {
        this.bricks[i].render(ctx);
      }
    }
  }
}

export default Bricks;
