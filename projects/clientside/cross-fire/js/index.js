var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var out = document.getElementById("out");

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var init = requestAnimationFrame(start);
var player1 = new Player(100, 350, '1');
var player2 = new Player(1160, 300, '2');
var player3 = new Player(1160, 450, '3');
var player4 = new Player(1160, 600, '4');


var dt, lastTime;
var NoFire;
var fires = Array();
var grounds = Array();

var mX, mY, nMX, nMY;

var wDown = false;
var sDown = false;
var aDown = false;
var dDown = false;
var fDown = false;

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
	checkPlayers_BallCollision();
	checkKeyboardStatus();
	checkPlayersBounds();
	movePlayers();
	shot();
	renderPlayers();
	out.innerHTML = 'player1: ' + player1.score + ' || ' + 'player2: ' + player2.score +
		' || ' + 'player3: ' + player3.score + ' || ' + 'player4: ' + player4.score;

	requestAnimationFrame(start);


	nMX = mX - player1.x;
	nMY = mY - player1.y;

	if (nMX > 150 && nMY > 150) {
		nMX /= 1.1;
		nMY /= 1.1;
	}
}


function fire(x, y, dirx, diry) {
	this.x = x;
	this.y = y;
	this.size = 2;
	var mag = Math.sqrt(dirx * dirx + diry * diry);
	this.xVel = (dirx / mag) * 50;
	this.yVel = (diry / mag) * 50;
	this.power = 1;
}

function Player(x, y, name) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.size = 20;
	this.xVel = 0;
	this.yVel = 0;
	this.score = 0;
	this.accel = .5;
	this.decel = .5;
	this.maxSpeed = 4.5;
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

	player4.x += player4.xVel;
	player4.y += player4.yVel;

	for (var i = 0; i < fires.length; i++) {
		fires[i].x += fires[i].xVel;
		fires[i].y += fires[i].yVel;
	}

}


function shot() {
	if (fDown === true) {

		if (player1.y <= (player2.y + 10) && player1.y >= (player2.y - 10)) {
			if (getDx(player1.x, player2.x) > 0 && getDx(player1.x, player2.x) <= 200) {
				player2.score -= 100;
			} else if (getDx(player1.x, player2.x) > 200 && getDx(player1.x, player2.x) <= 600) {
				player2.score -= 80;
			} else if (getDx(player1.x, player2.x) > 600 && getDx(player1.x, player2.x) <= 1000) {
				player2.score -= 50;
			} else if (getDx(player1.x, player2.x) > 800 && getDx(player1.x, player2.x) <= 1500) {
				player2.score -= 15;

			}
			fDown = false;
		} else {
			NoFire = false;
		}
		if (player1.y <= (player3.y + 10) && player1.y >= (player3.y - 10)) {
			player3.score -= 1;
			fDown = false;
		} else {
			NoFire = false;
		}
		if (player1.y <= (player4.y + 10) && player1.y >= (player4.y - 10)) {
			player4.score -= 1;
			fDown = false;
		} else {
			NoFire = false;
		}
		if (NoFire == false) {
			fDown = false;
		}

	}

}

function collide(cir1, cir2) {
	var dx = (cir1.x - cir2.x) / (cir1.size);
	var dy = (cir1.y - cir2.y) / (cir1.size);
	cir2.xVel = -dx;
	cir2.yVel = -dy;
	cir1.xVel = dx;
	cir1.yVel = dy;
}

function getDistance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function getDx(x1, x2) {
	return (x2 + 10) - (x1 + 10);
}

function line(x1, y1, x2, y2, size) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;


	c.moveTo(this.x1, this.y1);
	c.lineTo(this.x2, this.y2);
	c.stroke();
}

function ground(x1, y1, W, H) {

	c.fillStyle = "#927070";

	c.fillRect(x1, y1 - H, W, H);
	c.stroke();

}

function getMousePos(canvas, evt) {
	var r = canvas.getBoundingClientRect();
	mX = evt.clientX - r.left,
		mY = evt.clientY - r.top;
}

