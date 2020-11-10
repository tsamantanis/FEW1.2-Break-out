/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class Brick extends Sprite {
  constructor(x, y, color, width, height, status = 1) {
    super(x, y, color);
    this.width = width;
    this.height = height;
    this.status = status;
  }

  setStatus(status) {
    this.status = status;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Brick;
