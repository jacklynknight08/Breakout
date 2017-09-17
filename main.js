"use strict";

console.log("Testing");

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Define the position where the ball is drawn
var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;

// Hold the radius of the drawn circle
var ballRadius = 10;

// Defining the paddle with a starting point on the x-axis
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

// Defining the pressed buttons
// Default value of false
var rightPressed = false;
var leftPressed = false;

// Create a ball (circle)
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#FF5733";
    ctx.fill();
    ctx.closePath();
}

// Creating the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#C70039";
    ctx.fill();
    ctx.closePath();
}

// Clear the canvas so a trail is not left behind
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    // Subtracting the radius from one edge's width and adding it to the other gives proper collision detecting
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    // If the ball collides with the bottom edge of the canvas, GAME OVER
    // Create a collision detection for when the ball comes in contact with the paddle
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
        }
    }

    // If right cursor is pressed, move paddle 7 pixels to the right
    // If left cursor is pressed, move paddle 7 pixels to the left
    // PaddleX position will move between 0 and canvas.width-paddleWidth in order to keep the paddle within the boundaries of the canvas
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    // Adding a value to the x and y coordinates after every frame has been drawn to make the ball appear to move
    x += dx;
    y += dy;
}

// Listen for keypresses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// When key is pressed, set to true
// 37 left cursor and 39 right cursor
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

// When key is released set to false
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

// Execute draw function within every 10 milliseconds
setInterval(draw, 10);
