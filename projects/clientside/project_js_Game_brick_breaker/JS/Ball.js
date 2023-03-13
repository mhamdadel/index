class Ball {
  static getAll = [];
  static Speed = 7;
  static Radius = 5;
  x;
  y;
  dx;
  dy;

  constructor(x, y, dx ,dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    Ball.getAll.push(this);
  }

  static drawAll() {
    for (let i = 0; i < Ball.getAll.length; i++) {
      const ball = Ball.getAll[i];
      ball.x += ball.dx;
      ball.y += ball.dy;
      if (key.rightKey) {
        paddleX += Ball.Speed;
        if (paddleX + paddle.width > canvas.width) {
          paddleX = canvas.width - paddle.width;
        }
      }
      if (key.leftKey) {
        paddleX -= Ball.Speed;
        if (paddleX < 0) {
          paddleX = 0;
        }
      }
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, Ball.Radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#ctx";
      ctx.fill();
    }
  }

  static threeBallsBonus() {
    let balls = Ball.getAll;
    let r = Ball.Radius;
    balls.reduce(function (prev, ball) {
      new Ball(ball.x - 20, ball.y,ball.dx - 3,ball.dy);
      new Ball(ball.x + 20, ball.y,ball.dx + 3,ball.dy);
    }, 0);
  }
}

new Ball();
// Ball initialization
function ballInit() {
  for (let i = 0; i < Ball.getAll.length; i++) {
    const ball = Ball.getAll[i];
    ball.x = paddleX + paddle.width / 2;
    ball.y = paddleY - Ball.Radius * 2;
    ball.dx = Ball.Speed * (Math.random() * 2 - 1); // Random trajectory
    ball.dy = -Ball.Speed; // Up
  }
}
// Ball Movement
function update() {
  Ball.drawAll();
  //   ball.x += ball.dx;
  //   ball.y += ball.dy;
  //   if (key.rightKey) {
  //     paddleX += Ball.Speed;
  //     if (paddleX + paddle.width > canvas.width) {
  //       paddleX = canvas.width - paddle.width;
  //     }
  //   }
  //   if (key.leftKey) {
  //     paddleX -= Ball.Speed;
  //     if (paddleX < 0) {
  //       paddleX = 0;
  //     }
  //   }
}
