$(document).ready(initialize);

function initialize() {
  $("#button1").click(change_green);
  $("#name_txt").keyup(count_characters);
}

function change_green() {
  var color = $("#mainDiv").css("background-color") == "rgb(255, 255, 255)" ? "green" : "white";
  $('#mainDiv').css("background-color", color);
}

function count_characters() {
  var string = $("#name_txt").val() + " has " + $("#name_txt").val().length + " characters";
  $("#name_div").text(string);
}