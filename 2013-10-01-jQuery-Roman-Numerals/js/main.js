$(document).ready(init);
function getQuotient(num, divide){ // poor name, if given (2013, 1000), returns 2000
  var quotient = 0;
  if (num >= divide)
    quotient = parseInt(num / divide);
  return quotient * divide;
}

function toString(num, letter, value) { // returns a string with the number of letters required
  var string = "";                      // to make the num
  for (i = 0; i < num / value; i++)
    string = string + letter;
  return string;
}

function getLetters(x, low, mid, high) {
    var string = "";
    switch (x.length){
    case 9:
      string += low + high;
      break;
    case 4:
      string += low + mid;
      break;
    default:
      if (x.length >= 5) {
        string += mid;
        x = x.slice(5);
      }
      string += x;
  }
  return string;
}

function convertToRoman(x) {
  var string = "";
  var workhorse;
  workhorse = getQuotient(x, 1000); // deal with the thousands place
  x -= workhorse; // remove thousands from the number
  string += toString(workhorse, "M", 1000);
  workhorse = getQuotient(x, 100); // then hundreds
  x -= workhorse; // remove the hundreds from the number
  workhorse = toString(workhorse, "C", 100);
  string += getLetters(workhorse, "C", "D", "M");

  workhorse = getQuotient(x, 10); // then tens
  x -= workhorse; // remove the tens from the number
  workhorse = toString(workhorse, "X", 10);
  string += getLetters(workhorse, "X", "L", "C");

  workhorse = getQuotient(x, 1); // then ones
  x -= workhorse; // remove the ones from the number
  workhorse = toString(workhorse, "I", 1);
  string += getLetters(workhorse, "I", "V", "X");

  return string;
}

function doConversion() {
  var number = parseInt($('#input').val());
  var string = convertToRoman(number);
  $('#output').val(string);
}
function init() {
  $('#convert').click(doConversion);
}