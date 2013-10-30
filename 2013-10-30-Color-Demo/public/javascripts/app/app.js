$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('.color').on('click', clickColor);
}

function clickColor() {
  var color = $(this).css('background-color') === 'rgb(255, 255, 255)' ? $(this).data('color') : 'white';
  $(this).css('background-color', color);
}
