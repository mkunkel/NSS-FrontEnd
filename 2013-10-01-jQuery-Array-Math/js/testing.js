test("initial split", function(){
  deepEqual(initSplit("5, 3"), [5,3], "split worked!")
});

test("range array", function(){
  deepEqual(rangeArray(5), [1,2,3,4,5], "range array worked!")
});

test("multiply array", function(){
  deepEqual(multiplyArray([1,2,3,4,5], 3), [3,6,9,12,15], "multiply array worked!")
});

test("sum array", function(){
  deepEqual(sumArray([3,6,9,12,15]), 45, "sum array worked!")
});

test("arraytostring", function(){
  deepEqual(arrayToString([3,6,9,12,15]), "3+6+9+12+15=45", "arrayToString worked!")
});