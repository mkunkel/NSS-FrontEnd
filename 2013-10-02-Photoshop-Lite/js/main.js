$(document).ready(init);

function init() {
  $('#addColor').click(addColorHandler);
  $('#addGradient').click(gradient);
  $('#color').focus();
  $('#color').keyup(keyHandler);
}

function addColorHandler() {
  var color = $('#color').val();
  var $colorDiv = $('<div>');
  $colorDiv.addClass('colorBox');
  $colorDiv.css('background-color', color);
  $('#colors').append($colorDiv);
  $('#color').val('').focus();
}

function keyHandler(event) {
  if (event.which == 13) {
    addColorHandler();
  }
}

function gradient() {
  $('#color').focus();
  for (i = 0; i < 256; i++){
    $('#color').val('rgb(0, ' + (255 - i) + ', ' + i);
    addColorHandler();
  }
  for (i = 0; i < 256; i++){
    $('#color').val('rgb(' + i + ', 0, ' + (255 - i));
    addColorHandler();
  }
  for (i = 0; i < 256; i++){
    debugger;
    $('#color').val('rgb(' + (255 - i) + ', ' + i + ', 0)');
    addColorHandler();
  }
}