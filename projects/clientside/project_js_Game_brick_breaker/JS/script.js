const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let image = {
background:new Image(),
body:new Image(),
heart:new Image()
}
image.background.src='imgs/bricks_1920x1280.jpg';
image.body.src = 'imgs/stream.png'
image.heart.src = 'imgs/bonuses/1.png'

const loseSound = document.getElementById("loseSound");
const hitSound = document.getElementById("hitSound");
const winSound = document.getElementById("winSound");
const loseLive = document.getElementById("loseLive");

var check = document.getElementsByClassName("check");
check = false;
function checkAll() { 
    if(check){
        check = false;
    }
    else{
        check = true;
    }
 }


