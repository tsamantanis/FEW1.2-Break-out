/* eslint-disable prefer-const */
/* eslint-disable import/extensions */
/* eslint-disable import/no-mutable-exports */
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Bricks from './Bricks.js';

export const canvas = document.getElementById('myCanvas');
export const ctx = canvas.getContext('2d');
export const paddleWidth = 75;
export const paddleHeight = 10;
export const brickWidth = 75;
export const brickHeight = 20;
export const color = '#5BC0EB';
export const ARROW_RIGHT = 'ArrowRight';
export const ARROW_LEFT = 'ArrowLeft';
export const RIGHT = 'RIGHT';
export const LEFT = 'LEFT';
export const font = '16px Arial';
export const x = canvas.width / 2;
export const y = canvas.height - 30;
export let rightPressed = false;
export let leftPressed = false;
export const ball = new Ball(x, y, color);
export const paddle = new Paddle(
  (canvas.width - paddleWidth) / 2, y, color, paddleWidth, paddleHeight,
);
export const bricks = new Bricks();
