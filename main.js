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

// Creating brick field
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;

// Create offsets so the bricks will not be drawn on the edge of the canvas
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// Create a two-dimensional array
// Brick columns (c) will contain brick rows (r)
// The columns and rows contain an object that hold the x and y coordinates to paint each brick
var bricks = [];

for(var c = 0; c<brickColumnCount; c++) {
    bricks[c] = [];
    
    // Draw a brick on the canvas if the status is equal to 1
    for(var r = 0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Create a score for user
var score = 0;

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

// Loop through all the bricks (columns and rows) in the array to set x and y positions for each brick
// Draw the brick on the canvas for each loop iteration
// If status = 0, then the ball hit a brick and remove from canvas
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#DAF7A6";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Clear the canvas so a trail is not left behind
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();

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
document.addEventListener("mousemove", mouseMoveHandler, false);
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

// Relative x will be equal to the horizontal mouse position minus the distance from the left edge of the canvas and viewport
// If greater than 0 and lower than the width, the pointer is within boundaries
// Restrict movement of paddle to the canvas
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

// If the center of the ball is inside the coordinates of one of the bricks, change the direction of the ball
// For the ball to technically be inside of a brick, the following statements have to be = true
// The x position of the ball is greater than the x position of the brick.
// The x position of the ball is less than the x position of the brick plus its width.
// The y position of the ball is greater than the y position of the brick.
// The y position of the ball is less than the y position of the brick plus its height.
function collisionDetection() {
    for(var c = 0; c<brickColumnCount; c++) {
        for(var r = 0; r<brickRowCount; r++) {
            var b = bricks[c][r];

            // Check to see if a collision happens, if it occurs, do not paint brick on canvas
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    // Add a score each time a brick is hit
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("Winner Winner Chicken Dinner!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Create and update score display
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFC300";
    ctx.fillText("Score: "+score, 8, 20);
}

// Execute draw function within every 15 milliseconds
setInterval(draw, 15);
