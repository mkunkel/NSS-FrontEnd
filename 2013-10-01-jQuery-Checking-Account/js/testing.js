test("deposit", function() {
  deepEqual(deposit(1000, 250), 1250, "deposit works")
})
test("withdraw", function() {
  deepEqual(withdraw(1000, 250), 750, "withdraw works")
})