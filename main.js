"use strict";

console.log("Testing");

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Define the position where the ball is drawn
var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;

// Create a ball (circle)
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Clear the canvas so a trail is not left behind
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    // Adding a value to the x and y coordinates after every frame has been drawn to make the ball appear to move
    x += dx;
    y += dy;
}

// Execute draw function within every 10 milliseconds
setInterval(draw, 10);
