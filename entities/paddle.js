import { Vector2d } from "./ball.js";

export class Paddle {
  constructor(opts) {
    this.position = opts.position;
    this.width = opts.width;
    this.height = opts.height;
  }

  get center() {
    return {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
  }
}
