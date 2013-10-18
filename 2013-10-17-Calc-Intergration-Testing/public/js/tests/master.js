'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  // Δdb.remove();
  initialize(null, true);
}

function teardownTest(){
}


test('Calculate two numbers', function(){
  expect(4);

  $('#op1').val('3');
  $('#operator').val('*');
  $('#op2').val('2');
  $('#calculate').trigger('click');

  deepEqual($('#op1').val(), '','op1 should be blank');
  deepEqual($('#operator').val(), '','operator should be blank');
  deepEqual($('#op2').val(), '','op2 should be blank');
  deepEqual($('#result').text(), '6','result should be 6');

});

test('make history', function(){
  expect(21);
  $('#op1').val('5');
  $('#operator').val('+');
  $('#op2').val('7');
  $('#calculate').trigger('click');

  $('#op1').val('3');
  $('#operator').val('*');
  $('#op2').val('2');
  $('#calculate').trigger('click');



  deepEqual($('#history li').length, 2, 'History should show 2 operations');
  deepEqual($('#history li:first-child span').length, 5,'First operation should have 4 spans');
  deepEqual($('#history li:last-child span').length, 5,'Second operation should have 4 spans');
  ok($('#history li:first-child span:first-child').hasClass('op1'), 'should hav class of op1');
  ok($('#history li:first-child span:nth-child(2)').hasClass('operator'), 'should hav class of operator');
  ok($('#history li:first-child span:nth-child(3)').hasClass('op2'), 'should hav class of op2');
  ok($('#history li:first-child span:nth-child(4)').hasClass('equal'), 'should hav class of equal');
  ok($('#history li:first-child span:nth-child(5)').hasClass('result'), 'should hav class of result');
  ok($('#history li:last-child span:first-child').hasClass('op1'), 'should hav class of op1');
  ok($('#history li:last-child span:nth-child(2)').hasClass('operator'), 'should hav class of operator');
  ok($('#history li:last-child span:nth-child(3)').hasClass('op2'), 'should hav class of op2');
  ok($('#history li:last-child span:nth-child(4)').hasClass('equal'), 'should hav class of equal');
  ok($('#history li:last-child span:nth-child(5)').hasClass('result'), 'should hav class of result');
  deepEqual($('#history li:first-child .op1').text(), '3','first op1 should be 3');
  deepEqual($('#history li:first-child .operator').text(), '*','first operator should be *');
  deepEqual($('#history li:first-child .op2').text(), '2','first op2 should be 2');
  deepEqual($('#history li:first-child .result').text(), '6','first result should be 6');
  deepEqual($('#history li:last-child .op1').text(), '5','last op1 should be 5');
  deepEqual($('#history li:last-child .operator').text(), '+','last operator should be +');
  deepEqual($('#history li:last-child .op2').text(), '7','last op2 should be 7');
  deepEqual($('#history li:last-child .result').text(), '12','last result should be 12');


});

test('remove row', function(){
  expect(1);
  $('#op1').val('5');
  $('#operator').val('+');
  $('#op2').val('7');
  $('#calculate').trigger('click');

  $('#op1').val('3');
  $('#operator').val('*');
  $('#op2').val('2');
  $('#calculate').trigger('click');

  $('#op1').val('3');
  $('#operator').val('*');
  $('#op2').val('2');
  $('#calculate').trigger('click');

  $('#op1').val('3');
  $('#operator').val('*');
  $('#op2').val('2');
  $('#calculate').trigger('click');

  $('#op1').val('3');
  $('#operator').val('*');
  $('#op2').val('2');
  $('#calculate').trigger('click');

  // deepEqual($('#history li:nth-child(3)').css('background-color'), 'rgb(255, 255, 255)', 'second list item should have a white bg');
  $('#history li:first-child .remove').trigger('click');
  deepEqual($('#history li').length, 4, 'There should now be 4 list items');

});

asyncTest('test background color and row changes on remove', function(){
  expect(5);
  $('#op1').val('5');
  $('#operator').val('+');
  $('#op2').val('7');
  $('#calculate').trigger('click');

  $('#op1').val('3');
  $('#operator').val('*');
  $('#op2').val('2');
  $('#calculate').trigger('click');

  $('#op1').val('4');
  $('#operator').val('*');
  $('#op2').val('1');
  $('#calculate').trigger('click');

  $('#op1').val('3');
  $('#operator').val('/');
  $('#op2').val('2');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#operator').val('*');
  $('#op2').val('2');
  $('#calculate').trigger('click');

  var $third = $('#history li:nth-child(3)');
  deepEqual($('#history li:nth-child(2)').css('background-color'), 'rgb(255, 0, 0)', 'second list item should have a green bg');
  deepEqual($('#history li:nth-child(3)').css('background-color'), 'rgb(255, 255, 255)', 'second list item should have a white bg');
  $('#history > li:first-child > .remove').trigger('click');
  setTimeout(function() {

    deepEqual($('#history li:nth-child(2)').css('background-color'), 'rgb(255, 0, 0)', 'second list item should still have a green bg');
    deepEqual($('#history li:nth-child(3)').css('background-color'), 'rgb(255, 255, 255)', 'second list item should still have a white bg');
    deepEqual($('#history li:nth-child(2)').val(), $third.val(), 'the second li should be the same as what used to be the third li');
    start();
  }, 200);

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