var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ch = canvas.height;
var cw = canvas.width;
var c = canvas.getContext("2d");
var out = document.getElementById("out");
var err = document.getElementById("err");
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var init = requestAnimationFrame(start);
player1 = new Player(cw * .1, ch * 2 / 3, '1');
player4 = new Player(cw * .1, ch * 1 / 2, '4');
player2 = new Player(cw - cw * .1, ch * 2 / 3, '2');
player3 = new Player(cw - cw * .1, ch * 1 / 2, '3');
ball = new Ball(cw / 2, ch / 2);
var wDown = false;
var sDown = false;
var aDown = false;
var dDown = false;
var upDown = false;
var downDown = false;
var leftDown = false;
var rightDown = false;
var upbtn = false;
var downbtn = false;
var leftbtn = false;
var rightbtn = false;
var uDown = false;
var jDown = false;
var hDown = false;
var kDown = false;

function start() {
	clear();
	renderBackground();
	renderGates();
	checkKeyboardStatus();
	checkPlayersBounds();
	checkBallBounds();
	checkPlayers_BallCollision();
	movePlayers();
	moveBall();
	renderPlayers();
	renderBall();



	document.getElementById('g1').innerHTML = player1.score
	document.getElementById('g2').innerHTML = player2.score
	requestAnimationFrame(start);
}
var last_touch = document.getElementById('last_touch');

function Ball(x, y) {
	this.x = x;
	this.y = y;
	this.xVel = 0;
	this.yVel = 0;
	this.decel = 0.04;
	this.size = cw * .004;
}

function Player(x, y, name) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.size = cw * .015;
	this.xVel = 0;
	this.yVel = 0;
	this.score = 0;
	this.accel = .5;
	this.decel = .5;
	this.maxSpeed = 7;
}

function reset() {

	var score1 = player1.score;
	var out;
	var score2 = player2.score;

	player1 = new Player(cw * .1, ch * 2 / 3, '1');
	player4 = new Player(cw * .1, ch * 1 / 2, '4');
	player1.score = score1;

	player2 = new Player(cw - cw * .1, ch * 2 / 3, '2');
	player3 = new Player(cw - cw * .1, ch * 1 / 2, '3');
	player2.score = score2;

	ball = new Ball(cw / 2, ch / 2);

	wDown = false;
	sDown = false;
	aDown = false;
	dDown = false;

	upDown = false;
	downDown = false;
	leftDown = false;
	rightDown = false;

	upbtn = false;
	downbtn = false;
	leftbtn = false;
	rightbtn = false;

	uDown = false;
	jDown = false;
	hDown = false;
	kDown = false;
}

function movePlayers() {
	player1.x += player1.xVel;
	player1.y += player1.yVel;

	player2.x += player2.xVel;
	player2.y += player2.yVel;

	player3.x += player3.xVel;
	player3.y += player3.yVel;

	player4.x += player4.xVel;
	player4.y += player4.yVel;


}

function checkPlayers_BallCollision() {
	// push ball and players
	// between ball and players
	var p1_ball_distance = getDistance(player1.x, player1.y, ball.x, ball.y) - player1.size - ball.size;
	if (p1_ball_distance < 0) {
		collide(ball, player1, true);
		last_touch.innerHTML = 'player1';
	}
	var p2_ball_distance = getDistance(player2.x, player2.y, ball.x, ball.y) - player2.size - ball.size;
	if (p2_ball_distance < 0) {
		collide(ball, player2, true);
		last_touch.innerHTML = 'player2';
	}
	var p3_ball_distance = getDistance(player3.x, player3.y, ball.x, ball.y) - player3.size - ball.size;
	if (p3_ball_distance < 0) {
		collide(ball, player3, true);
		last_touch.innerHTML = 'player3';
	}
	var p4_ball_distance = getDistance(player4.x, player4.y, ball.x, ball.y) - player4.size - ball.size;
	if (p4_ball_distance < 0) {
		collide(ball, player4, true);
		last_touch.innerHTML = 'player4';
	}
	if (last_touch.text) {

	}
	//between players and themselfs player 1
	var p1_p2_distance = getDistance(player1.x, player1.y, player2.x, player2.y) - player1.size - player2.size;
	if (p1_p2_distance < 0) {
		collide(player2, player1);
	}
	var p1_p3_distance = getDistance(player1.x, player1.y, player3.x, player3.y) - player1.size - player3.size;
	if (p1_p3_distance < 0) {
		collide(player3, player1);
	}
	var p1_p4_distance = getDistance(player1.x, player1.y, player4.x, player4.y) - player1.size - player4.size;
	if (p1_p4_distance < 0) {
		collide(player4, player1);
	}
	//between players and themselfs player 2

	var p2_p3_distance = getDistance(player2.x, player2.y, player3.x, player3.y) - player2.size - player3.size;
	if (p2_p3_distance < 0) {
		collide(player3, player2);
	}
	var p2_p4_distance = getDistance(player2.x, player2.y, player4.x, player4.y) - player2.size - player4.size;
	if (p2_p4_distance < 0) {
		collide(player4, player2);
	}
	//between players and themselfs player 3

	var p3_p4_distance = getDistance(player3.x, player3.y, player4.x, player4.y) - player3.size - player4.size;
	if (p3_p4_distance < 0) {
		collide(player4, player3);
	}

}

