var fs = require('fs');

exports.read = function(file) {
  var list = fs.readFileSync(file);
  return JSON.parse(list);
}

exports.write = function(file, contents) {
  fs.writeFileSync(file, JSON.stringify(contents));
}