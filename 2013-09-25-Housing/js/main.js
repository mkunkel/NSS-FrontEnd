function area(width, height) {
  return width * height;
}
function volume(length, width, height) {
  return length * width * height;
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

var add_another = true;
var rooms = [];
var total_sqft = 0;
var total_windows = 0;
var total_volume = 0;
var rooms_cost;
var windows_cost;

while(add_another) {
  var room = {};
  room.name = prompt('Which room do you want to enter?');
  room.width = parseInt(prompt('How many feet wide is this room?'));
  room.len = parseInt(prompt('How many feet long is this room'));
  room.height = parseInt(prompt('How many feet high is the ceiling in this room'));
  room.windows = parseInt(prompt('How many windows in this room?'));
  rooms.push(room);
  add_another = confirm("Add another room?");
}
var pool = {};
pool.diameter = prompt("What is the diameter of your pool in feet?");
pool.depth = prompt("What is the depth of your pool in feet?");
pool_volume = cuft_to_gallons(volume_cylinder(pool.diameter / 2, pool.depth))
pool_cost = pool_volume * .25;
for(var i = 0;  i < rooms.length; i++) {
  total_windows += rooms[i].windows;
  total_sqft += area(rooms[i].width, rooms[i].len);
  total_volume += volume(rooms[i].len, rooms[i].width, rooms[i].height);
}

windows_cost = total_windows * 250;
rooms_cost = total_sqft * 200;
document.write('You have ' + rooms.length + ' rooms in your house.<br>');
document.write('You have ' + total_windows + ' windows in your house.<br>');
document.write('Your house is ' + total_sqft + ' square feet<br>');
document.write('It takes ' + pool_volume.toFixed(3) + ' gallons of water to fill your pool</br>');
document.write('The water for the pool costs $' + pool_cost.toFixed(2) + "<br>");
document.write('Windows cost: $' + windows_cost.toFixed(2) + "<br>");
document.write('Rooms cost: $' + rooms_cost.toFixed(2) + "<br>");
document.write('Total cost: $' + (windows_cost + rooms_cost + pool_cost).toFixed(2) + "<br>");
document.write("Your house is " + total_volume + " cubic feet<br>");
document.write("It would take " + cuft_to_gallons(total_volume) + " gallons of water to flood your house");
