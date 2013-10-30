'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  turnHandlersOff();
  turnHandlersOn();
  // Reset Global Variables Here
  db.keys = {};
  db.products = [];

  db.pagination = {};
  db.pagination.perPage = 5;
  db.pagination.currentPage = 1;
  db.cart = {};
  db.cart.products = [];
  db.cart.customer = {};
  db.cart.totals = {};
  db.cart.totals.count = 0;
  db.cart.totals.amount = 0;
  db.cart.totals.weight = 0;
  db.cart.totals.shipping = 0;
  db.cart.totals.grand = 0;
  db.orders = [];
  db.customers = [];
  // Clean Out Test Database Here
  Δdb.remove();
}

function teardownTest(){
}

function createTestProduct(name, image, weight, price, off) {
  $('#productImage').val(image);
  $('#productName').val(name);
  $('#productWeight').val(weight);
  $('#productPrice').val(price);
  $('#productOff').val(off);
  $('#addProduct').trigger('click');
}

function createTestCustomer(name, image, isDomestic) {
  $('#customerImage').val(image);
  $('#customerName').val(name);
  if (isDomestic) {
    $('#domestic')[0].checked = true;
  } else {
    $('#international')[0].checked = true;
  }
  $('#addCustomer').trigger('click');
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

test('Product pagination', function() {
  expect(18);
  for(var i = 0; i < 12; i++) {
    var name = Math.random().toString(36).substring(2);
    var image = Math.random().toString(36).substring(2) + '.png';
    var weight = Math.random() * 100;
    var price = Math.random() * 1000;
    var off = Math.random() * 100;
    createTestProduct(name, image, weight, price, off);
  }

  equal(db.products.length, 12, 'there are 12 products');
  equal(db.pagination.perPage, 5, 'show 5 products per page');
  equal(db.pagination.currentPage, 1, 'should be on first page');
  equal($('#products tr').length, 6, 'there are 5 products in product table');
  equal($('#previous.hidden').length, 1, 'previous button is hidden');
  equal($('#next:not(.hidden)').length, 1, 'next button is displayed');

  $('#next').trigger('click');

  equal(db.pagination.currentPage, 2, 'should be on second page');
  equal($('#products tr').length, 6, 'there are 5 products in product table');
  equal($('#previous:not(.hidden)').length, 1, 'previous button is displayed');
  equal($('#next:not(.hidden)').length, 1, 'next button is displayed');

  $('#next').trigger('click');

  equal(db.pagination.currentPage, 3, 'should be on third page');
  equal($('#products tr').length, 3, 'there are 2 products in product table');
  equal($('#previous:not(.hidden)').length, 1, 'previous button is displayed');
  equal($('#next.hidden').length, 1, 'next button is hidden');

  $('#previous').trigger('click');
  $('#previous').trigger('click');

  equal(db.pagination.currentPage, 1, 'should be on first page');
  equal($('#products tr').length, 6, 'there are 5 products in product table');
  equal($('#previous.hidden').length, 1, 'previous button is hidden');
  equal($('#next:not(.hidden)').length, 1, 'next button is displayed');
});

test('add customer', function(){
  expect(7);
  $('#customerImage').val('bob.jpg');
  $('#customerName').val('Bob Jenkins');
  $('#domestic')[0].checked = true;
  $('#addCustomer').trigger('click');

  equal(db.customers.length, 1, 'should have 1 customer');
  ok(db.customers[0] instanceof Customer, 'should be an instance of customer');
  ok(!$('#domestic')[0].checked, 'domestic should not be checked');
  equal(db.customers[0].name, 'Bob Jenkins', 'name should be present');
  equal(db.customers[0].image, 'bob.jpg', 'image should be present');
  ok(db.customers[0].id, 'id should be present');
  ok(db.customers[0].isDomestic, 'is domestic');
});

test('customer dropdown', function(){
  expect(7);

  for(var i = 0; i < 5; i++) {
    var name = Math.random().toString(36).substring(2);
    var image = Math.random().toString(36).substring(2) + '.png';
    var isDomestic = _.shuffle([true, false])[0];
    createTestCustomer(name, image, isDomestic);
  }

  createTestCustomer('Bob', 'bob.jpg', true);

  //table headers - name, amount, weight, shipping, total;

  equal(db.customers.length, 6, 'there are 6 customers');
  equal($('#selectCustomer option').length, 7, 'select box has 5 options');
  equal($('#selectCustomer option:first-child').val(), 'Bob', 'First option value is Bob');
  equal($('#selectCustomer option:first-child').text(), 'Bob', 'First option text is Bob');
  ok($('table#cart').length, 'shopping cart is visible');
  equal($('table#cart th').length, 6, 'shopping cart has 6 headers');
  ok($('#purchase').length, 'purchase button should be visible');
});

test('add items to shopping cart', function(){
  expect(19);
  createTestProduct('ipad air', 'ipadair.jpg', 1, 500, 10); //sale price, $450
  createTestProduct('nexus 7', 'nexus7.jpg', 0.7, 300, 0); //sale price, $300
  createTestProduct('ZH patch', 'zhpatch.jpg', 0.1, 5, 20); // sale price, $4

  createTestCustomer('Bob', 'bob.jpg', true);
  createTestCustomer('Sally', 'sally.jpg', false);

  $('#selectCustomer').val('Sally');
  $('#selectCustomer').trigger('change');

  // two nexus 7s
  $('#products tr:nth-child(3) .productImage img').trigger('click');
  $('#products tr:nth-child(3) .productImage img').trigger('click');

  // one ipad air
  $('#products tr:nth-child(2) .productImage img').trigger('click');

  // one zh patch
  $('#products tr:nth-child(4) .productImage img').trigger('click');

  equal(db.cart.customer.name, 'Sally', 'Shopping cart belongs to Sally');
  ok(db.cart.customer instanceof Customer, 'customer should be Customer');
  equal(db.cart.products.length, 4, '4 items in shopping cart');
  ok(db.cart.products[0] instanceof Product, 'items should be Products');
  equal(db.cart.totals.count, 4, 'should have chosen 4 items');
  equal(db.cart.totals.amount, 1054, 'total amount should come to 1054');
  equal(db.cart.totals.weight, 2.5, 'total weight should come to 2.5');

  // domestic $0.50/pound, international $1.50/pound
  ok(db.cart.totals.shipping > 3.74 && db.cart.totals.shipping < 3.76, 'total shipping should come to 3.75');
  equal(db.cart.totals.grand, 1057.75, 'total amount should come to 1057.75');

  equal($('#cart thead tr').length, 1, 'there is a header');
  equal($('#cart tbody tr').length, 3, 'there are 3 rows');
  equal($('#cart tfoot tr').length, 1, 'there is a footer');

  equal($('#cart tbody tr:first-child .productName').text(), 'nexus 7', 'first product should be nexus 7');
  equal($('#cart tbody tr:first-child .productCount').text(), '2', 'Count should be 2');


  equal($('#cart tfoot tr #cartCount').text(), '4', 'there are 4 items in cart total');
  equal($('#cart tfoot tr #cartAmount').text(), '$1054.00', 'Items add to $1054.00');
  equal($('#cart tfoot tr #cartWeight').text(), '2.5 lbs', 'items weigh 2.5 lbs');
  equal($('#cart tfoot tr #cartShipping').text(), '$3.75', 'shipping is $3.75');
  equal($('#cart tfoot tr #cartTotal').text(), '$1057.75', 'Grand total is $1057.75');
});

test('add order', function(){
  expect(14);
  createTestProduct('ipad air', 'ipadair.jpg', 1, 500, 10); //sale price, $450
  createTestProduct('nexus 7', 'nexus7.jpg', 0.7, 300, 0); //sale price, $300
  createTestProduct('ZH patch', 'zhpatch.jpg', 0.1, 5, 20); // sale price, $4

  createTestCustomer('Bob', 'bob.jpg', true);
  createTestCustomer('Sally', 'sally.jpg', false);

  $('#selectCustomer').val('Sally');
  $('#selectCustomer').trigger('change');

  // two nexus 7s
  $('#products tr:nth-child(3) .productImage img').trigger('click');
  $('#products tr:nth-child(3) .productImage img').trigger('click');

  // one ipad air
  $('#products tr:nth-child(2) .productImage img').trigger('click');


  // one zh patch
  $('#products tr:nth-child(4) .productImage img').trigger('click');

  $('#purchase').trigger('click');

  // #orders headers:
  // id, time, customer, products, total, shipping, grand total
  // time = moment().format('MMMM Do YYYY, h:mm:ss a');
  equal($('#cart tbody tr').length, 0, 'no rows in tbody after purchase');
  equal($('#cartTotal').text(), '', 'cart total is blank after purchase');
  equal($('#selectCustomer').val(), 'default', 'dropdown should default after purchase');
  equal(db.orders.length, 1, 'there is 1 order');
  ok(db.orders[0] instanceof Order, 'order is an Order object');
  ok(db.orders[0].id, 'order has an ID');
  equal($('#orders thead th').length, 7, 'there are 7 columns in #orders table');
  equal($('#orders tbody tr').length, 1, 'one row in #orders tbody');
  equal($('#orders tbody .orderTime').text().split(' ').length, 5, 'time is formatted correctly');
  equal($('#orders tbody .orderCustomer').text(), 'Sally', 'customer is Sally');
  equal($('#orders tbody .orderTotal').text(), '$1054.00', 'total is $1054.00');
  equal($('#orders tbody .orderShipping').text(), '$3.75', 'shipping is $3.75');
  equal($('#orders tbody .orderGrand').text(), '$1057.75', 'grand total is $1057.75');
  equal($('#orders tbody .orderProducts ol li').length, 4, '4 items in ordered list');
});



// test('calculate revenue', function(){
//   expect(1);
// });


// test('<name-of-feature>', function(){
//   expect(1);

//   equal('actual-result', 'expected-result', 'description of assertion');
//   ok('result-that-is-true-or-false', 'description of assertion');
//   deepEqual('actual-result', 'expected-result', 'description of assertion');
// });

// asyncTest('<name-of-feature>', function(){
//   expect(1);
// });