function collide(cir1, cir2, isBall = false) {
	var dx = (cir1.x - cir2.x) / (cir1.size);
	var dy = (cir1.y - cir2.y) / (cir1.size);
	cir2.xVel = -dx / 3 * 2;
	cir2.yVel = -dy / 3 * 2;
	if (isBall === false) {
		cir1.xVel = dx * 2;
		cir1.yVel = dy * 2;
	} else if (isBall === true) {
		cir1.xVel = dx * 4;
		cir1.yVel = dy * 4;
	}
}

function getDistance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function moveBall() {
	if (ball.xVel !== 0) {
		if (ball.xVel > 0) {
			ball.xVel -= ball.decel;
			if (ball.xVel < 0) ball.xVel = 0;
		} else {
			ball.xVel += ball.decel;
			if (ball.xVel > 0) ball.xVel = 0;
		}
	}
	if (ball.yVel !== 0) {
		if (ball.yVel > 0) {
			ball.yVel -= ball.decel;
			if (ball.yVel < 0) ball.yVel = 0;
		} else {
			ball.yVel += ball.decel;
			if (ball.yVel > 0) ball.yVel = 0;
		}
	}
	ball.x += ball.xVel;
	ball.y += ball.yVel;
}

function checkBallBounds() {
	if (ball.x + ball.size + 5 > canvas.width) {
		if (ball.y > ch * .35 && ball.y < ch * .65) {
			player1.score++;
			reset();
			return;
		}
		//ball.x = canvas.width - ball.size;
		//ball.xVel *= -1.5;
		err.innerHTML = 'أخر خطأ :' + last_touch.innerText;
	}
	if (ball.x - ball.size - 5 < 0) {
		if (ball.y > ch * .35 && ball.y < ch * .65) {
			player2.score++;
			reset();
			return;
		}
		//ball.x = 0 + ball.size;
		//ball.xVel *= -1.5;
		err.innerHTML = 'أخر خطأ :' + last_touch.innerText;
	}
	if (ball.y + ball.size > canvas.height) {
		//ball.y = canvas.height - ball.size;
		//ball.yVel *= -1.5;
		err.innerHTML = 'أخر خطأ :' + last_touch.innerText;
	}
	if (ball.y - ball.size < 0) {
		//ball.y = 0 + ball.size;
		//ball.yVel *= -1.5;
		err.innerHTML = 'أخر خطأ :' + last_touch.innerText;
	}
}

