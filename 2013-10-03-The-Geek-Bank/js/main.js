'use strict';
$(document).ready(init);
var transactionNum = 0;

function init() {
  $('#error').hide();
  $('#balanceForm').hide();
  $('#transactionForm').hide();
  $('#setLogo').click(setLogo);
  $('#setBalance').click(setBalance);
  $('#deposit').click(function() {newTransaction(1);});
  $('#withdraw').click(function() {newTransaction(-1);});
  $('#logoUrl').keypress(logoPress);
  $('#newBalance').keydown(balancePress);
  $('#logoUrl').focus();
  //$('parent_selector').on('event name', 'child selector', name of function)
  $('#transactionList').on('click', '.row', deleteTransaction);
}

function logoPress(e) {
  if (e.which === 13) {
    $('#setLogo').click();
  }
}

function balancePress(e) {
  if (e.which === 13) {
    $('#setBalance').click();
  }
}

function clear(element) {
  element.val('');
}

function setLogo() {
  var url = $('#logoUrl').val();
  $('#logo').css('background-image', 'url(\'' + url + '\')');
  clear($('#logoUrl'));
  $('#logoForm').hide();
  $('#balanceForm').show();
  $('#newBalance').focus();
}

function setBalance() {
  var balance = $('#newBalance').val();
  balance = parseFloat(balance).toFixed(2);
  $('#balance').text('$' + balance);
  clear($('#newBalance'));
  addTransaction('$0.00', ' \u00a0', balance, balance);
  $('#balanceForm').hide();
  $('#transactionForm').show();
  $('#amount').focus();
}

function getBalance() {
  var balance = $('#balance').text();
  return balance.slice(1);
}

function newTransaction(num) {
  $('#error').hide();
  var withdraw;
  var deposit;
  var transaction = parseFloat($('#amount').val());
  if (isNaN(transaction)) {$('#error').show();}
  transaction = isNaN(transaction) ? 0 : transaction * num;
  var balance = parseFloat(getBalance()) + transaction;
  balance = balance.toFixed(2);
  if (transaction < 0) {
    withdraw = '$' + transaction;
    deposit = ' \u00a0';
  }
  else {
    deposit = '$' + transaction;
    withdraw = ' \u00a0';
  }


  addTransaction($('#balance').text(), withdraw, deposit, balance);
  // $('#balance').text('$' + balance);
  $('#amount').select();
  $('#amount').focus();
}

function addTransaction(startBal, withdraw, deposit, newBal) {
  transactionNum++;
  var $row = $('<div>');
  var $div = $('<div>');
  var $clear = $('<div>');
  $row.addClass('row');
  $('#balance').text('$' + newBal);

  if (newBal < 0) {
    $row.addClass('warning');
  }
  if (withdraw.substr(0,1) === 'R' || deposit.substr(0,1) === 'R') {
    $row.addClass('removal');
  }
  $div.addClass('info');
  $clear.addClass('clear');
  $row.append($div.clone().text(transactionNum).addClass('trans'));
  $row.append($div.clone().text(startBal).addClass('start'));
  $row.append($div.clone().text(withdraw).addClass('withdraw'));
  $row.append($div.clone().text(deposit).addClass('deposit'));
  $row.append($div.clone().text('$' + newBal).addClass('balance'));
  $row.append($clear);
  $('#transactionList').append($row);
}

function deleteTransaction() {
  if (!$(this).hasClass('removal')) {
    var withdraw = $(this).find('.withdraw').text();
    var deposit = $(this).find('.deposit').text();
    var transactionNum = $(this).find('.trans').text();
    var balance = $('#balance').text();
    balance = parseFloat(balance.slice(1));
    var currentBalance = balance;
    if (withdraw === ' \u00a0') {
      withdraw = parseFloat(deposit.slice(1));
      deposit = 'Reverse transaction #' + transactionNum;
      balance -= withdraw;
      withdraw *= -1;
      withdraw = '$' + withdraw.toFixed(2);
    }
    else {
      deposit = parseFloat(withdraw.slice(1));
      withdraw = 'Reverse transaction #' + transactionNum;
      balance -= deposit;
      deposit *= -1;
      deposit = '$' + deposit.toFixed(2);
    }
    addTransaction('$' + currentBalance, withdraw, deposit, balance.toFixed(2));
    $(this).slideUp();

  }
}