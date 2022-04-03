var lineFallSpeed = 1.0;
var lineDrawPoint = 10;
var playerLifeLine = 750;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var fired = false;

var playerSize = 50;

var decreaseLineFallSpeedOnClick = -0.09
var increaseLineFallSpeedOnFrame = 0.011
var maxLineFallSpeed = 2
var minLineFallSpeed = 0.21

function drawLine(lineCurrentPoint) {
    increaceLineFallSpeed()
    lineDrawPoint = lineDrawPoint + lineFallSpeed;
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(0, lineCurrentPoint, 800, 50);
}

function drawPlayer() {
    ctx.fillStyle = 'rgb(00, 200, 0)';
    ctx.fillRect(canvas.width/2, playerLifeLine, playerSize, playerSize);
}

//+50 to wysokość playera
function checkLife() {
    if(lineDrawPoint + playerSize >= playerLifeLine){
        console.log("śmierć, ale jaka?");
    }
}

function increaceLineFallSpeed() {
    if(lineFallSpeed < maxLineFallSpeed) {
        lineFallSpeed += increaseLineFallSpeedOnFrame
    }
}

setInterval(function () {
    checkLife();
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawLine(lineDrawPoint);
    drawPlayer();

}, 1000 / 60);

//space down
document.addEventListener("keydown", function(e) {
    if(lineFallSpeed > minLineFallSpeed){
        if(e.keyCode === 32){
            if (!fired){
                lineFallSpeed += decreaseLineFallSpeedOnClick
                fired = true
            } 
        }
    }
});

document.addEventListener("keyup", function(e) {
    if(e.keyCode === 32){
        fired = false;
    }
});

