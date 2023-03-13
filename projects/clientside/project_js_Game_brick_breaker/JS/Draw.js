// Game state
let game = {
  isLost: false,
  isStarted: false,
  isPaused: false,
  isWin: false,
  score: 0,
  lives: 3,
  requestId: null,
};

function drawgame() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("lives: " + game.lives , canvas.width - 75, 20);
    ctx.drawImage(image.heart, canvas.width - 40, 12, 20, 14);
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("Score: " + game.score, 40, 15);
}

function drawBall() {
  // ctx.beginPath();
  // ctx.arc(ball.x, ball.y, ball.Radius, 0, 2 * Math.PI);
  // ctx.fillStyle = "#ctx";
  // ctx.fill();
}

//print screen
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddle.width, paddle.height);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Heart
// Heart's start coordinates
let heartX = canvas.width / 2;
let heartY = 0;
let heartRadius = 5;
let heartSpeed = 5;
let heartVisible = false;


// Draw heart
function drawHeart() {
  if (heartVisible) {
    ctx.drawImage(
      heartImg,
      heartX - heartRadius,
      heartY - heartRadius,
      heartRadius * 2,
      heartRadius * 2
    );
  }
}

// Update heart position
function updateHeart() {
  if (heartVisible) {
    heartY += heartSpeed;
    if (heartY > canvas.height) {
      heartVisible = false;
    }
    // Check for collision with paddle
    if (
      heartX > paddleX &&
      heartX < paddleX + paddle.width &&
      heartY > paddleY - heartRadius &&
      heartY < paddleY + paddle.height + heartRadius
    ) {
      heartVisible = false;
      game.lives++;
      game.score++;
    }
  }
}

// Show heart
function showHeart() {
  // heartX = brick[Math.floor(Math.random() * brick.columnCount)][Math.floor(Math.random() * brick.rowCount)].height;
  // heartY = brick[Math.floor(Math.random() * brick.columnCount)][Math.floor(Math.random() * brick.rowCount)].width;
  heartX =
    bricks[Math.floor(Math.random() * brick.columnCount)][
      Math.floor(Math.random() * brick.rowCount)
    ].x + 300;
  heartY =
    bricks[Math.floor(Math.random() * brick.columnCount)][
      Math.floor(Math.random() * brick.rowCount)
    ].y;
  heartVisible = true;
}

let bricksHit = 0;

function drawBricks(lvl) {
    if (lvl == 1) {
        Level.one();
    } else if (lvl == 2) {
        Level.two()
    } else if (lvl == 3) {
        Level.three()
    }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image.background, 0, 0, canvas.width, canvas.height);

  if (!game.isStarted) {
    // screenText.start();
    screenText.menu();
  } else if (game.isLost) {
    screenText.lost();
  } else if (game.isWin) {
    screenText.win();
  } else if (game.isPaused) {
    screenText.pause();
  } else {
    drawBricks(curLevel);
    drawPaddle();
    drawBall();
    drawgame();

    update();
    gun = new Gun();
    gun.mouseFire();
    bulletMovement();
    drawScore();
    drawHeart();
    updateHeart();
    checkWallsCollision();
    brickCollision();

    game.requestId = requestAnimationFrame(draw);
  }
}
