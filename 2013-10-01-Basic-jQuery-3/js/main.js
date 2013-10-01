$(document).ready(initialize);

function add(num1, num2) {
  return parseInt(num1) + parseInt(num2);
}
function subtract(num1, num2) {
  return parseInt(num1) - parseInt(num2);
}
function divide(num1, num2) {
  return parseInt(num1) / parseInt(num2);
}
function multiply(num1, num2) {
  return parseInt(num1) * parseInt(num2);
}

function doMath(num1, num2, operator) {
  switch(operator) {
    case "+":
      return add(num1, num2);
      break;
    case "-":
      return subtract(num1, num2);
      break;
    case "/":
      return divide(num1, num2);
      break;
    case "*":
      return multiply(num1, num2);
  }
}

function number_send() {
  var num1 = parseFloat($('#num1').val());
  var num2 = parseFloat($('#num2').val());
  var sum = doMath(num1, num2, $('#operator').text());
  $('#result').text(sum);
}

function plusbtn() {
  $('#operator').text("+");
}
function minusbtn() {
  $('#operator').text("-");
}
function dividebtn() {
  $('#operator').text("/");
}
function multiplybtn() {
  $('#operator').text("*");
}

function initialize() {
  $('#add').click(number_send);
  $('#plus').click(plusbtn);
  $('#minus').click(minusbtn);
  $('#divide').click(dividebtn);
  $('#multiply').click(multiplybtn);
}