$(document).ready(init);

function initSplit(string) { // convert to integer array
  var numbers = string.split(',');
  for (var i = 0; i < numbers.length; i++)
    numbers[i] = parseInt(numbers[i]);
  return numbers;
}

function rangeArray(num) { //make a numbered array of a specified length
  return _.range(1, num + 1);
}

function multiplyArray(numbers, multiple) { // multiply each array item
  for (var i = 0; i < numbers.length; i++)
    numbers[i] *= multiple;
  return numbers;
}

function sumArray(numbers) { // add all the numbers in an array
  var sum = 0;
  for (var i = 0; i < numbers.length; i++)
    sum += numbers[i];
  return sum;
}

function arrayToString(numbers){
  var sum = sumArray(numbers);
  return numbers.join('+') + "=" + sum;
}

function processInput() { // bring it all together
  var input = initSplit($('#input').val());
  var nums = rangeArray(input[0]);
  nums = multiplyArray(nums, input[1]);
  $('#output').text(arrayToString(nums));
}

function init() {
  $('#convert').click(processInput);
}