function checkPlayersBounds() {
	if (player1.x + player1.size > canvas.width) {
		player1.x = canvas.width - player1.size;
		player1.xVel *= -0.5;
	}
	if (player1.x - player1.size < 0) {
		player1.x = 0 + player1.size;
		player1.xVel *= -0.5;
	}
	if (player1.y + player1.size > canvas.height) {
		player1.y = canvas.height - player1.size;
		player1.yVel *= -0.5;
	}
	if (player1.y - player1.size < 0) {
		player1.y = 0 + player1.size;
		player1.yVel *= -0.5;
	}
	//2222222222222222222222222222222222222222
	if (player2.x + player2.size > canvas.width) {
		player2.x = canvas.width - player2.size;
		player2.xVel *= -0.5;
	}
	if (player2.x - player2.size < 0) {
		player2.x = 0 + player2.size;
		player2.xVel *= -0.5;
	}
	if (player2.y + player2.size > canvas.height) {
		player2.y = canvas.height - player2.size;
		player2.yVel *= -0.5;
	}
	if (player2.y - player2.size < 0) {
		player2.y = 0 + player2.size;
		player2.yVel *= -0.5;
	}
	//3333333333333333333333333333333333333333333
	if (player3.x + player3.size > canvas.width) {
		player3.x = canvas.width - player3.size;
		player3.xVel *= -0.5;
	}
	if (player3.x - player3.size < 0) {
		player3.x = 0 + player3.size;
		player3.xVel *= -0.5;
	}
	if (player3.y + player3.size > canvas.height) {
		player3.y = canvas.height - player3.size;
		player3.yVel *= -0.5;
	}
	if (player3.y - player3.size < 0) {
		player3.y = 0 + player3.size;
		player3.yVel *= -0.5;
	}
	//444444444444444444444444444444444444444444444
	if (player4.x + player4.size > canvas.width) {
		player4.x = canvas.width - player4.size;
		player4.xVel *= -0.5;
	}
	if (player4.x - player4.size < 0) {
		player4.x = 0 + player4.size;
		player4.xVel *= -0.5;
	}
	if (player4.y + player4.size > canvas.height) {
		player4.y = canvas.height - player4.size;
		player4.yVel *= -0.5;
	}
	if (player4.y - player4.size < 0) {
		player4.y = 0 + player4.size;
		player4.yVel *= -0.5;
	}
	//ballllllllllllllllllllllllllll
	//444444444444444444444444444444444444444444444
	if (ball.x + ball.size > canvas.width) {
		ball.x = canvas.width - ball.size;
		ball.xVel *= -0.5;
	}
	if (ball.x - ball.size < 0) {
		ball.x = 0 + ball.size;
		ball.xVel *= -0.5;
	}
	if (ball.y + ball.size > canvas.height) {
		ball.y = canvas.height - ball.size;
		ball.yVel *= -0.5;
	}
	if (ball.y - ball.size < 0) {
		ball.y = 0 + ball.size;
		ball.yVel *= -0.5;
	}
}

