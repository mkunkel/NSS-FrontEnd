'use strict';

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

// Firebase Schema
var Δdb;
var Δproducts;
var Δcustomers;
var Δorders;


$(document).ready(initialize);

function initialize(fn, flag){
  $(document).foundation();
  initializeDatabase();
  turnHandlersOn();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initializeDatabase(){
  Δdb = new Firebase(db.keys.firebase);
  Δproducts = Δdb.child('products');
  Δcustomers = Δdb.child('customers');
  Δorders = Δdb.child('orders');

  Δproducts.on('child_added', dbProductAdded);
  Δcustomers.on('child_added', dbCustomerAdded);
  Δorders.on('child_added', dbOrderAdded);
}

function turnHandlersOn(){
  $('#addProduct').on('click', clickAddProduct);
  $('#addCustomer').on('click', clickAddCustomer);
  $('#next').on('click', clickNext);
  $('#previous').on('click', clickPrevious);
  $('#products').on('click', 'img', clickProductImage);
  $('#purchase').on('click', clickPurchase);
  $('#selectCustomer').on('change', changeCustomer);
}

function turnHandlersOff(){
  $('#addProduct').off('click', clickAddProduct);
  $('#addCustomer').off('click', clickAddCustomer);
  $('#next').off('click', clickNext);
  $('#previous').off('click', clickPrevious);
  $('#products').off('click', 'img', clickProductImage);
  $('#purchase').off('click', clickPurchase);
  $('#selectCustomer').off('change', changeCustomer);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -HANDLERS----------------------------------------------------------- //

function clickAddProduct() {
  addProduct();
}

function clickAddCustomer() {
  addCustomer();
}


function clickNext() {
  paginate(1);
}

function clickPrevious() {
  paginate(-1);
}

function clickProductImage() {
  if (db.cart.customer) { // don't run if customer isn't selected
    var product = $(this).closest('tr').children('.productName').text();
    product = _.find(db.products, function(p) {return p.name === product;});
    addToCart(product);
  }
}

function changeCustomer() {
  if ($('#selectCustomer').val() !== 'default') {
    var customer = _.find(db.customers, function(c){ return c.name === $('#selectCustomer').val(); });

    // clear previous db.cart
    db.cart = {};
    db.cart.products = [];
    db.cart.customer = {};
    db.cart.totals = {};
    db.cart.totals.count = 0;
    db.cart.totals.amount = 0;
    db.cart.totals.weight = 0;
    db.cart.totals.shipping = 0;
    db.cart.totals.grand = 0;

    //clear #cart table
    $('#cart tbody').empty();
    $('#cart tfoot td').text('');

    db.cart.customer = customer;
  }
}

function clickPurchase() {
  for (var i = 0; i < db.cart.products.length; i++) {
    var product = {};
    $.extend(product, db.cart.products[i]);
    delete product.salePrice;
    db.cart.products[i] = product;
  }
  Δorders.push(db.cart);
  db.cart = {};
  $('#cart tbody tr').remove();
  $('#cart tfoot td').each(function(){$(this).text('');});
  $('#selectCustomer').val('default');
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -MAIN FUNCTIONS----------------------------------------------------- //

function paginate(increment) {
  var $tr = $('#products tr:first-child').detach();
  $('#products').empty().append($tr);
  var startPoint = db.pagination.currentPage * db.pagination.perPage;
  if (increment === -1) {
    startPoint -= db.pagination.perPage * 2;
  }
  db.pagination.currentPage += increment;
  for (var i = startPoint; i < startPoint + db.pagination.perPage; i++) {
    if (db.products[i]){htmlAddProduct(db.products[i]);}
  }
  if (i < db.products.length - 1) {
    $('#next').removeClass('hidden');
  } else {
    $('#next').addClass('hidden');
  }
  if (db.pagination.currentPage > 1) {
    $('#previous').removeClass('hidden');
  } else {
    $('#previous').addClass('hidden');
  }
}

function addProduct() {
  var product = {};
  product.price = getValue($('#productPrice'));
  product.image = getValue($('#productImage'));
  product.off = getValue($('#productOff'));
  product.weight = getValue($('#productWeight'));
  product.name = getValue($('#productName'));
  Δproducts.push(product);
}

function addCustomer() {
  var customer = {};
  customer.image = getValue($('#customerImage'));
  customer.isDomestic = $('#domestic')[0].checked;
  $('input:radio[name=address]:checked')[0].checked = false;
  customer.name = getValue($('#customerName'));
  Δcustomers.push(customer);
}

function addToCart(product) {
  db.cart.totals.count += 1;
  db.cart.totals.weight += parseFloat(product.weight);
  db.cart.totals.amount += product.salePrice();
  var shipRate = getShipRate(product);
  db.cart.totals.shipping += shipRate;
  db.cart.totals.grand += shipRate + product.salePrice();

  // add to #cart table
  // first, find out if this product is already in cart

  var productLocation = _.find(db.cart.products, function(p) {return p.name === product.name;});
  if (!productLocation){ //product is not in cart already, add a new table row
    htmlAddToCart(product);
  } else { // update quantity in existing row
    htmlUpdateCart(product);
  }

  db.cart.products.push(product);
  db.cart.products[db.cart.products.length - 1].count = 1;
}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// ---DB FUNCTIONS----------------------------------------------------- //

function dbProductAdded(product) {
  var newProduct = new Product(product);
  db.products.push(newProduct);
  htmlAddProduct(newProduct);
}

function dbCustomerAdded(customer) {
  var newCustomer = new Customer(customer);
  db.customers.push(newCustomer);
  htmlAddCustomer(newCustomer);
}

function dbOrderAdded(order) {
  var newOrder = new Order(order);
  db.orders.push(newOrder);
  htmlAddOrder(newOrder);
}


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -HTML FUNCTIONS----------------------------------------------------- //

function htmlAddProduct(product) {
  if ($('#products tr').length < db.pagination.perPage + 1) {
    var $tr = $('<tr>');
    var $img = $('<img>').attr('src', 'img/' + product.image);
    $tr.append($('<td>').addClass('productImage').append($img));
    $tr.append($('<td>').addClass('productName').text(product.name));
    $tr.append($('<td>').addClass('productprice').text(formatCurrency(product.price)));
    $tr.append($('<td>').addClass('productOff').text(product.off + '%'));
    $tr.append($('<td>').addClass('productWeight').text(product.weight));
    $tr.append($('<td>').addClass('productSale').text(formatCurrency(product.salePrice())));
    $('#products').append($tr);
  } else{
    $('#next').removeClass('hidden');
  }
}

function htmlAddCustomer(customer) {
  $('#selectCustomer').prepend($('<option>').val(customer.name).text(customer.name));
}

function htmlAddToCart(product) {
  var $tr = $('<tr>');
  var $td = $('<td>');
  $tr.append($td.clone().addClass('productName').text(product.name));
  $tr.append($td.clone().addClass('productCount').text(1));
  var salePrice = product.salePrice();
  $tr.append($td.clone().addClass('productAmount').text('$' + salePrice.toFixed(2)));
  $tr.append($td.clone().addClass('productWeight').text(product.weight + ' lbs'));
  var shipRate = getShipRate(product);

  $tr.append($td.clone().addClass('productShipping').text('$' + shipRate.toFixed(2)));
  $tr.append($td.clone().addClass('productTotal').text('$' + (salePrice + shipRate).toFixed(2)));

  $('#cart tbody').append($tr);
  htmlUpdateFooter();
}

function htmlUpdateCart(product) {
  var $row = $(_.find($('#cart tbody tr'), function(r){ return $(r).children('.productName').text() === product.name; }));
  var count = parseInt($row.children('.productCount').text(), 10);
  count++;
  $row.children('.productCount').text(count);
  var shipRate = getShipRate(product);
  $row.children('.productTotal').text('$' + ((product.salePrice() + shipRate) * count).toFixed(2));
}

function htmlUpdateFooter() {
  $('tfoot #cartCount').text(db.cart.totals.count);
  $('tfoot #cartAmount').text('$' + db.cart.totals.amount.toFixed(2));
  $('tfoot #cartWeight').text(db.cart.totals.weight + ' lbs');
  $('tfoot #cartShipping').text('$' + db.cart.totals.shipping.toFixed(2));
  $('tfoot #cartTotal').text('$' + db.cart.totals.grand.toFixed(2));
}

function htmlAddOrder(order) {
  var $tr = $('<tr>');
  var $td = $('<td>');
  $tr.append($td.clone().addClass('orderId').text(order.id));
  $tr.append($td.clone().addClass('orderTime').text(order.timeStamp));
  $tr.append($td.clone().addClass('orderCustomer').text(order.customer.name));

  var $products = $('<ol>');
  for (var i = 0; i < order.products.length; i++) {
    $products.append($('<li>').text(order.products[i].name));
  }
  $tr.append($td.clone().addClass('orderProducts').append($products));
  $tr.append($td.clone().addClass('orderTotal').text(formatCurrency(order.total)));
  $tr.append($td.clone().addClass('orderShipping').text(formatCurrency(order.shipping)));
  $tr.append($td.clone().addClass('orderGrand').text(formatCurrency(order.grand)));
  $('#orders tbody').append($tr);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -CLASSES------------------------------------------------------------ //

function Product(product) {
  this.id = product.name();
  product = product.val();
  this.image = product.image;
  this.name = product.name;
  this.price = product.price;
  this.off = product.off;
  this.salePrice = function() {return this.price * (1-(parseFloat(this.off) / 100));};
  this.weight = product.weight;
}

function Customer(customer) {
  this.id = customer.name();
  customer = customer.val();
  this.image = customer.image;
  this.name = customer.name;
  this.isDomestic = customer.isDomestic;
}

function Order(order) {
  this.id = order.name();
  order = order.val();
  this.timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a');
  this.customer = order.customer;
  this.products = order.products;
  this.total = order.totals.amount;
  this.shipping = order.totals.shipping;
  this.grand = order.totals.grand;
}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getShipRate(product) {
  var shipRate = db.cart.customer.isDomestic ? 0.5 : 1.5;
  shipRate = parseFloat(product.weight) * shipRate;
  return shipRate;
}

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
  return '$' + parseFloat(number).toFixed(2);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
