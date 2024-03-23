import { Ball } from "./entities/ball.js";
import {
  aabbBottom,
  aabbLeft,
  aabbRight,
  aabbTop,
  hasCollision,
} from "./utils/collision.js";
import { clamp } from "./utils/math.js";
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
const pointerLockHandler = () => {
  if (document.pointerLockElement === canvas) {
    document.addEventListener("mousemove", mouseMoveHandler);
  } else {
    document.removeEventListener("mousemove", mouseMoveHandler);
  }
};
canvas.addEventListener("click", canvas.requestPointerLock);
document.addEventListener("pointerlockchange", pointerLockHandler);

let dt = 0;
let last = performance.now();

const paddle = {
  position: { x: (canvas.width - 404) / 2, y: canvas.height - 20 },
  width: 104,
  height: 16,
};
const mouse = {
  position: {
    x: paddle.position.x,
    y: 0,
  },
  clamp: { x: paddle.position.x, y: 0 },
};

const ball = new Ball({
  width: 12,
  height: 12,
  position: {
    x: 100,
    y: 100,
  },
  velocity: {
    x: 200,
    y: 200,
  },
  maxVelocity: { x: 500, y: 500 },
  paddleBounceFactor: { x: 250, y: 0 },
  //   brickCollisionSpeedBoost: { x: 0, y: 10 },
  paddleCollisionSpeedBoost: { x: 0, y: 10 },
});

const mouseMoveHandler = (e) => {
  mouse.position.x += e.movementX;

  mouse.clamp.x = clamp(mouse.position.x, 0, canvas.width - paddle.width);
  console.log(mouse.clamp, mouse.position);
};

const frame = (hrt) => {
  dt = (hrt - last) / 1000;

  paddle.position.x = mouse.clamp.x;

  ball.position.x += ball.velocity.x * dt;
  ball.position.y += ball.velocity.y * dt;

  let ballPaddleCollision = false;

  if (hasCollision(ball, paddle)) {
    ballPaddleCollision = true;
    const closestSide =
      Math.abs(aabbRight(paddle) - aabbLeft(ball)) <
      Math.abs(aabbLeft(paddle) - aabbRight(ball))
        ? "right"
        : "left";
    //ball is moving Left/Right
    if (ball.velocity.x < 0) {
      if (closestSide === "left") {
        ball.position.x = aabbLeft(paddle) - ball.width;
      } else {
        ball.position.x = aabbRight(paddle);
        ball.velocity.x *= -1;
      }
    } else if (ball.velocity.x > 0) {
      //Moving to the Right
      if (closestSide === "right") {
        ball.position.x = aabbRight(paddle);
      } else {
        ball.position.x = aabbLeft(paddle) - ball.width;
        ball.velocity *= -1;
      }
    }
  }

  if (!ballPaddleCollision && hasCollision(ball, paddle)) {
    ball.position.y = paddle.position.y - ball.height;

    if (Math.abs(ball.velocity.y) < ball.maxVelocity.y) {
      ball.velocity.y += ball.paddleCollisionSpeedBoost.y;
    }

    ball.velocity.y *= -1;

    const halfPaddleWidth = paddle.width / 2;
    const difference = paddle.center.x - ball.center.x;
    const factor = Math.abs(difference) / halfPaddleWidth;

    ball.velocity.x =
      Math.sign(-difference) * ball.paddleBounceFactor.x * factor;
  }

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
  //   paddle
  ctx.fillStyle = "white";

  ctx.fillRect(
    paddle.position.x,
    paddle.position.y,
    paddle.width,
    paddle.height
  );
  ctx.fillStyle = "white";
  ctx.fillRect(ball.position.x, ball.position.y, ball.width, ball.height);

  last = hrt;

  requestAnimationFrame(frame);
};

requestAnimationFrame(frame);
