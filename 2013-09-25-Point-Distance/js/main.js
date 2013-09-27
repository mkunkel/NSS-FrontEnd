var coords = [];

for(var i = 1; i <= 2; i++) {
  var coord = {};
  coord.x = parseFloat(prompt("For point " + i + ", please enter the X coordinate."));
  coord.y = parseFloat(prompt("For point " + i + ", please enter the Y coordinate."));
  coords.push(coord);
}

var a = coords[0].x - coords[1].x;
var b = coords[0].y - coords[1].y;
var distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)); // square root of a^2 + b^2
document.write('The distance between those two points is ' + distance);