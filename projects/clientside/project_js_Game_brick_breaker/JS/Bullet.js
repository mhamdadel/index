class Bullet {
  static getAll = [];
  static yVel = 10;
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 3;
    this.height = 9;
    this.size = 5;
    this.cooldown = 0;
  }

  static collisionBrick(brick) {
    const isBulletInsideBrick = (b, bullet) =>
    (bullet.x > b.x &&
    bullet.x < b.x + 50 &&
    bullet.y > b.y &&
    bullet.y < b.y + 20);

    for (let i = 0; i < Bullet.getAll.length; i++) {
      let bult = Bullet.getAll[i];
      if (isBulletInsideBrick(brick,bult) && brick.status != 0) {
        Bullet.getAll.splice(i,1);
        return true;
      }
    }
  }
}

function bulletMovement() {
  for (let i = 0; i < Bullet.getAll.length; i++) {
    Bullet.getAll[i].y -= Bullet.yVel;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(Bullet.getAll[i].x, Bullet.getAll[i].y, 4, 12);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
