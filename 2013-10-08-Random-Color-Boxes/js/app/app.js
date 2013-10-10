'use strict';
var timer;
$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#start').click(start);
  $('#stop').click(stop);
}

function start() {
  var delay = getDelay();
  timer = setInterval(addColor, delay);
}

function stop() {
  clearInterval(timer);
}

function addColor() {
  var dimensions = getDimensions();
  var $box = $('<div>').addClass('box');
  $box.css('background-color', randomColor());
  $box.css('width', dimensions[0]);
  $box.css('height', dimensions[1]);
  $('#colors').append($box);
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

function randomColor() {
  var color = 'rgba(';
  color += Math.floor(Math.random() * 255) + ', ';
  color += Math.floor(Math.random() * 255) + ', ';
  color += Math.floor(Math.random() * 255) + ', ';
  color += Math.random() + ')';
  return color;
}