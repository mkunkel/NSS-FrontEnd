$(document).ready(init);
var balance = 1000.00;
var transaction = 0;
function deposit(balance, amount) {
  return balance + amount;
}

function withdraw(balance, amount) {
  return balance - amount;
}

function setBalance() {
  $('#balance').text("$" + balance.toFixed(2));
  if (balance < 0)
    $('#balance').addClass("warning");
  else
    $('#balance').removeClass("warning");
}

function addItem(original, amount, newbal) {
  transaction += 1;
  var warning = "";
  if (newbal < 0)
    warning = " warning";
  var string = '<div class="row' + warning + '"><div class="sheetitem">' + transaction + '</div>';
  string += '<div class="sheetitem">$' + original.toFixed(2) + '</div>';
  string += '<div class="sheetitem">$' + amount.toFixed(2) + '</div>';
  string += '<div class="sheetitem">$' + newbal.toFixed(2) + '</div></div>';
  $('#sheet').append(string);
}

function withdrawHandler() {
  var original = balance;
  var amount = parseFloat($('#amount').val());
  balance = withdraw(balance, amount);
  addItem(original, amount * -1, balance);
  setBalance();
}

function depositHandler() {
  var original = balance;
  var amount =  parseFloat($('#amount').val())
  balance = deposit(balance, amount);
  addItem(original, amount, balance)
  setBalance();
}

function init() {
  setBalance();
  $('#deposit').click(depositHandler);
  $('#withdraw').click(withdrawHandler);
}