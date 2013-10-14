'use strict';

var Δdb;
var Δstocks;
var Δfunds;

var db = {};
db.funds = {};
db.stocks = [];
db.settings = {};
var timer;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://visual-stock-market-mkunkel.firebaseIO.com');
  Δstocks = Δdb.child('stocks');
  Δfunds = Δdb.child('funds');
  Δfunds.once('value', getFunds);
  Δstocks.on('child_added', stockAdded);
  $('#setBalance').click(setBalance);
  $('#setRefresh').click(setRefresh);
  $('#buy').click(buyStock);
  $('#stocks').on('dblclick', '.stockColumn', removeStock);
}

function getFunds(funds) {
  funds = funds.val();
  if (funds) {
    db.funds = funds;
    $('#initial').addClass('disabled').attr('readonly', true).val(db.funds.initial);
    $('#setBalance').addClass('disabled');
    updateFunds();
  }
}

function setBalance() {
  if (!$('#initial').hasClass('disabled')) {
    db.funds.initial = parseFloat($('#initial').val());
    db.funds.cash = db.funds.initial;
    db.funds.stock = 0.00;
    $('#initial').addClass('disabled').attr('readonly', true);
    $('#setBalance').addClass('disabled');
    updateFunds();
    Δfunds.set(db.funds);
  }
}

function updateFunds() {

  $('#cashAmt').html('<span>Cash: $</span>' + db.funds.cash.toFixed(2));
  $('#stockAmt').html('<span>Stock: $</span>' + db.funds.stock.toFixed(2));
  $('#totalAmt').html('<span>Total: $</span>' + (db.funds.stock + db.funds.cash).toFixed(2));
  Δfunds.set(db.funds);
}


function stockAdded(stock) {
  var id = stock.name();
  stock = stock.val();
  stock.id = id;
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
    try {
      var photo = data.photos.photo[0];
      var imgUrl = 'url(http://farm' + photo.farm +'.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg)';
      var selector = '#' + stock.symbol;
      $(selector).children('.stock').children('.stockImage').css('background-image', imgUrl);
    } catch(e) {
      console.log('Error: ' + e);
    }

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
    if (stock.price * stock.quantity < db.funds.cash) {
      Δstocks.push(stock);
      $('#symbol').val('');
      $('#quantity').val('');
      db.funds.cash -= stock.price * stock.quantity;
      db.funds.stock += stock.price * stock.quantity;
      updateFunds();
    } else {
      db.settings.count = 0;

      timer = setInterval(flash, 500);

    }
  });
}

function flash() {
  // debugger;
  db.settings.count++;
  if (db.settings.count < 7) {
    $('#cashAmt').toggleClass('nsf');
    console.log($('#cashAmt').hasClass('nsf'));
  } else {
    clearInterval(timer);
  }
}

function updateStocks() {

  db.funds.stock = 0.00;
  for (var i = 0; i < db.stocks.length; i++) {
    var stock = db.stocks[i];
    updatePrice(stock, i);
  }

  // console.log('x);
}

function updatePrice(stock, x) {

  requestQuote(stock.symbol, function(data, textStatus, jqXHR) {
    data = data.Data;
    for (var i = 0; i < db.stocks.length; i++) {
      if (db.stocks[i].symbol === data.Symbol) {
        db.stocks[i].price = data.LastPrice; // + (Math.random() * 50) - 20;
        //remove Math.random part when stock market is open


        db.funds.stock += data.LastPrice * db.stocks[i].quantity;
        var selector = '#' + db.stocks[i].symbol;
        $(selector).children('.stock').css('height', db.stocks[i].price / 4);
        $(selector).children('.stock').children('label').text(db.stocks[i].symbol + ' - $' + db.stocks[i].price.toFixed(2));
        if (x === db.stocks.length - 1) {setTimeout(updateFunds, 300);}
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
    timer = setInterval(updateStocks, parseFloat($('#refresh').val()) * 1000);
  }
}

function removeStock() {
  var index = $(this).index();
  var id = db.stocks[index].id;
  requestQuote(db.stocks[index].symbol, function(data, textStatus, jqXHR) {
    data = data.Data;

    db.stocks[index].price = data.LastPrice + (Math.random() * 50) - 20;
    //remove Math.random part when stock market is open

    db.funds.cash += data.LastPrice * db.stocks[index].quantity;
    db.funds.stock -= data.LastPrice * db.stocks[index].quantity;
    updateFunds();
    var selector = '#' + db.stocks[index].symbol;
    $(selector).children('.stock').css('height', db.stocks[index].price / 4);
    $(selector).children('.stock').children('label').text(db.stocks[index].symbol + ' - $' + db.stocks[index].price.toFixed(2));
    db.stocks.splice(index, 1);

    id = new Firebase('https://visual-stock-market-mkunkel.firebaseIO.com/stocks/' + id);
    // id = obj(id);
    id.remove();
  });
  $(this).remove();
}