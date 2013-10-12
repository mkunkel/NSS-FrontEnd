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
  displayStock(stock);
}

function displayStock(stock) {
  var $col = $('<div>').addClass('stockColumn ' + stock.symbol);
  var $stock = $('<div>').addClass('stock').text(stock.symbol);
  $stock.append($('<div>').addClass('stockImage').c);
  $col.append($stock);
  $('#stocks').append($col);
  getPicture(stock);
}

function getPicture(stock) {
  debugger;
  var apiKey = '9ef7bd8a36c1d713433c10bd95f60d37';
  var perPage = 1;
  var page = 1;
  var query = stock.name;
  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&text=' + query + '&per_page=' + perPage + '&page=' + page + '&format=json&jsoncallback=?';
  $.getJSON(url, function(data) {
    var photo = data.photos.photo[0];
    var imgUrl = 'url(http://farm' + photo.farm +'.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg)';
    var selector = '.' + stock.symbol + ' stockImage';
    $(selector).css('background-image', imgUrl);
  });
}

function buyStock() {
  var stock = {};
  var symbol = $('#symbol').val().toUpperCase();
  var quantity = parseInt($('#quantity').val(), 10);
  var url = 'http://dev.markitondemand.com/Api/Quote/jsonp?callback=?';
  requestQuote(symbol, function(data, textStatus, jqXHR) {
    data = data.Data;
    stock.symbol = data.Symbol;
    stock.name = data.Name;
    stock.price = data.LastPrice;
    stock.quantity = quantity;
    stock.boughtAt = data.LastPrice;
    Δstocks.push(stock)

  });
}

function requestQuote(symbol, fn){
  var data = {symbol: symbol};
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn);
}