function checkKeyboardStatus() {
	if (wDown) {
		if (player1.yVel > -player1.maxSpeed) {
			player1.yVel -= player1.accel;
		} else {
			player1.yVel = -player1.maxSpeed;
		}
	} else {
		if (player1.yVel < 0) {
			player1.yVel += player1.decel;
			if (player1.yVel > 0) player1.yVel = 0;
		}
	}
	if (sDown) {
		if (player1.yVel < player1.maxSpeed) {
			player1.yVel += player1.accel;
		} else {
			player1.yVel = player1.maxSpeed;
		}
	} else {
		if (player1.yVel > 0) {
			player1.yVel -= player1.decel;
			if (player1.yVel < 0) player1.yVel = 0;
		}
	}
	if (aDown) {
		if (player1.xVel > -player1.maxSpeed) {
			player1.xVel -= player1.accel;
		} else {
			player1.xVel = -player1.maxSpeed;
		}
	} else {
		if (player1.xVel < 0) {
			player1.xVel += player1.decel;
			if (player1.xVel > 0) player1.xVel = 0;
		}
	}
	if (dDown) {
		if (player1.xVel < player1.maxSpeed) {
			player1.xVel += player1.accel;
		} else {
			player1.xVel = player1.maxSpeed;
		}
	} else {
		if (player1.xVel > 0) {
			player1.xVel -= player1.decel;
			if (player1.xVel < 0) player1.xVel = 0;
		}
	}

	//PLAYER 2

	if (upDown) {
		if (player2.yVel > -player2.maxSpeed) {
			player2.yVel -= player2.accel;
		} else {
			player2.yVel = -player2.maxSpeed;
		}
	} else {
		if (player2.yVel < 0) {
			player2.yVel += player2.decel;
			if (player2.yVel > 0) player2.yVel = 0;
		}
	}
	if (downDown) {
		if (player2.yVel < player2.maxSpeed) {
			player2.yVel += player2.accel;
		} else {
			player2.yVel = player2.maxSpeed;
		}
	} else {
		if (player2.yVel > 0) {
			player2.yVel -= player2.decel;
			if (player2.yVel < 0) player2.yVel = 0;
		}
	}
	if (leftDown) {
		if (player2.xVel > -player2.maxSpeed) {
			player2.xVel -= player2.accel;
		} else {
			player2.xVel = -player2.maxSpeed;
		}
	} else {
		if (player2.xVel < 0) {
			player2.xVel += player2.decel;
			if (player2.xVel > 0) player2.xVel = 0;
		}
	}
	if (rightDown) {
		if (player2.xVel < player2.maxSpeed) {
			player2.xVel += player2.accel;
		} else {
			player2.xVel = player2.maxSpeed;
		}
	} else {
		if (player2.xVel > 0) {
			player2.xVel -= player2.decel;
			if (player2.xVel < 0) player2.xVel = 0;
		}
	}

	//PLAYER 3

	if (upbtn) {
		if (player3.yVel > -player3.maxSpeed) {
			player3.yVel -= player3.accel;
		} else {
			player3.yVel = -player3.maxSpeed;
		}
	} else {
		if (player3.yVel < 0) {
			player3.yVel += player3.decel;
			if (player3.yVel > 0) player3.yVel = 0;
		}
	}
	if (downbtn) {
		if (player3.yVel < player3.maxSpeed) {
			player3.yVel += player3.accel;
		} else {
			player3.yVel = player3.maxSpeed;
		}
	} else {
		if (player3.yVel > 0) {
			player3.yVel -= player3.decel;
			if (player3.yVel < 0) player3.yVel = 0;
		}
	}
	if (leftbtn) {
		if (player3.xVel > -player3.maxSpeed) {
			player3.xVel -= player3.accel;
		} else {
			player3.xVel = -player3.maxSpeed;
		}
	} else {
		if (player3.xVel < 0) {
			player3.xVel += player3.decel;
			if (player3.xVel > 0) player3.xVel = 0;
		}
	}
	if (rightbtn) {
		if (player3.xVel < player3.maxSpeed) {
			player3.xVel += player3.accel;
		} else {
			player3.xVel = player3.maxSpeed;
		}
	} else {
		if (player3.xVel > 0) {
			player3.xVel -= player3.decel;
			if (player3.xVel < 0) player3.xVel = 0;
		}
	}

	//PLAYER 4

	if (uDown) {
		if (player4.yVel > -player4.maxSpeed) {
			player4.yVel -= player4.accel;
		} else {
			player4.yVel = -player4.maxSpeed;
		}
	} else {
		if (player4.yVel < 0) {
			player4.yVel += player4.decel;
			if (player4.yVel > 0) player4.yVel = 0;
		}
	}
	if (jDown) {
		if (player4.yVel < player4.maxSpeed) {
			player4.yVel += player4.accel;
		} else {
			player4.yVel = player4.maxSpeed;
		}
	} else {
		if (player4.yVel > 0) {
			player4.yVel -= player4.decel;
			if (player4.yVel < 0) player4.yVel = 0;
		}
	}
	if (hDown) {
		if (player4.xVel > -player4.maxSpeed) {
			player4.xVel -= player4.accel;
		} else {
			player4.xVel = -player4.maxSpeed;
		}
	} else {
		if (player4.xVel < 0) {
			player4.xVel += player4.decel;
			if (player4.xVel > 0) player4.xVel = 0;
		}
	}
	if (kDown) {
		if (player4.xVel < player4.maxSpeed) {
			player4.xVel += player4.accel;
		} else {
			player4.xVel = player4.maxSpeed;
		}
	} else {
		if (player4.xVel > 0) {
			player4.xVel -= player4.decel;
			if (player4.xVel < 0) player4.xVel = 0;
		}
	}

}

document.onkeyup = function (e) {
	if (e.keyCode === 87) {
		wDown = false;
	}
	if (e.keyCode === 65) {
		aDown = false;
	}
	if (e.keyCode === 68) {
		dDown = false;
	}
	if (e.keyCode === 83) {
		sDown = false;
	}
	//2222222222222222
	if (e.keyCode === 38) {
		upDown = false;
	}
	if (e.keyCode === 37) {
		leftDown = false;
	}
	if (e.keyCode === 40) {
		downDown = false;
	}
	if (e.keyCode === 39) {
		rightDown = false;
	}
	//33333333333333333333333
	if (e.keyCode === 104) {
		upbtn = false;
	}
	if (e.keyCode === 101) {
		downbtn = false;
	}
	if (e.keyCode === 100) {
		leftbtn = false;
	}
	if (e.keyCode === 102) {
		rightbtn = false;
	}
	//444444444444444444444
	if (e.keyCode === 85) {
		uDown = false;
	}
	if (e.keyCode === 74) {
		jDown = false;
	}
	if (e.keyCode === 72) {
		hDown = false;
	}
	if (e.keyCode === 75) {
		kDown = false;
	}
}

