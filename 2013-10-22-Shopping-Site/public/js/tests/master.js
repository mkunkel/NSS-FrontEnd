'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  turnHandlersOff();
  turnHandlersOn();
  // Reset Global Variables Here
  db.products = [];
  db.customers = [];
  db.orders = [];
  // Clean Out Test Database Here
  Δdb.remove();
}

function teardownTest(){
}

test('add product', function(){
  expect(12);
  $('#productImage').val('nexus7.jpg');
  $('#productPrice').val('199.00');
  $('#productName').val('Nexus 7');
  $('#productOff').val('10');
  $('#productWeight').val('.75');
  $('#addProduct').trigger('click');

  equal(db.products.length, 1, 'there is one product');
  ok(db.products[0].id, 'there is a product id');
  ok(db.products[0] instanceof Product, 'instance of Product');
  equal(db.products[0].image, 'nexus7.jpg', 'Product image is nexus7.jpg');
  equal(db.products[0].name, 'Nexus 7', 'Product name is Nexus 7');
  equal(db.products[0].weight, 0.75, 'Product weight is .75');
  equal(db.products[0].salePrice(), 179.1, 'sale price is 179.1');

  equal($('#products tr').length, 2, 'there are 2 rows in product table');
  equal($('#products tr:nth-child(2) > td').length, 6, 'there are 6 cells in product row');
  equal($('#products .productName').text(), 'Nexus 7', 'Product listing shows product with name Nexus 7');
  equal($('#products .productSale').text(), '$179.10', 'Sale column should be populated with $179.10');
  equal($('#products .productImage img').attr('src'), 'img/nexus7.jpg', 'img src should be nexus7.jpg');
});

test('add customer', function(){
  expect(1);
});

test('add domestic order', function(){
  expect(1);
});

test('add international order', function(){
  expect(1);
});

test('calculate revenue', function(){
  expect(1);
});


// test('<name-of-feature>', function(){
//   expect(1);

//   equal('actual-result', 'expected-result', 'description of assertion');
//   ok('result-that-is-true-or-false', 'description of assertion');
//   deepEqual('actual-result', 'expected-result', 'description of assertion');
// });

// asyncTest('<name-of-feature>', function(){
//   expect(1);
// });
