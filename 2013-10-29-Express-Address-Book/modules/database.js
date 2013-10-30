var fs = require('fs');

exports.read = function(file){
  var data = fs.readFileSync(file);
  return JSON.parse(data);
};

exports.write = function(file, contents){
  fs.writeFileSync(file, JSON.stringify(contents));
};