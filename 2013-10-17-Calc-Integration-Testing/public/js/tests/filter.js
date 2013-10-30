'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  // Δdb.remove();
  initialize(null, true);
}

function teardownTest(){
}

test('Remove negative numbers and get product', function(){
  expect(5);

  $('#op1').val('3');
  $('#operator').val('+');
  $('#op2').val('2');
  $('#calculate').trigger('click'); // 5

  $('#op1').val('1');
  $('#operator').val('-');
  $('#op2').val('4');
  $('#calculate').trigger('click'); // -3

  $('#op1').val('4');
  $('#operator').val('-');
  $('#op2').val('9');
  $('#calculate').trigger('click'); // -5

  $('#op1').val('6');
  $('#operator').val('+');
  $('#op2').val('2');
  $('#calculate').trigger('click'); // 8

  $('#op1').val('3');
  $('#operator').val('+');
  $('#op2').val('1');
  $('#calculate').trigger('click'); // 4

  $('#op1').val('3');
  $('#operator').val('-');
  $('#op2').val('9');
  $('#calculate').trigger('click'); // -6

  $('#removeNeg').trigger('click');

  var items = $('#history li .result');

  var isPositive = true;
  for (var i = 0; i < items.length; i++) {
    if (parseFloat($(items[i]).text()) < 0) {isPositive = false;}
  }
  deepEqual($($('#history li .result')[0]).text(), '4','third result should be 4');
  deepEqual($($('#history li .result')[1]).text(), '8','second result should be 8');
  deepEqual($($('#history li .result')[2]).text(), '5','first result should be 5');
  deepEqual(isPositive, true,'all results should be positive');

  $('#getProduct').trigger('click');

  deepEqual($($('#history li .result')[0]).text(), '160','product should be 160');
});

test('Remove negative numbers and get product', function(){
  expect(5);

  $('#op1').val('3');
  $('#operator').val('+');
  $('#op2').val('2');
  $('#calculate').trigger('click'); // 5

  $('#op1').val('1');
  $('#operator').val('-');
  $('#op2').val('4');
  $('#calculate').trigger('click'); // -3

  $('#op1').val('4');
  $('#operator').val('-');
  $('#op2').val('9');
  $('#calculate').trigger('click'); // -5

  $('#op1').val('6');
  $('#operator').val('+');
  $('#op2').val('2');
  $('#calculate').trigger('click'); // 8

  $('#op1').val('3');
  $('#operator').val('+');
  $('#op2').val('1');
  $('#calculate').trigger('click'); // 4

  $('#op1').val('3');
  $('#operator').val('-');
  $('#op2').val('9');
  $('#calculate').trigger('click'); // -6

  $('#removePos').trigger('click');

  var items = $('#history li .result');

  var isNegative = true;
  for (var i = 0; i < items.length; i++) {
    if (parseFloat($(items[i]).text()) > 0) {isNegative = false;}
  }
  deepEqual($($('#history li .result')[0]).text(), '-6','third result should be -6');
  deepEqual($($('#history li .result')[1]).text(), '-5','second result should be -5');
  deepEqual($($('#history li .result')[2]).text(), '-3','first result should be -3');
  deepEqual(isNegative, true,'all results should be negative');

  $('#getSum').trigger('click');

  deepEqual($($('#history li .result')[0]).text(), '-14','product should be -14');
});