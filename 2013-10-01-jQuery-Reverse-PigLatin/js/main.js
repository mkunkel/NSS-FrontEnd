$(document).ready(init);
function pigWord(word){
  return word.slice(1) + word[0] + "a";
}

function convertString(string) {
  var words = string.split(', ');
  for (i = 0; i < words.length; i++)
    words[i] = pigWord(words[i]);
  return words.reverse().join('; ');
}

function convert(){
  $('#converted').val(convertString($('#original').val()))
}

function init(){
  $('#convert').click(convert);
}