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

//to tez moze byc losowane z jakiegos przedzialu
//i wtedy wpushowywane tez do obiektu w dropDownWords
var textFallSpeed = 3;

const sadWords = ["depression", "sorrow"];
const renderedSadWords = [];

const dropDownWords = () => {
    const start_x = Math.floor(Math.random()*canvas.width - 100)+101;
    const fallSpeed = Math.floor(Math.random()*4)+3;
    console.log(fallSpeed);
    renderedSadWords.push({
        word: sadWords[Math.floor(Math.random()*sadWords.length)],
        x: start_x, 
        y: 50,
        fallSpeed: fallSpeed
    });
    
}

// SETINTERVAL /


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

    renderedSadWords.forEach(element => {
        ctx.font = "30px Arial";
        if(element.y >= lineDrawPoint){
            element.y = lineDrawPoint
        }
        else {
            element.y += element.fallSpeed;
        }
        ctx.fillText(element.word, element.x, element.y);
    })

}, 1000 / 60);

//space down
document.addEventListener("keydown", function(e) {
    //to nie powinno byc na spacje, na spacje powinny byc dobre a te jakos czasowo? a moze tez na spacje lolz do przemyslenia
    dropDownWords();
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
