test("pig latin", function(){
  deepEqual(pigWord('hello'), 'elloha', "pig latin works!");
});
test("reverse string", function(){
  deepEqual(convertString('hello, mike, kunkel'), 'unkelka; ikema; elloha', "reverse string works!");
});
