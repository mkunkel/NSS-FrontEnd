$(document).ready(initialize);

function changeDivText(){
  var name = $("#name").val();
  var color = $("#color").val();
  $("#b").text(name).css('background-color', color);
}

function moveDivs() {
  setInterval(function(){
    $("#container>div:last-child").remove().clone().prependTo("#container");
  }, 400);
}

function verify() {
  canDrink = parseInt($('#age').val()) >= 21;
  var text = canDrink ? "Can drink" : "Can't drink";
  var color = canDrink ? "green" : "red";
  $("#age_verification").css("background-color", color).text(text);
}

function initialize() {
  $("#clicker").click(changeDivText);
  $("#mover").click(moveDivs);

  $('#ager').click(verify);
  // var color = prompt("what color?");
  // $('div').css('background-color', color);
  // var size = prompt('what size?');
  // $('div').css('font-size', size);

  // var selector = prompt('which div?');
  // var clss = prompt('class to add');
  // var newText = prompt('what would you like to say?');
  // var selectorToHide = prompt('which div to hide?');

}