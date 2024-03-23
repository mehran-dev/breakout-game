import { Ball } from "./entities/ball.js";

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

let dt = 0;
let last = performance.now();

const ball = new Ball({
  width: 12,
  height: 12,
  position: {
    x: 100,
    y: 100,
  },
  velocity: {
    x: 1000,
    y: 1000,
  },
});

const frame = (hrt) => {
  dt = (hrt - last) / 1000;

  ball.position.x += ball.velocity.x * dt;
  ball.position.y += ball.velocity.y * dt;

  //bottom collide
  if (ball.position.y + ball.height >= canvas.height) {
    ball.position.y = canvas.height - ball.height;
    ball.velocity.y *= -1;
  }

  //right collide
  if (ball.position.x + ball.width >= canvas.width) {
    ball.position.x = canvas.width - ball.width;
    ball.velocity.x *= -1;
  }
  //top collide
  if (ball.position.y <= 0) {
    ball.position.y = 0;
    ball.velocity.y *= -1;
  }
  //left collide
  if (ball.position.x <= 0) {
    ball.position.x = 0;
    ball.velocity.x *= -1;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(ball.position.x, ball.position.y, ball.width, ball.height);
  ctx.font = "normal 24pt Arial";
  ctx.fillText(" delta time : " + dt, 10, 26);

  last = hrt;

  requestAnimationFrame(frame);
};

requestAnimationFrame(frame);
