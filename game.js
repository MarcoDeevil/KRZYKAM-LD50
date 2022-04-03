import { showEndingScreen } from "./endingScreen.js";

var lineFallSpeed = 1.0;
var lineDrawPoint = 10;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var fired = false;
var playerLifeLine = canvas.height-50;
var playerSize = 50;
var score = 0;

var decreaseLineFallSpeedOnClick = -0.09
var increaseLineFallSpeedOnFrame = 0.011
var maxLineFallSpeed = 2
var minLineFallSpeed = 0.21
let isPlayerDead = false;

//to tez moze byc losowane z jakiegos przedzialu
//i wtedy wpushowywane tez do obiektu w dropDownWords
var textFallSpeed = 3;

var sadWordsTimeRender = 20;
var currentSadWordsTimeRender = sadWordsTimeRender;

const sadWords = ["depression", "sorrow", "loneliness", "fears", "your dog died", "morning alarm",
"failing", "bills", "obesity", "sadness", "bullying", "terrorism", "agression"];
const renderedSadWords = [];

const goodWords = ["you can do it", "keep it up", "you matter", "somebody loves you", "it's ok, i'm here", 
"life goes on", "you're beautiful", "don't give up", "keep pushing"]
const renderedGoodWords = [];

const dropDownWords = () => {
    const start_x = Math.floor(Math.random() * canvas.width - 100) + 101;
    const fallSpeed = Math.floor(Math.random() * 4) + 3;
    console.log(fallSpeed);
    renderedSadWords.push({
        word: sadWords[Math.floor(Math.random() * sadWords.length)],
        x: start_x,
        y: 50,
        fallSpeed: fallSpeed
    });
}

const shootGoodWords = () => {
    const offset_x = Math.floor(Math.random()*-10)+5;
    const riseSpeed = Math.floor(Math.random()*4)+3;
    console.log(riseSpeed);
    renderedGoodWords.push({
        word: goodWords[Math.floor(Math.random()*goodWords.length)],
        x: canvas.width/2-25, 
        y: playerLifeLine,
        riseSpeed: riseSpeed,
        offset_x: offset_x
    });
}

function drawLine(lineCurrentPoint) {
    increaceLineFallSpeed()
    lineDrawPoint = lineDrawPoint + lineFallSpeed;
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(0, lineCurrentPoint, canvas.width, 50);
}

function drawPlayer() {
    ctx.fillStyle = 'rgb(00, 200, 0)';
    ctx.fillRect(canvas.width / 2, playerLifeLine, playerSize, playerSize);
}

//+50 to wysokość playera
function checkLife() {
    if (isPlayerDead === false) {
        // Death of a Player
        if (lineDrawPoint + playerSize >= playerLifeLine) {
            console.log("śmierć, ale jaka?");
            showEndingScreen(200);
            isPlayerDead = true;
        }   
    }
}

function increaceLineFallSpeed() {
    if (lineFallSpeed < maxLineFallSpeed) {
        lineFallSpeed += increaseLineFallSpeedOnFrame
    }
}

function goodWordsUpdate() {
    renderedGoodWords.forEach(element => {
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(0, 200, 0)';
        if(element.y <= lineDrawPoint+50){
            element.y = lineDrawPoint+50
        }
        else {
            element.y -= element.riseSpeed;
            element.x += element.offset_x;
        }
        ctx.fillText(element.word, element.x, element.y);
    })
}

function sadWordsUpdate() {
    renderedSadWords.forEach(element => {
        ctx.font = "30px Arial";
        ctx.fillStyle = 'rgb(0, 0, 0)';

        if(element.y >= lineDrawPoint){
         element.y = lineDrawPoint
        }
        else {
            element.y += element.fallSpeed;
        }
        ctx.fillText(element.word, element.x, element.y);
    })
}

function spawnSadWords() {
    currentSadWordsTimeRender -= 1;
    if(currentSadWordsTimeRender == 0){
        dropDownWords();
        currentSadWordsTimeRender = 20;
    }
}
 
setInterval(function () {
   
    checkLife();
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawLine(lineDrawPoint);
    drawPlayer();
    spawnSadWords();
    goodWordsUpdate();
    sadWordsUpdate();

}, 1000 / 60);

//space down

document.addEventListener("keydown", function(e) {

    if(lineFallSpeed > minLineFallSpeed){
        if(e.keyCode === 32){
            if (!fired){
                shootGoodWords();
                score += 1;
                lineFallSpeed += decreaseLineFallSpeedOnClick;
                fired = true;
            } 
        }
    }
});

document.addEventListener("keyup", function (e) {
    if (e.keyCode === 32) {
        fired = false;
    }
});
