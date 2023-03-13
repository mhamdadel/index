let easyLvlColor = "black";
let mediumLvlColor = "black";
let hardLvlColor = "black";

const screenText = {
    clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image.body,0,0,canvas.width,canvas.height);

    },
    start() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Press Enter to Start game ", canvas.width / 2, canvas.height / 2);
    },
    menu() {
        ctx.font = "italic 60px serif";
        ctx.fillStyle = "blue";
        ctx.textAlign = "center";
        ctx.fillText("Click on Level and Press Enter", canvas.width / 2, 60);
        ctx.fillStyle = easyLvlColor;
        ctx.fillText("Beginner", canvas.width / 2, 200);
        ctx.fillStyle = mediumLvlColor;
        ctx.fillText("Medium", canvas.width / 2, 300);
        ctx.fillStyle = hardLvlColor;
        ctx.fillText("Expert", canvas.width / 2, 400);
    },
    lost() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
        ctx.fillStyle = "blue";
        ctx.fillText("Press Enter to start again", canvas.width / 2, canvas.height - 25);
        loseSound.play();
    },

    win() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "gold";
        ctx.textAlign = "center";
        ctx.fillText("Congratulations! You did it!", canvas.width / 2, canvas.height / 2);
    },
    pause() {
        ctx.font = "50px Arial";
        ctx.fillStyle = "blue";
        ctx.textAlign = "center";
        ctx.fillText("Press Space to Continue", canvas.width / 2, canvas.height / 2);
    },
};

canvas.onclick = function(e){
    if (!game.isStarted) {
        const MiddleX = () => e.offsetX >= (canvas.width / 2)- 100 && e.offsetX <= (canvas.width / 2) + 100;
        const EasyY = () => e.offsetY >= 150 && e.offsetY <= 225;
        const MediumY = () => e.offsetY >= 250 && e.offsetY <= 325;
        const HardY = () => e.offsetY >= 350 && e.offsetY <= 425;

        if(MiddleX()){
            if(EasyY()){
                curLevel = 1;
            }else if(MediumY()){
                curLevel = 2;
            }else if(HardY()){
                curLevel = 3;
            }
        }
    }
}


let changed = 0;
canvas.onmousemove = function(e){
    if (!game.isStarted) {
        const MiddleX = () => e.offsetX >= (canvas.width / 2)- 100 && e.offsetX <= (canvas.width / 2) + 100;
        const EasyY = () => e.offsetY >= 150 && e.offsetY <= 225;
        const MediumY = () => e.offsetY >= 250 && e.offsetY <= 325;
        const HardY = () => e.offsetY >= 350 && e.offsetY <= 425;

        if(MiddleX()){
            if(EasyY()){
                canvas.style.cursor = "pointer";
                easyLvlColor = "blue";
                changed = 1;
                screenText.clear();
                screenText.menu();
            }else if(MediumY()){
                canvas.style.cursor = "pointer";
                mediumLvlColor = "blue";
                changed = 1;
                screenText.clear();
                screenText.menu();
            }else if(HardY()){
                canvas.style.cursor = "pointer";
                hardLvlColor = "blue";
                changed = 1;
                screenText.clear();
                screenText.menu();
            }else{
                if (changed) {
                    canvas.style.cursor = "initial";
                    easyLvlColor = "green";
                    mediumLvlColor = "cyan";
                    hardLvlColor = "red";
                    changed = 0;
                    screenText.clear();
                    screenText.menu();
                }
            }
        }else{
            if (changed) {
                canvas.style.cursor = "initial";
                easyLvlColor = "green";
                mediumLvlColor = "cyan";
                hardLvlColor = "red";
                changed = 0;
                screenText.clear();
                screenText.menu();
            }
        }
    }
}
