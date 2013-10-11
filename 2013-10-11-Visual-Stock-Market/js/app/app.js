'use strict';

var Δdb;
var Δstocks;
var Δfunds;

var db = {};
db.funds = {};
db.stocks = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://visual-stock-market-mkunkel.firebaseIO.com');
  Δstocks = Δdb.child('stocks');
  Δfunds = Δdb.child('funds');

  Δstocks.on('child_added', stockAdded);
  $('#setBalance').click(setBalance);
  $('#setRefresh').click(setRefresh);
  $('#buy').click(buyStock);
}

function stockAdded(stock) {
  stock = stock.val();
  db.stocks.push(stock);
}

function buyStock() {
  var stock = {};
  var symbol = $('#symbol').val().toUpperCase();
  var quantity = parseInt($('#quantity').val(), 10);
  var url = 'http://dev.markitondemand.com/Api/Quote/jsonp?callback=?';
  requestQuote(symbol, function(data, textStatus, jqXHR) {


  });
}

function requestQuote(symbol, fn){
  var data = {symbol: symbol};
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn);
}