'use strict';
var $box = $('<div>').addClass('box');
var timer;
var r = 0;
var g = 0;
var b = 0;
var speed;
$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#start').click(start);
  $('#stop').click(stop);
}

function start() {
  var dimensions = getDimensions($('#dimensions').val());
  $box.css('width', parseInt(dimensions[0], 10));
  $box.css('height', parseInt(dimensions[1], 10));
  speed = parseFloat($('#speed').val(), 10);
  startTime();
}
function startTime() {
  timer = setTimeout(addColor, speed);
}

function stop() {
  clearInterval(timer);
}

function addColor() {
  var color;
  b++;
  if (b === 256) {
    g++;
    b = 0;
  }
  if (g === 256) {
    r++;
    g = 0;
  }
  color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
  var $cbox = $box.clone();
  $cbox.css('background-color', color);
  $('#colors').append($cbox);
  if (r !== 256) {
    // console.log(color);
    startTime();
  }
}

function getDelay() {
  var delay = parseFloat($('#speed').val(), 10);
  return delay / 1000;
}

function getDimensions() {
  var dimensions = $('#dimensions').val().split(',');
  for (var i = 0; i < dimensions.length; i++) {
    dimensions[i] = parseInt(dimensions[i], 10);
  }
  return dimensions;
}

function randomColor() {function draw() {

  b++;
  if (b === 256) {
    g++;
    b = 0;
  }
  if (g === 256) {
    r++;
    b = 0;
  }
  if (r === 256) {
    clearInterval(timer);
  }
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}