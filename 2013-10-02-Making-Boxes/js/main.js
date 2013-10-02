$(document).ready(init);

function init() {
  $('#button').click(makingBoxes);
}

function makingBoxes() {
  var numBoxes = parseInt($('#amount').val());
  $('#boxes').empty();
  var $div = $('<div>')
  $div.addClass('box');
  for (var i = 0; i < numBoxes; i++)
    $('#boxes').append($div.clone().text(i));
}