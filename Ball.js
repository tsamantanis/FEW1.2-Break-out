/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

const ballColors = ['#E9AFA3', '#6320EE', '#D7F9F1', '#FF4365', '#F18805', '#D95D39', '#9C528B'];

class Ball extends Sprite {
  constructor(x, y, color, radius = 10) {
    super(x, y, color);
    this.radius = radius;
  }

  changeBallColor(score) {
    this.color = ballColors[score % 7];
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
export default Ball;