document.onkeydown = function (e) {
	if (e.keyCode === 87) {
		wDown = true;
	}
	if (e.keyCode === 65) {
		aDown = true;
	}
	if (e.keyCode === 68) {
		dDown = true;
	}
	if (e.keyCode === 83) {
		sDown = true;
	}

	if (e.keyCode === 38) {
		upDown = true;
	}
	if (e.keyCode === 37) {
		leftDown = true;
	}
	if (e.keyCode === 40) {
		downDown = true;
	}
	if (e.keyCode === 39) {
		rightDown = true;
	}

	if (e.keyCode === 104) {
		upbtn = true;
	}
	if (e.keyCode === 101) {
		downbtn = true;
	}
	if (e.keyCode === 100) {
		leftbtn = true;
	}
	if (e.keyCode === 102) {
		rightbtn = true;
	}
	//444444444444444444444
	if (e.keyCode === 85) {
		uDown = true;
	}
	if (e.keyCode === 74) {
		jDown = true;
	}
	if (e.keyCode === 72) {
		hDown = true;
	}
	if (e.keyCode === 75) {
		kDown = true;
	}
}

function renderBall() {
	c.save();
	c.beginPath();
	c.fillStyle = "white";
	c.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
	c.fill();
	c.closePath();
	c.restore();
}

function renderPlayers() {
	c.save();
	c.fillStyle = "black";
	c.beginPath();
	c.arc(player1.x, player1.y, player1.size, 0, Math.PI * 2);
	c.fillText(player1.name, player1.x - (player1.name.length * 3), player1.y + ch * .05);
	c.fill();
	c.closePath();

	c.beginPath();
	c.fillStyle = "blue";
	c.arc(player2.x, player2.y, player2.size, 0, Math.PI * 2);
	c.fillText(player2.name, player2.x - (player2.name.length * 3), player2.y + ch * .05);
	c.fill();
	c.closePath();

	c.beginPath();
	c.fillStyle = "aqua";
	c.arc(player3.x, player3.y, player3.size, 0, Math.PI * 2);
	c.fillText(player3.name, player3.x - (player3.name.length * 3), player3.y + ch * .05);
	c.fill();
	c.closePath();

	c.beginPath();
	c.fillStyle = "rgba(207, 207, 207, 1)";
	c.arc(player4.x, player4.y, player4.size, 0, Math.PI * 2);
	c.fillText(player4.name, player4.x - (player4.name.length * 3), player4.y + ch * .05);
	c.fill();
	c.closePath();

	c.restore();
}

function renderGates() {
	c.save();
	c.beginPath();
	c.moveTo(0, ch * .35);
	c.lineTo(0, ch * .65);
	c.strokeStyle = "black";
	c.lineWidth = 10;
	c.stroke();
	c.closePath();
	c.beginPath();
	c.moveTo(canvas.width, ch * .35);
	c.lineTo(canvas.width, ch * .65);
	c.strokeStyle = "blue";
	c.lineWidth = 10;
	c.stroke();
	c.closePath();
	c.restore();
}

function renderBackground() {
	c.save();
	c.fillStyle = "#66aa66";
	c.fillRect(0, 0, canvas.width, canvas.height);
	c.strokeStyle = "rgba(255,255,255,0.6)";
	c.beginPath();
	c.arc(canvas.width / 2, canvas.height / 2, 150, 0, Math.PI * 2);
	c.closePath();
	c.lineWidth = 10;
	c.stroke();
	c.closePath();
	c.beginPath();
	c.moveTo(cw / 2, 0);
	c.lineTo(cw / 2, ch);
	c.strokeStyle = "rgba(255,255,255,0.6)";
	c.lineWidth = 10;
	c.stroke();
	c.closePath();
	c.restore();
}

function clear() {
	c.clearRect(0, 0, canvas.width, canvas.height);
}