function square(x) {
  return x * x;
}
function cube(x) {
  return square(x) * x;
}

function power_of(number, power) {
  for(i = 2; i < power; i++) {
    number *= number;
  }
  return number;
}

function area_rect(width, height) {
  return width * height;
}

function area_triangle(width, height) {
  return area_rect(width, height) / 2;
}

function area_circle(radius) {
  return Math.PI * radius * radius;
}

function cuft_to_gallons(cuft) {
  return cuft * 7.48052;
}

function volume_cylinder(radius, depth) {
  return area_circle(radius) * depth;
}

var diameter = 30;
var depth = 9;
var gallons = cuft_to_gallons(volume_cylinder(diameter / 2, depth));
document.write("You have " + gallons + " of water in your pool");