/* eslint-disable prefer-const */
/* eslint-disable import/extensions */
/* eslint-disable import/no-mutable-exports */
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Bricks from './Bricks.js';

export const canvas = document.getElementById('myCanvas');
export const ctx = canvas.getContext('2d');
const paddleWidth = 75;
const paddleHeight = 10;
export const brickWidth = 75;
export const brickHeight = 20;
export const color = '#5BC0EB';
export const font = '16px Arial';
const x = canvas.width / 2;
const y = canvas.height - 30;
export const ball = new Ball(x, y, color);
export const paddle = new Paddle(
  (canvas.width - paddleWidth) / 2, y, color, paddleWidth, paddleHeight,
);
export const bricks = new Bricks();
