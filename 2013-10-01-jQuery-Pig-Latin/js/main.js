$(document).ready(init);

function pigWord(word) {
  var last = word[word.length - 1];
  if (last == "," || last == "." || last == "?" || last == "!") {
    word = word.substring(0, word.length - 1);
  }
  else {
    last = "";
  }
  return word.slice(1) + word[0] + "a" + last;
}

function makeArray(string){
  return string.split(' ');
}
function addToPigLatin(word) {
  if ($('#piglatin').val().length > 0)
    $('#piglatin').val($('#piglatin').val() + " ");
  $('#piglatin').val($('#piglatin').val() + word);
}

function convertPig() {
  // debugger;
  var words = makeArray($('#original').val());
  $('#piglatin').val('');
  var text;
  for(var i = 0; i < words.length; i++) {
    addToPigLatin(pigWord(words[i]));
  }
  $('#string').text($('#piglatin').val());
}

function init() {
  $('#pig').click(convertPig)

}