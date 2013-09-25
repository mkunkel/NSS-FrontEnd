var colors = [];
var response = "placeholder";

while (response) {
  response = prompt('Enter a color or leave blank to quit');
  response ? colors.push(response) : null;
  }

for (var i = 0; i < colors.length ; i++) {
  console.log('You typed in color: ' + colors[i]);
}

var count = 0;
for (i = colors.length - 1; i >= 0; i--) {
  console.log(colors[i] + " length is " + colors[i].length);
  count += colors[i].length;
}
console.log('Total length: ' + count);
console.log('Average length is ' + count / colors.length);