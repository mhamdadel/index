document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("mousemove", mouseMoveHandler);

function checkWallsCollision() {
  for (let i = 0; i < Ball.getAll.length; i++) {
    const ball = Ball.getAll[i];
    const hitLeftWall = () => ball.x < 0;
    const hitRightWall = () => ball.x + Ball.Radius * 2 > canvas.width;
    const hitTop = () => ball.y < 0;
    const hitBottom = () => ball.y + Ball.Radius * 2 > canvas.height;
    const hitPaddle = () =>
      ball.y + 2 * Ball.Radius > canvas.height - paddle.height &&
      ball.y + Ball.Radius < canvas.height &&
      ball.x + Ball.Radius > paddleX &&
      ball.x + Ball.Radius < paddleX + paddle.width;

    if (hitLeftWall()) {
      ball.dx *= -1;
      ball.x = 0;
    } else if (hitRightWall()) {
      ball.dx = -ball.dx;
      ball.x = canvas.width - Ball.Radius * 2;
    } else if (hitTop()) {
      ball.dy *= -1;
      ball.y = 0;
    } else if (hitBottom()) {
      console.log(Ball.getAll.length);
      if (Ball.getAll.length > 1) {
        Ball.getAll.splice(i, 1);
      } else {
        game.lives--;
        ballInit();
      }
      
      if (check) {
        loseLive.play();
      }
      game.isLost = game.lives === 0 ? true : false;
    }
    paddleCollisionBall(i);
  }
}

function between(value, cond1, cond2) {
  if (value >= cond1 && value <= cond2) {
    return true;
  } else {
    return false;
  }
}

function paddleCollisionBall(i) {
  const ball = Ball.getAll[i];
  if (ball !== undefined) {
    let xDir = ball.x > paddleX ? -1 : 1;
    if (
      ball.y + Ball.Radius >= paddleY &&
      ball.y + Ball.Radius <= paddleY + paddle.height &&
      ball.x + xDir * Ball.Radius >= paddleX &&
      ball.x + xDir * Ball.Radius <= paddleX + paddle.width
    ) {
      let xMinOrPos =
        ball.x < paddleX + paddle.width / 2
          ? -1
          : ball.x > paddleX + paddle.width / 2
          ? 1
          : 0;
      let xDirBall = (paddleX + paddle.width / 2) / ball.x / 2;
      if (xMinOrPos > 0) {
        ball.dx =
          ((xMinOrPos * (ball.x - (paddle.width / 2 + paddleX))) /
            paddle.width) *
          Ball.Speed;
      } else {
        ball.dx =
          (xMinOrPos * Math.abs((ball.x - paddleX) / paddle.width - 1) + 0.5) *
          Ball.Speed;
      }
      ball.dy *= -1;
    }
  }
}

function brickCollision() {
  let ifStatZero = true;
  let directionChanged = false;
  const isBallInsideBrick = (b, ball) =>
    ball.x + 2 * Ball.Radius > b.x &&
    ball.x < b.x + brick.width &&
    ball.y + 2 * Ball.Radius > b.y &&
    ball.y - Ball.Radius < b.y + brick.height;
    Bonus.drawAll();
    Bonus.do();
    // for (c = 0; c < brick.columnCount; c++) {
    //     for (r = 0; r < brick.rowCount; r++) {
    //         let b = bricks[c][r];
    //         if (b.status === 1) {
    //             ifStatZero = false;
    //             if (b.health <= 6 && isBallInsideBrick(b)) {
    //                 if (b.health < 6) {
    //                     b.health -= 1;
    //                     game.score++;
    //                     if(check){
    //                         hitSound.play();
    //                     }
    //                     if (b.bonus) {
    //                         if(b.health < 1){
    //                             b.status = 0;
    //                             new Bonus(b.bonus, b.x + brick.width / 2, b.y + brick.height / 2);
    //                         }
    //                     }
    //                 }

  Bonus.drawAll();
  Bonus.do();
  for (c = 0; c < brick.columnCount; c++) {
    for (r = 0; r < brick.rowCount; r++) {
      let b = bricks[c][r];
      let bulletCol = Bullet.collisionBrick(b);
      for (let i = 0; i < Ball.getAll.length; i++) {
        const ball = Ball.getAll[i];
        if(b.status === 1 && b.health < 6){
          ifStatZero = false;
        }
        if (b.status === 1) {
          if ((b.health <= 6 && isBallInsideBrick(b, ball)) || bulletCol === true) {
            if (b.health < 6) {
              b.health -= 1;
              game.score++;
              if (check) {
                hitSound.play();
              }
              if (b.health < 1) {
                b.status = 0;
                // may add random bouns when brick breaked
                let randGetBonus = Math.random();
                if (randGetBonus >= 0.2 && randGetBonus <= 0.5) {
                  let choseTypeOfBonus = Math.ceil(Math.random() * 4);
                  new Bonus(
                    choseTypeOfBonus,
                    b.x + brick.width / 2,
                    b.y + brick.height / 2
                  );
                }
              }
            }

            if (isBallInsideBrick(b, ball) && !directionChanged) {
              directionChanged = true;
              detectCollisionDirection(b, ball);
            }
          }
        }
      }
    }
  }
  // if (isWin) {
  //     winSound.play();
  //     // ... other code ...
  // }

  if (ifStatZero === true) {
    localStorage.setItem("level", curLevel++);
    // alert('Congratulations!!');
    // document.location.reload();
    isWin = true;
    winSound.play();
  }
}

function detectCollisionDirection(b, ball) {
  const hitFromLeft = () => ball.x + 2 * Ball.Radius - ball.dx <= b.x;
  const hitFromRight = () => ball.x - ball.dx >= b.x + brick.width;

  if (hitFromLeft() || hitFromRight()) {
    ball.dx = -ball.dx;
  } else {
    // Hit from above or below
    ball.dy = -ball.dy;
  }
}

//init
let countLevels = 4;
let curLevel = parseInt(localStorage.getItem("level")) % countLevels || 1;

// key
let key = {
  rightKey: false,
  leftKey: false,
};

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddle.width / 2;
  }
}

function keyDownHandler(e) {
  if (e.key === "ArrowRight") {
    key.rightKey = true;
  } else if (e.key === "ArrowLeft") {
    key.leftKey = true;
  }
  // space button -- pause
  if (e.key === " ") {
    if (game.isStarted && !game.isLost && !game.isWin) {
      game.isPaused = !game.isPaused;
      if (!game.isPaused) {
        play();
      }
    }
  }
}

function keyUpHandler(e) {
  if (e.key === "ArrowRight") {
    key.rightKey = false;
  } else if (e.key === "ArrowLeft") {
    key.leftKey = false;
  }
}

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddle.width / 2;
  }
}

document.addEventListener("keydown", function (event) {
  if (
    event.code === "Enter" &&
    (!game.isStarted || game.isLost || game.isWin)
  ) {
    game.isStarted = true;
    game.isLost = false;
    game.isWin = false;
    game.score = 0;
    game.lives = 3;
    canvas.style.cursor = "initial";
    initBricks();
    ballInit();
    play();

    // if (isLost) {
    //     loseSound.play();
    //     // ... other code ...
    // }
  }
    if (event.code === "Enter" && (!game.isStarted || game.isLost || game.isWin)) {
        game.isStarted = true;
        game.isLost = false;
        game.isWin = false;
        game.score = 0;
        game.lives = 3;
        canvas.style.cursor = "initial";
        initBricks(curLevel);
        ballInit();
        play();
    }
});

function play() {
  cancelAnimationFrame(game.requestId);

  draw();
}

play();
