/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class Label extends Sprite {
  constructor(x, y, color, font, text, align, value) {
    super(x, y, color);
    this.font = font;
    this.text = text;
    this.align = align;
    this.value = value;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.textAlign = this.align;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.text}: ${this.value}`, this.x, this.y);
  }
}
export default Label;
