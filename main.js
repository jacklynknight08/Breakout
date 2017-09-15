"use strict";

console.log("Testing");

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Creating an object/shape
ctx.beginPath();

// First two values specify coordinates of the left and right corners of the rectangle
// Last two values specify width and height of the rectangle 
ctx.rect(20, 40, 50, 50);

// FillStyle method is painting the square
ctx.fillStyle = "#900C3F";
ctx.fill();
ctx.closePath();

// Creating a ball (circle)
ctx.beginPath();

// Arc method takes six parameters
// First two values are the coordinates of the arc's center
// Then the arc radius
// Then the start and ending angles in radians
// And last the direction of drawing where false is clockwise
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "#FF5733";
ctx.fill();
ctx.closePath();

// Creating a rectangle where we are only coloring the outer stroke
// Inside is transparent
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();