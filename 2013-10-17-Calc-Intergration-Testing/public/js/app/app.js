'use strict';

// Firebase Schema
// var Δdb;

// Local Schema (defined in keys.js)

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}
  $(document).foundation();
  // Δdb = new Firebase(db.keys.firebase);
  // initMap(36, -86, 5);
  $('#calculate').click(clickCalculate);
  $('#getSum').click(clickSum);
  $('#getProduct').click(clickProduct);
  $('#removeNeg').click(clickRemoveNeg);
  $('#removePos').click(clickRemovePos);

  $('#op1').focus();
  $('#history').on('click', '.remove', clickRemove);
}

function canRun(flag) {
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickCalculate() {
  var doMath = {
    '+' : function(x, y) {return x + y;},
    '-' : function(x, y) {return x - y;},
    '*' : function(x, y) {return x * y;},
    '/' : function(x, y) {return x / y;}
  };

  var op1 = parseFloat($('#op1').val());
  var op2 = parseFloat($('#op2').val());
  var operator = $('#operator').val();
  var result = doMath[operator](op1, op2);

  $('#op1').val('');
  $('#op2').val('');
  $('#operator').val('');
  $('#result').text(result);
  addHistory(op1, operator, op2, result);
}

function addHistory(op1, operator, op2, result) {
  var $li = $('<li>');
  var $op1 = $('<span>').addClass('op1').text(op1);
  var $operator = $('<span>').addClass('operator').text(operator);
  var $op2 = $('<span>').addClass('op2').text(op2);
  var $equal = $('<span>').addClass('equal').text('=');
  var $result = $('<span>').addClass('result').text(result);
  var $remove = $('<input>').addClass('remove tiny button radius alert').val('Remove').attr('type', 'button');
  $li.append($op1, $operator, $op2, $equal, $result, $remove);
  $('#history').prepend($li);
  $('#op1').focus();
}

function clickRemove() {
  $(this).parent().remove();
}

function clickRemoveNeg() {
  $('#history li .result').each(function() {
    if (parseFloat($(this).text()) < 0) {
      $(this).parent().remove();
    }
  });
}

function clickRemovePos() {
  $('#history li .result').each(function() {
    if (parseFloat($(this).text()) > 0) {
      $(this).parent().remove();
    }
  });
}

function clickSum() {
  var sum = 0;
  $('#history li .result').each(function() {
    sum += parseFloat($(this).text());
  });
  addHistory(null, 'Sum', null, sum);
}

function clickProduct() {
  var product = 1;
  $('#history li .result').each(function() {
    product *= parseFloat($(this).text());
  });
  addHistory(null, 'Product', null, product);
}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function parseUpperCase(string){
  return string.toUpperCase();
}

function parseLowerCase(string){
  return string.toLowerCase();
}

function formatCurrency(number){
  return '$' + number.toFixed(2);
}


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
