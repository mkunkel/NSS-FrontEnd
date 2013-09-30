test( "1 + 1", function() {
  deepEqual( 1 + 1, 2, "adding 1 and 1" );
});

test( "nashville[0]", function() {
  deepEqual( "nashville"[0], "n", "first letter from string" );
});

test( "add_three", function() {
  deepEqual( add_three(5), 8, "adding 3 to 5" );
  deepEqual( add_three(7), 10, "adding 3 to 7" );
});

test( "square", function() {
  deepEqual( square(3), 9, "squaring 3" );
  deepEqual( square(5), 25, "squaring 5" );
});

test( "area", function() {
  deepEqual( area(3,5), 15, "area of 3 and 5" );
  deepEqual( area(7,5), 35, "area of 7 and 5" );
});

test( "volume", function() {
  deepEqual( volume(3,5,2), 30, "volume of 3 5 2" );
  deepEqual( volume(7,5,2), 70, "volume of 7 5 2" );
});

test( "power", function() {
  deepEqual( power(2,0), 1, "power of 2 to the 0" );
  deepEqual( power(2,1), 2, "power of 2 to the 1" );
  deepEqual( power(2,2), 4, "power of 2 to the 2" );
  deepEqual( power(2,3), 8, "power of 2 to the 3" );
});

test( "greetings", function() {
  deepEqual( greeting("Hello", "Janet"), "Hello, Janet!", "Say hello to Janet" );
});

test( "pig_latin", function() {
  deepEqual( pig_latin("hello"), "elloha", "pig latin for hello" );
});

test( "pig greetings", function() {
  deepEqual( pig_greeting("Hello", "Janet"), "elloHa, anetJa!", "Say hello to Janet in pig latin" );
});

test( "pig sentence", function() {
  var sentence = "four score and seven years ago";
  var expected = "ourfa coresa ndaa evensa earsya goaa";
  deepEqual( pig_sentence(sentence), expected, "gettysburg address in pig latin" );
});