function checkPlayers_BallCollision() {

	// push ball and players
	// between ball and players
	for (var i = 0; i < fires.length; i++) {
		var p2_ball_distance = getDistance(player2.x, player2.y, fires[i].x, fires[i].y) - player2.size - fires[i].size;
		if (p2_ball_distance < 5) {

			player1.score += 1;
			player2.score -= 1;
		}
		var p3_ball_distance = getDistance(player3.x, player3.y, fires[i].x, fires[i].y) - player3.size - fires[i].size;
		if (p3_ball_distance < 5) {
			player1.score += 1;
			player3.score -= 1;
		}
		var p4_ball_distance = getDistance(player4.x, player4.y, fires[i].x, fires[i].y) - player4.size - fires[i].size;
		if (p4_ball_distance < 5) {
			player1.score += 1;
			player4.score -= 1;
		}
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

	if (fire.y - fire.size < 0) {
		fire.y = 0 + fire.size;
		fire.yVel *= -0.5;
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
	//fireeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

	for (var i = 0; i < fires.length; i++) {

		if (fires[i].x + fires[i].size > canvas.width) {
			fires.splice(i, 1);
			break;
		}
		if (fires[i].x - fires[i].size < 0) {
			fires.splice(i, 1);
			break;
		}
		if (fires[i].y + fires[i].size > canvas.height) {
			fires.splice(i, 1);
			break;
		}
		if (fires[i].y - fires[i].size < 0) {
			fires.splice(i, 1);
			break;
		}
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
	if (e.keyCode === 70) {
		fDown = false;
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

	if (e.keyCode === 70) {
		fDown = true;
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


function renderPlayers() {
	for (var i = 0; i < fires.length; i++) {
		c.save();
		c.beginPath();
		c.fillStyle = "red";
		c.arc(fires[i].x, fires[i].y, fires[i].size, 0, Math.PI * 2);
		c.fill();
		c.closePath();
	}
	c.beginPath();
	c.fillStyle = "black";
	c.arc(player1.x, player1.y, player1.size, 0, Math.PI * 2);
	c.fillText(player1.name, player1.x - (player1.name.length * 3), player1.y + 30);
	c.fill();
	c.closePath();

	c.beginPath();
	c.fillStyle = "blue";
	c.arc(player2.x, player2.y, player2.size, 0, Math.PI * 2);
	c.fillText(player2.name, player2.x - (player2.name.length * 3), player2.y + 30);
	c.fill();
	c.closePath();

	c.beginPath();
	c.fillStyle = "aqua";
	c.arc(player3.x, player3.y, player3.size, 0, Math.PI * 2);
	c.fillText(player3.name, player3.x - (player3.name.length * 3), player3.y + 30);
	c.fill();
	c.closePath();

	c.beginPath();
	c.fillStyle = "rgba(207, 207, 207, 1)";
	c.arc(player4.x, player4.y, player4.size, 0, Math.PI * 2);
	c.fillText(player4.name, player4.x - (player4.name.length * 3), player4.y + 30);
	c.fill();
	c.closePath();

	c.restore();


	var line1 = new line(player1.x, player1.y, mX, mY);
	//var line2 = new line(mX, 0, mX, canvas.height);
	//var line3 = new line(0, mY, canvas.width, mY);

}

function renderBackground() {
	c.save();
	c.fillStyle = "white";
	c.fillRect(0, 0, canvas.width, canvas.height);
	c.closePath();
	c.restore();
}

function clear() {
	c.clearRect(0, 0, canvas.width, canvas.height);
}
/*

function wTC (canvas , x, y){
    var bbox = canvas.getBoundingClientRect();
    return {
        x: x = bbox.left * (canvas.width / bbox.width),
        y: y = bbox.top * (canvas.height / bbox.height)
    };
}

function dGl(x, y){
    c.strokeStyle = "rgba(0,0,230,0,8)";
    c.lineWidth = 0.5;
    dVL(x);
    dHL(y);
}
function uro(x,y){
    readout.innerText = '('  x.toFixed(0) + ', '  y.toFixed(0) + ')';
}

function dHL(y){
    c.beginPath();
    c.moveTo(0,y+0.5);
    c.lineTo(c.canvas.width ,y + 0.5);
    c.stroke();
}
function dVL(x){
    c.beginPath();
    c.moveTo(x+0.5,0);
    c.lineTo(x+0.5,c.canvas.height);
    c.stroke();
}

canvas.onmousemove = function(e){
    var loc = wTC(canvas ,e.clientX,e.clientY);
    dGl(loc.x,loc.y);
    uro(loc.x,loc.y);
}
*/