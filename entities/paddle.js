import { Vector2d } from "./ball.js";

export class Paddle {
  constructor(opts) {
    this.position = opts.position;
    this.width = opts.width;
    this.height = opts.height;
  }
}
