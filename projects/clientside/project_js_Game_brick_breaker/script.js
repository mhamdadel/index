const canvas = document.getElementById("myCanvas");



const ctx = canvas.getContext("2d");


//init
let countLevels = 4; 
let curLevel = parseInt( localStorage.getItem("level")) % countLevels || 1;

// Paddle
const paddleHeight = 10;
const paddleWidth = 150;
let paddleX = (canvas.width - paddleWidth) /2;
let paddleY = (canvas.height - paddleHeight);

// The ball
let ballRadius = 5;
let ballX = canvas.width / 2;
let ballY = canvas.height - paddleHeight - ballRadius;
let ballSpeed = 7;
let dx = ballSpeed * (Math.random() * 2 - 1);  // Random trajectory
let dy = -ballSpeed; // Up

// Ball initialization
function ballInit() {
    ballRadius = 5;
    ballX = paddleX;
    ballY = paddleY;
    ballSpeed = 7;
    dx = ballSpeed * (Math.random() * 2 - 1);  // Random trajectory
    dy = -ballSpeed; // Up
}



// Keyboard state
let rightPressed = false;
let leftPressed = false;




// Bricks info var
const brickRowCount = 16;
const brickColumnCount = 10;
const brickWidth = 50;
const brickHeight = 20;
const brickPadding = 2;
const brickOffsetTop = 2;
const brickOffsetLeft = 70;




var bricks = [];

for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x : 0,
            y : 0,
            status : 1,
            //isLife: false
        };
    }
}





//print screen 
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#ctx";
    ctx.fill();
}


function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#008080";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}


const screenText = {
    start() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Press Enter to Start game ", canvas.width / 2, canvas.height / 2);
    },
    lost() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    },
    win() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Congratulations! You did it!", canvas.width / 2, canvas.height / 2);
    },
    pause() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Continue", canvas.width / 2, canvas.height / 2);
    },

};




// Game state
let isLost = false;
let isStarted = false;
let isPaused = false;
let isWin = false;
let score = 0;
let lives = 3;
let requestId;


//new

// Heart
// Heart's start coordinates
let heartX = canvas.width / 2;
let heartY = 0;
let heartRadius = 5;
let heartSpeed = 5;
let heartVisible = false;

// Heart image
const heartImg = new Image();
heartImg.src = "./heart.png";

// Draw heart
function drawHeart() {
    if (heartVisible) {
        ctx.drawImage(heartImg, heartX - heartRadius, heartY - heartRadius, heartRadius * 2, heartRadius * 2);
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
        if (heartX > paddleX && heartX < paddleX + paddleWidth && heartY > paddleY - heartRadius && heartY < paddleY + paddleHeight + heartRadius) {
            heartVisible = false;
            lives++;
            score++;

        }
    }
}

// Show heart
function showHeart() {
    heartX = bricks[Math.floor(Math.random() * brickColumnCount)][Math.floor(Math.random() * brickRowCount)].x;
    heartY = bricks[Math.floor(Math.random() * brickColumnCount)][Math.floor(Math.random() * brickRowCount)].y;
    heartVisible = true;
}

let bricksHit = 0;


document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("mousemove", mouseMoveHandler);



function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}





// Ball Movement
function update() {
  ballX += dx;
  ballY += dy;
  if (rightPressed) {
    paddleX += ballSpeed;
    if (paddleX + paddleWidth > canvas.width){
      paddleX = canvas.width - paddleWidth;
    }
  }
  if (leftPressed) {
    paddleX -= ballSpeed;
    if (paddleX < 0){
      paddleX = 0;
    }
  }
}

function checkWallsCollision() {
    const hitLeftWall = ()=>(ballX < 0);
    const hitRightWall = ()=>(ballX + (ballRadius*2) > canvas.width);
    const hitTop = ()=>(ballY < 0);
    const hitBottom = ()=>(ballY + (ballRadius*2) > canvas.height);
    const hitPaddle = () => (ballY + 2 * ballRadius > canvas.height - paddleHeight &&
    ballY + ballRadius < canvas.height && 
    ballX + ballRadius > paddleX &&
    ballX + ballRadius < paddleX + paddleWidth);

    if (hitLeftWall()) {
        dx = -dx;
        ballX = 0;
    } else if (hitRightWall()) {
        dx = -dx;
        ballX = canvas.width - (ballRadius*2);
    } else if (hitTop()) {
        dy = -dy;
        ballY = 0;
    } else if (hitPaddle()) {
        dy = -dy;
        ballY = canvas.height - paddleHeight - 2 * ballRadius;
    } else if (hitBottom()) {
        lives--;
        ballInit();
        isLost = lives === 0 ? true : false;
    } 
}


//  add new fe


// Power-up object
// let powerUp = {
//     type: "extraLife",
//     x: 0,
//     y: 0,
//     status: "inactive"
// }

// // In the brick creation loop
// bricks[c][r].isPowerUp = Math.random() < 0.1; // 10% chance of a brick being a power-up

// // In the collision detection logic
// if (bricks[c][r].isPowerUp && bricks[c][r].status === 1) {
//     activatePowerUp(bricks[c][r].x, bricks[c][r].y);
//     bricks[c][r].status = 0;
// }

// function activatePowerUp(x, y) {
//     powerUp.x = x;
//     powerUp.y = y;
//     powerUp.status = "active";
//     lives++;
//     powerUpSound.play();
// }

// // In the main game loop
// if (powerUp.status === "active") {
//     drawPowerUp(powerUp.x, powerUp.y);
// }

