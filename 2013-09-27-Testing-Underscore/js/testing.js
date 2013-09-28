test( "Filter even numbers", function() {
  var numbers = _.range(10);
  var expected = [0, 2, 4, 6, 8];
  deepEqual(filter_evens(numbers), expected, "filter_evens function succeeds" );
});

test( "Filter Odd numbers", function() {
  var numbers = _.range(10);
  var expected = [1,3,5,7,9];
  deepEqual(filter_odds(numbers), expected, "filter_odds function succeeds" );
});

test( "filter short strings", function() {
  var strings = ["hello", "a", "the", "cat", "elephant", "encyclopedia"];
  var expected = ["a", "the", "cat"];
  deepEqual(filter_short_strings(strings), expected, "testing for strings under 4 characters");
});

test( "filter long strings", function() {
  var strings = ["hello", "a", "the", "cat", "elephant", "encyclopedia"];
  var expected = ["elephant", "encyclopedia"];
  deepEqual(filter_long_strings(strings), expected, "testing for strings over 6 characters");
});

test( "filter A strings", function() {
  var strings = ["apple", "hello", "a", "the", "cat", "elephant", "Aardvark", "encyclopedia"];
  var expected = ["apple", "a", "Aardvark"];
  deepEqual(filter_a_strings(strings), expected, "testing for strings starting with a");
});

test( "find strings ending in a particular letter", function() {
  var strings = ["dog", "cats", "lion", "tigers"];
    deepEqual(find_ending_letter(strings, "s"), "cats", "should find word ending in s");
    deepEqual(find_ending_letter(strings, "z"), undefined, "should not find word ending in z");
});

test( "find a string", function() {
  var strings = ["apple", "hello", "a", "the", "cat", "elephant", "Aardvark", "encyclopedia"];
  var expected = "elephant";
  deepEqual(find_string(strings, "elephant"), expected, "testing for elephant");
  deepEqual(find_string(strings, "Aardvark"), "Aardvark", "testing for Aardvark");
  deepEqual(find_string(strings, "cat"), "cat", "testing for cat");
  deepEqual(find_string(strings, "not here"), undefined, "testing for non-existant string");
});

test( "Filter leap years", function() {
  var numbers = _.range(2008, 2033);
  var expected = [2008, 2012, 2016, 2020, 2024, 2028, 2032];
  deepEqual(filter_leap_years(numbers), expected, "filter_leap_years function succeeds" );
});