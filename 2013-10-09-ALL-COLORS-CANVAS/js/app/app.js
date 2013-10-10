'use strict';
var r = 0;
var g = 0;
var b = 0;
var x = 0;
var y = 0;
var timer;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  startTime();
}

function startTime() {
  timer = setTimeout(draw, 1);
}

function draw() {
  var ctx = document.getElementById('spectrum').getContext('2d');
  x++;
  if (x > 1023) {
    x = 0;
    y++;
  }
  b++;
  if (b === 256) {
    g++;
    b = 0;
  }
  if (g === 256) {
    r++;
    g = 0;
  }

  ctx.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
  ctx.fillRect(x,y,1,1);
  if (r !== 255) {
    startTime();
  }
}