// function drawPowerUp(x, y) {
//     ctx.fillStyle = "green";
//     ctx.beginPath();
//     ctx.arc(x, y, 5, 0, Math.PI*2);
//     ctx.fill();
// }



// // Power-up types
// const powerUpTypes = ["extraLife", "widerPaddle"];

// // Power-up probability (percentage chance of power-up spawning in a brick)
// const powerUpProbability = 0.1;

// // Power-up duration (in frames)
// const powerUpDuration = 300;

// // Power-up state
// let activePowerUp = null;
// let powerUpTimer = 0;

// // Add a power-up to a brick
// function addPowerUp(brick) {
//     if (Math.random() < powerUpProbability) {
//         brick.powerUp = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
//     }
// }

// // Handle power-up activation
// function activatePowerUp(powerUp) {
//     activePowerUp = powerUp;
//     powerUpTimer = powerUpDuration;
//     if (powerUp === "extraLife") {
//         lives++;
//     } else if (powerUp === "widerPaddle") {
//         paddleWidth *= 1.5;
//     }
// }

// // Handle power-up deactivation
// function deactivatePowerUp() {
//     activePowerUp = null;
//     if (powerUp === "extraLife") {
//         lives--;
//     } else if (powerUp === "widerPaddle") {
//         paddleWidth /= 1.5;
//     }
// }

// // Check for power-up collision
// function checkPowerUpCollision() {
//     if (activePowerUp) {
//         if (x > paddleX && x < paddleX + paddleWidth && y > paddleY) {
//             deactivatePowerUp();
//         }
//     }
// }

// // Update power-up state
// function updatePowerUps() {
//     if (activePowerUp) {
//         powerUpTimer--;
//         if (powerUpTimer === 0) {
//             deactivatePowerUp();
//         }
//     }
// }

// // Draw power-up state
// function drawPowerUps() {
//     if (activePowerUp) {
//         ctx.font = "16px Arial";
//         ctx.fillStyle = "black";
//         ctx.textAlign = "center";
//         ctx.fillText(`Active Power-up: ${activePowerUp}`, canvas.width / 2, 20);
//     }
// }

// 

const colors = ['red', '#000080', 'yellow', 'blue', 'green','black','#000080'];

function drawBricks(lvl) {
    if (lvl == 1) {
        Level.one()
    } else if (lvl == 2) {
        Level.two()
    } else if (lvl == 3) {
        Level.three()
    }
}

function keyDownHandler(e) {
    if (e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'ArrowLeft') {
        leftPressed = true;
    }
    // space button -- pause
    if (e.key === ' ') {
        if (isStarted && !isLost && !isWin) {
            isPaused = !isPaused;
            if(!isPaused) {
                play();
            }
        }
    }
}

function keyUpHandler(e) {
    if (e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}




function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}


function brickCollision(){
    for(c=0; c<brickColumnCount;c++){
        for(r=0; r<brickRowCount; r++){
            let b = bricks[c][r];
            if(b.status === 1){
                if(ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight){
                    dy = -dy;
                    b.status = 0;
                    score++;

                    //new add heart 
                    bricksHit++;
                            if (bricksHit > 1) {
                                showHeart();
                            }


                    if (score === brickRowCount*brickColumnCount){
                        localStorage.setItem("level", curLevel++);
                        alert('Congratulations!!');
                        //document.location.reload();
                        isWin = true;
                    }

                    // if (bricks[c][r].status === 1) {
                    //     if (ballX > bricks[c][r].x && ballX < bricks[c][r].x + brickWidth && ballY > bricks[c][r].y && ballY < bricks[c][r].y + brickHeight) {
                    //         dy = -dy;
                    //         bricks[c][r].status = 0;
                            
                    //     }
                    //     ctx.beginPath();
                    //     ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
                    //     ctx.fillStyle = "#0095DD";
                    //     ctx.fill();
                    //     ctx.closePath();
                    // }


                }
            }
        }
    }
}


function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#008080";
    ctx.fillText("Score: " + score, 40, 15);
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!isStarted) {
        screenText.start();
    } else if (isLost) {
        screenText.lost();
    } else if (isWin) {
        screenText.win();
    } else if (isPaused) {
        screenText.pause();
    } else {
        drawBricks(curLevel);
        drawPaddle();
        drawScore();
        drawBall();
        drawLives();
        update();
        
        //new heart 
        drawHeart();
        updateHeart();

        checkWallsCollision();
        brickCollision();


        requestId = requestAnimationFrame(draw);
    }
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Enter" && (!isStarted || isLost || isWin)) {
        isStarted = true;
        isLost = false;
        isWin = false;
        score = 0;
        lives = 4 - curLevel;
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                bricks[c][r].status = 1;
            }
        }
        ballInit();
        play();
    }
});


function play() {
  cancelAnimationFrame(requestId);
  
  draw();
}

play();


class Level {
    static one() {
        ballSpeed = 5;
        for (let c = 0; c < brickColumnCount; c++) {
            let brickX = 0, brickY = 0;
            for (let r = c; r < brickRowCount / 2; r++) {
                if (bricks[c][r].status) {
                    brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
                    brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = colors[c];
                    ctx.fill();
                    ctx.closePath();
                }
                

                brickX = 0, brickY = 0;
            }
        }

    }

    static two() {
        ballSpeed = 8;
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = c; r < brickRowCount / 2; r++) {
                bricks[c][r].status = 2;
            }
        }
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status === 1) {
                    let brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
                    let brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = colors[c];
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    static three() {
        ballSpeed = 7;
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status === 1) {
                    let brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
                    let brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = colors[c];
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
}