/* eslint-disable import/extensions */
import TypeObject from './TypeObject.js';

class Paddle extends TypeObject {
  constructor(x, y, color, width, height) {
    super(x, y, color);
    this.width = width;
    this.height = height;
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
