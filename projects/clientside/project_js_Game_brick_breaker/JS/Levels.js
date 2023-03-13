class Level {
    static one() {
        Ball.Speed = 5;
        drawLevelBricks();
    }

    static two() {
        Ball.Speed = 8;
        drawLevelBricks();
    }

    static three() {
        Ball.Speed = 7;
        drawLevelBricks();
    }
}

function drawBrick(b) {
    const brickColorStart = () => (b.health < 6? "#ffad00": colors[b.health]);
    const brickColorEnd = () => (b.health < 6? colors[b.health]: "white");

    ctx.beginPath();
    // color
    var my_gradient = ctx.createLinearGradient(b.x, b.y, b.x+brick.width+20, b.y+brick.height+20);
    my_gradient.addColorStop(0, brickColorStart());
    my_gradient.addColorStop(1, brickColorEnd());
    ctx.fillStyle = my_gradient;
    // rect
    ctx.rect(b.x, b.y, brick.width, brick.height);
    ctx.fill();
    ctx.closePath();
}


function drawBrickHealth(b) {
    const brickCenterX = () => (b.x + brick.width/2);
    const brickCenterY = () => (b.y + brick.height/2);
    const countCircleRadius = () => (brick.height/3);
    if (b.health < 6){
        if (!b.bonus) {
            // circle
            ctx.beginPath();
            ctx.arc(brickCenterX(), brickCenterY(), countCircleRadius(), 0, 2 * Math.PI);
            ctx.fillStyle = "#eee";
            ctx.fill();


            // count
            ctx.font = "10px Arial";
            ctx.fillStyle = "#000";
            ctx.textBaseline = 'middle';
            ctx.textAlign = "center";
            ctx.fillText(b.health, brickCenterX(), brickCenterY());

        }else {
            // Bonus img
            const bonusImg = new Image();
            bonusImg.src = Bonus.imgPath + b.bonus + ".png";
            ctx.drawImage(bonusImg,
                brickCenterX() - Bonus.radius+2,
                brickCenterY() - Bonus.radius+2,
                Bonus.radius * 2-4,
                Bonus.radius * 2-4);
        }
    }
}

function drawLevelBricks() {
    for (let c = 0; c < brick.columnCount; c++) {
        for (let r = 0; r < brick.rowCount; r++) {
            if (bricks[c][r].health) {
                bricks[c][r].status = 1;
            }else {
                bricks[c][r].status = 0;
            }
            if (bricks[c][r].status) {
                drawBrick(bricks[c][r]);
                drawBrickHealth(bricks[c][r]);
            }
        }
    }
}
