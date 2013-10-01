test("pig latin", function() {
  deepEqual(pigWord("hello"), "elloha", "Pig latin works!");
  deepEqual(pigWord("Mike"), "ikeMa", "Pig latin works!");
});