/* 
Create a chess vision game like the one in this link: https://www.chess.com/vision

  Required Features:
  - The user clicks on the 'start' button, after that, a timer of 30 seconds starts.
  - During these 30 seconds, the game asks the user to click on a random square by telling
  the coordinates of this square as domenstrated in the link.
  - The user should click on the correct square.
  - If the clicked square matches the wanted square, it's considered a correct answer, and
  a green check mark is written next to it the the results section.
  - If it's wrong, a red cross mark is written next to it.
  - The score is always displayed and gets updated after every answer.
  - After the 30 seconds elapse, the board should not accept any clicks. and the final score
  is displayed.
  - The style of the page can be different from that in the link.

  Bonus Features:
  - Create two modes for the game. One for white, where the bottom row is considered the "1" row
  and the left column is considered the "a" column one for black where the bottom row is 
  considered the "8" row and the left row is considered the "h" row.
  - Create a mixed mode, where the game suggests for the user the square he/she should click
  on, and also the current direction of the board (white or black).
*/

let chessTable = [];
let color;
let score = 0;

function drawMark(markType = true) {
    let mark;
    if (markType) {
        mark = document.createElement("span");
        mark.id = "mark";
        mark.innerHTML = "&#10003;";
        mark.style.color = "lime";
        mark.style.fontSize = "25px";
        mark.style.fontWeight = "800";
    } else {
        mark = document.createElement("span");
        mark.id = "mark";
        mark.innerHTML = "&#10060;";
    }
    return mark;
}

function renderGame(mode = 0, counter = 0) {
    if (document.querySelector('#mode:checked')) {
        mode = 1;
    }
    if (document.querySelector('#counter:checked')) {
        counter = 1;
    }
    document.getElementById("gameOver").style.display = "none";
    const chessTableElement = document.createElement("div");
    chessTableElement.id = "chessTable";
    document.body.appendChild(chessTableElement);
    if (mode == 0) {
        for (let i = 8; i >= 1; i--) {
            let thisRow = [];
            for (let g = 65; g < 73; g++) {
                thisRow.push(String.fromCharCode(g));
                const span = document.createElement("p");
                span.id = String.fromCharCode(g) + i;
                chessTable.push(String.fromCharCode(g) + i);
                if (counter % 2 == 0) {
                    color = "white";
                } else {
                    color = "green";
                }
                span.style.backgroundColor = color;
                if(g == 65){
                    span.append((i));
                }
                if(i == 1){
                    span.append(String.fromCharCode(g));
                }
                document.getElementById(chessTableElement.id).appendChild(span);
                counter++;
            }
            counter++;
        }
    } else {
        for (let i = 1; i < 9; i++) {
            let thisRow = [];
            for (let g = 72; g >= 65; g--) {
                thisRow.push(String.fromCharCode(g));
                const span = document.createElement("p");
                span.id = String.fromCharCode(g) + i;
                chessTable.push(String.fromCharCode(g) + i);
                if (counter % 2 == 0) {
                    color = "white";
                } else {
                    color = "green";
                }
                span.style.backgroundColor = color;
                if(g == 72){
                    span.append((i));
                }
                if(i == 8){
                    span.append(String.fromCharCode(g));
                }
                document.getElementById(chessTableElement.id).appendChild(span);
                counter++;
            }
            counter++;
        }
    }
}

function gameLogic() {
    let randCode = chessTable[Math.floor(Math.random() * chessTable.length)];
    document.getElementById("clickon").innerHTML = randCode;

    document.getElementById("chessTable").addEventListener("click", function (e) {
        let ma = document.getElementById("mark");
        if (ma) {
            ma.remove();
        }
        if (e.target.id === randCode) {
            e.target.append(drawMark(true));
            score++;
            document.getElementById("score").innerHTML = score;
        } else {
            e.target.append(drawMark(false));
        }
        randCode = chessTable[Math.floor(Math.random() * chessTable.length)];
        document.getElementById("clickon").innerHTML = randCode;
    });
}

let gameStart = 0;
let timer = 30;

document.getElementById("start").addEventListener("click", function () {
    gameStart = 1;
    document.getElementById("start").style.display = "none";
    setInterval(function () {
        document.getElementById("timer").innerHTML = --timer;
    }, 1000);
    renderGame();
    gameLogic();
    setTimeout(function () {
        gameStart = 0;
        document.getElementById("chessTable").remove();
        document.getElementById("gameOver").style.display = "block";
        document.getElementById("gameOver").innerHTML = ("<h1>Game Over your score is " + score + "</h1>");
        document.getElementById("start").style.display = "block";
        score = 0;
        timer = 30;
    }, 30 * 1000);
});