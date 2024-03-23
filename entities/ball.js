export class Vector2d {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

export class Ball {
  constructor(opts) {
    this.width = opts.width;
    this.height = opts.height;
    this.position = opts.position;
    this.velocity = opts.velocity;
    this.maxVelocity = opts.maxVelocity;
    this.paddleCollisionSpeedBoost = opts.paddleCollisionSpeedBoost;
    this.paddleBounceFactor = opts.paddleBounceFactor;
  }

  get center() {
    return {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
  }
}
