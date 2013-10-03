'use strict';
$(document).ready(init);
var mouseState = false;


function init() {
  $('#addColor').click(addColorHandler);
  $('#addGradient').click(gradient);
  $('#addBigGradient').click(bigGradient);
  $('#color').focus();
  $('#color').keyup(keyHandler);
  $('.colorBox').click(boxClicked);
  $('#addBox').click(addPixel);
  $('#addBox').click(addPixel);
  $('#pixels').mousedown(function(){ mouseState = true;});
  $('#pixels').mouseup(function(){ mouseState = false;});
  //$('parent_selector').on('event name', 'child selector', name of function)
  $('#boxes').on('click', '.colorBox', boxClicked);
  $('#pixels').on('mouseenter', '.pixel', pixelColor);
}

// function mouse() {
//   mouseState = !mouseState;
// }

function addPixel() {

  for (var i = 0; i < $('#amount').val(); i++) {
    var $div = $('<div>');
    $div.addClass('pixel');
    $('#pixels').append($div);
  }
}

function pixelColor() {
  // debugger;
  if (mouseState) {
    var color = $('#brush').css('background-color');
    $(this).css('background-color', color);
  }
}

function boxClicked() {
  var color = $(this).css('background-color');
  $('#brush').css('background-color', color);
}

function addColorHandler(r, g, b) {
  // debugger;
  var color;
  if (r) {
    color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }else{
    color = $('#color').val();
  }
  var $colorDiv = $('<div>');
  $colorDiv.addClass('colorBox');
  $colorDiv.css('background-color', color);
  $('#boxes').append($colorDiv);
  $('#color').val('').focus();

}

function keyHandler(event) {
  if (event.which === 13) {
    addColorHandler();
  }
}

function gradient() {
  $('#color').focus();
  for (var i = 0; i < 256; i++){
    $('#color').val('rgb(0, ' + (255 - i) + ', ' + i + ')');
    addColorHandler();
  }
  for (i = 0; i < 256; i++){
    $('#color').val('rgb(' + i + ', 0, ' + (255 - i) + ')');
    addColorHandler();
  }
  for (i = 0; i < 256; i++){
    // debugger;
    $('#color').val('rgb(' + (255 - i) + ', ' + i + ', 0)');
    addColorHandler();
  }
}
function bigGradient() {
  // debugger;
  $('#color').focus();

  for (var r = 0; r < 256; r++) {
    for (var g = 0; g < 256; g++) {
      for (var b = 0; b < 256; b++) {
        // $('#color').val('rgb(' + r + ', ' + g + ', ' + b + ')');
        setTimeout(addColorHandler(r,g,b),20);
      }
    }
  }
}