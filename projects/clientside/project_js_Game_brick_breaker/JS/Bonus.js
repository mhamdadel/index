class Bonus {
  static getAll = [];
  static speed = 4;
  static radius = 10;
  static imgPath = "imgs/bonuses/";
  x;
  y;
  type; // 1=> heart 2=> get wide  3=> get small 4=> 3 balls
  constructor(type, x, y) {
    if (type >= 1 && type <= 4) {
      this.type = type;
      this.x = x - Bonus.radius / 2;
      this.y = y - Bonus.radius / 2;
      Bonus.getAll.push(this);
    }
  }

  static do() {
    for (let i = 0; i < Bonus.getAll.length; i++) {
      const curBon = Bonus.getAll[i];
      if (
        curBon.x > paddleX &&
        curBon.x < paddleX + paddle.width &&
        curBon.y > paddleY - Bonus.radius &&
        curBon.y < paddleY + paddle.height + Bonus.radius
      ) {
        if (curBon.type === 1) {
          game.lives++;
        } else if (curBon.type === 2) {
          paddle.width += 20;
        } else if (curBon.type === 3) {
          paddle.width *= 0.9;
        } else if (curBon.type === 4) {
          Ball.threeBallsBonus();
        }
        Bonus.getAll.splice(i, 1);
      } else if (curBon.y > canvas.height) {
        Bonus.getAll.splice(i, 1);
      }
    }
  }

  static drawAll() {
    for (let i = 0; i < Bonus.getAll.length; i++) {
      const bonusImg = new Image();
      bonusImg.src = this.imgPath + Bonus.getAll[i].type + ".png";
      ctx.drawImage(
        bonusImg,
        Bonus.getAll[i].x - Bonus.radius,
        Bonus.getAll[i].y - Bonus.radius,
        Bonus.radius * 2,
        Bonus.radius * 2
      );
      Bonus.getAll[i].y += Bonus.speed;
    }
  }
}
