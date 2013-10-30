exports.capify = function(string){
  return string.substr(0, 1).toUpperCase() + string.slice(1);
};