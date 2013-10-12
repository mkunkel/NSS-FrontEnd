'use strict';

var Δdb;
var Δstocks;
var Δfunds;

var db = {};
db.funds = {};
db.stocks = [];
var timer;

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
  var $col = $('<div>').addClass('stockColumn').attr('id', stock.symbol);
  var $label = $('<label>').text(stock.symbol + ' - $' + stock.price.toFixed(2));
  var $stock = $('<div>').addClass('stock').css('height', parseInt(stock.price, 10) / 4);
  $stock.append($label);
  $stock.append($('<div>').addClass('stockImage'));
  $col.append($stock);
  $('#stocks').append($col);
  getPicture(stock);
}

function getPicture(stock) {
  var apiKey = '9ef7bd8a36c1d713433c10bd95f60d37';
  var perPage = 1;
  var page = 1;
  var query = stock.name;
  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&text=' + query + '&per_page=' + perPage + '&page=' + page + '&sort=relevance&format=json&jsoncallback=?';
  $.getJSON(url, function(data) {
    var photo = data.photos.photo[0];
    var imgUrl = 'url(http://farm' + photo.farm +'.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg)';
    var selector = '#' + stock.symbol;
    $(selector).children('.stock').children('.stockImage').css('background-image', imgUrl);


  });
}

function buyStock() {
  var stock = {};
  var symbol = $('#symbol').val().toUpperCase();
  var quantity = parseInt($('#quantity').val(), 10);
  requestQuote(symbol, function(data, textStatus, jqXHR) {
    data = data.Data;
    stock.symbol = data.Symbol;
    stock.name = data.Name;
    stock.price = data.LastPrice;
    stock.quantity = quantity;
    stock.boughtAt = data.LastPrice;
    Δstocks.push(stock);
  });
}

function updateStocks() {
  for (var i = 0; i < db.stocks.length; i++) {
    var stock = db.stocks[i];
    updatePrice(stock);
  }
  console.log('x');
}

function updatePrice(stock) {

  requestQuote(stock.symbol, function(data, textStatus, jqXHR) {
    data = data.Data;
    for (var i = 0; i < db.stocks.length; i++) {
      if (db.stocks[i].symbol === data.Symbol) {
        db.stocks[i].price = data.LastPrice;
        var selector = '#' + db.stocks[i].symbol;
        $(selector).children('.stock').css('height', db.stocks[i].price / 4);
        $(selector).children('.stock').children('label').text(db.stocks[i].symbol + ' - $' + db.stocks[i].price.toFixed(2));
      }
    }
  });
}

function requestQuote(symbol, fn){
  var data = {symbol: symbol};
  var url = 'http://dev.markitondemand.com/Api/Quote/jsonp?callback=?';
  $.getJSON(url, data, fn);
}

function setRefresh() {
  clearInterval(timer);
  if (parseFloat($('#refresh').val())) {
    timer = setInterval(updateStocks, parseFloat($('#refresh').val()));
  }
}