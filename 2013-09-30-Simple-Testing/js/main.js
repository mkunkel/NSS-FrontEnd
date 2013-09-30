function add_three(num) {
  return num + 3;
}

function square(num) {
  return num * num;
}

function area(x,y) {
  return x * y;
}

function volume(x,y,z) {
  return area(x,y) * z;
}

function power(x,y) {
  var total = 1;
  for(var i = 0; i < y; i++)
    total *= x;
  return total;
}

function greeting(salute, name) {
  return salute + ", " + name + "!";
}

function pig_latin(word) {
  return word.slice(1) + word[0] + "a";
}

function pig_greeting(salute, name) {
  return greeting(pig_latin(salute), pig_latin(name));
}

function pig_sentence(string) {
  var words = string.split(" ");
  for(var i = 0; i < words.length; i++) {
    words[i] = pig_latin(words[i]);
  }
  return words.join(" ");
}