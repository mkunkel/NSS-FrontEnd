test("convert to roman numerals", function() {
  deepEqual(convertToRoman(2013), "MMXIII", "2013 Successfully converted!")
  deepEqual(convertToRoman(1993), "MCMXCIII", "1993 Successfully converted!")
  deepEqual(convertToRoman(900), "CM", "900 Successfully converted!")
  deepEqual(convertToRoman(500), "D", "500 Successfully converted!")
  deepEqual(convertToRoman(800), "DCCC", "800 Successfully converted!")
  deepEqual(convertToRoman(400), "CD", "400 Successfully converted!")
  deepEqual(convertToRoman(300), "CCC", "300 Successfully converted!")
});

test("number to string", function() {
  deepEqual(toString(900, "C", 100), "CCCCCCCCC", "Successfully converted!")
  deepEqual(toString(20, "X", 10), "XX", "Successfully converted!")
  deepEqual(toString(3, "I", 1), "III", "Successfully converted!")
});

test("get quotient", function() {
  deepEqual(getQuotient(2013, 1000), 2000, "quotient of 2013 / 1000 = 2")
  deepEqual(getQuotient(1500, 450), 1350, "quotient of 1350 / 450 = 3")
});