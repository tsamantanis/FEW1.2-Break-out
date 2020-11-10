/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class Paddle extends Sprite {
  constructor(x, y, color, width, height) {
    super(x, y, color);
    this.width = width;
    this.height = height;
  }

  collisions(canvas, rightPressed, leftPressed) {
    if (rightPressed) {
      this.moveBy(7, 0);
      if (this.x + this.width > canvas.width) {
        this.x = canvas.width - this.width;
      }
    } else if (leftPressed) {
      this.moveBy(-7, 0);
      if (this.x < 0) {
        this.x = 0;
      }
    }
  }

  render(ctx, canvas) {
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Paddle;
