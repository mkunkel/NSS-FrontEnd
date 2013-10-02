$(document).ready(init);

function init(){
  $('#button').click(buttonHandler);
  $('#clearInput').click(clearInputHandler);
  $('#clearBoxes').click(clearBoxesHandler);
  $('#colors').focus();
}

function clearInputHandler() {
  $('#colors').val('').focus();
}

function clearBoxesHandler() {
  $('#boxes').empty();
  clearInput();
}

function buttonHandler() {
  var colors = $('#colors').val();
  colors = colorsToArray(colors);


  for (var i = 0; i < colors.length; i++) {
    var $div = $('<div>');
    $div.addClass('box');
    $div.css('background-color', colors[i]);
    $('#boxes').append($div.text(colors[i]));
  }
}

function colorsToArray(colors) {
  colors = colors.split(",");
  for (color in colors)
    color = color.trim();
  return colors;
}