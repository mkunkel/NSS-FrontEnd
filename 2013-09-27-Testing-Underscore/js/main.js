function filter_evens(numbers) {
 // return [0,2,4,6,8];
  return _.filter(numbers, function(num){return num % 2 == 0;})
}

function filter_odds(numbers) {
 // return [0,2,4,6,8];
  return _.filter(numbers, function(num){return num % 2 != 0;})
}

function filter_short_strings(strings) {
  return _.filter(strings, function(x){return x.length < 4;});
}

function filter_long_strings(strings) {
  return _.filter(strings, function(x){return x.length > 5;});
}

function filter_a_strings(strings) {
  return _.filter(strings, function(x){return x.toLowerCase()[0] == "a" ;});
}

function find_string(strings, toFind) {
  return _.find(strings, function(x){ return x  == toFind; })
}

function filter_leap_years(years) {
  return _.filter(years, function(x){return x % 4 == 0 && (x % 100 != 0 || x % 400 == 0)})
}

function find_ending_letter(strings, toFind) {
  return _.find(strings, function(x){return x[x.length - 1] == toFind;})
}

// console.log(filter_leap_years(_.range(1000,2500)));