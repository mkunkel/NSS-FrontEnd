'use strict';

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

// Firebase Schema
var Δdb;
var Δproducts;
var Δcustomers;
var Δorders;

// Local Schema (defined in keys.js)
db.products = [];
db.customers = [];
db.orders = [];
db.revenue = function() {};


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

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
}

function turnHandlersOff(){
  $('#addProduct').off('click', clickAddProduct);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -HANDLERS----------------------------------------------------------- //

function clickAddProduct() {
  addProduct();
}


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -MAIN FUNCTIONS----------------------------------------------------- //

function addProduct() {
  var product = {};
  product.price = getValue($('#productPrice'));
  product.image = getValue($('#productImage'));
  product.off = getValue($('#productOff'));
  product.weight = getValue($('#productWeight'));
  product.name = getValue($('#productName'));
  Δproducts.push(product);
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

}

function dbOrderAdded(order) {

}


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -HTML FUNCTIONS----------------------------------------------------- //

function htmlAddProduct(product) {
  var $tr = $('<tr>');
  $tr.append($('<td>').addClass('productName').text(product.name));
  var $img = $('<img>').attr('src', 'img/' + product.image);
  $tr.append($('<td>').addClass('productImage').append($img));
  $tr.append($('<td>').addClass('productprice').text(formatCurrency(product.price)));
  $tr.append($('<td>').addClass('productOff').text(product.off + '%'));
  $tr.append($('<td>').addClass('productWeight').text(product.weight));
  $tr.append($('<td>').addClass('productSale').text(formatCurrency(product.salePrice())));
  $('#products').append($tr);
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

function Customer() {
  var id;
  var image;
  var name;
  var location;
}

function Order() {
  var id;
  var timeStamp;
  var customer;
  var products;
  var total;
  var shippingCost;
  var grandTotal = shippingCost + total;
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
  return '$' + parseFloat(number).toFixed(2);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
