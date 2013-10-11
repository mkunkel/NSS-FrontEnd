'use strict';

var Δdb;
var Δsettings;
var Δstocks;

// Local Schema
var db = {};
db.settings = {};
db.stocks = [];
var timer;
var flashTimer;
$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://stock-market-mkunkel.firebaseIO.com');
  Δsettings = Δdb.child('settings');
  Δstocks = Δdb.child('stocks');

  Δsettings.on('value', settingsChanged);
  Δstocks.on('child_added', stockAdded);
  $('#buy').click(buyStocks);
  $('#setBalance').click(setBalance);
  $('#setSpeed').click(setSpeed);
  db.settings.count = 0;
}

function stockAdded(snapshot) {
  var stock = snapshot.val();
  db.stocks.push(stock);
  db.settings.count = db.stocks.length;
  getStockQuote(stock.symbol, function(data, textStatus, jqXHR) {
    try {
      addRow(stock, data.Data.LastPrice);
    } catch(e) {
      console.log(e);
    }
  });
}

function getStockQuote(x, fn) {
  var url = 'http://dev.markitondemand.com/Api/Quote/jsonp?callback=?';
  var data = {symbol: x};
  $.getJSON(url, data, fn);
}

function stockDone(data, textStatus, jqXHR) {
  data = data.Data;
  var symbol = data.Symbol;
  var name = data.Name;
  var price = data.LastPrice;
  for(var i = 0; i < db.stocks.length; i++) {
    if (db.stocks[i].symbol === symbol) {
      // console.log(db.stocks[i]);
      db.stocks[i].name = name;
      db.stocks[i].price = price;
      // db.stocks[i].originalPrice = price;
      Δstocks.push(db.stocks[i]);
    }
  }
  // db.settings.count--;
  // if (db.settings.count === 0) {
  //   updateRows(price);
  // }
}

function buyStocks() {
  var stock = {};
  stock.symbol = $('#symbol').val().toUpperCase();
  stock.quantity = parseInt($('#quantity').val(), 10);
  getStockQuote(stock.symbol, function(data, textStatus, jqXHR) {
    data = data.Data;
    // console.log(data);
    stock.name = data.Name;
    stock.price = parseFloat(data.LastPrice);
    stock.originalPrice = parseFloat(data.LastPrice);
    if (parseFloat($('#cash').val().slice(1)) > stock.price * stock.quantity) {
      Δstocks.push(stock);
    } else  {
      db.settings.count = 0;
      flashTimer = setInterval(flash, 400);
      // $('#cash').toggleClass('nsf')
      // setTimeout(function() {$('#cash').toggleClass('nsf');}, 300);
      // setTimeout(function() {$('#cash').toggleClass('nsf');}, 300);
      // setTimeout(function() {$('#cash').toggleClass('nsf');}, 300);
      // setTimeout(function() {$('#cash').toggleClass('nsf');}, 300);

    }

    // addRow(stock, stock.price);
  });
}

function flash() {
  db.settings.count++;
  if (db.settings.count < 7) {
    $('#cash').toggleClass('nsf');
  } else {
    clearInterval(flashTimer);
  }
}

function settingsChanged(snapshot) {

  if (snapshot.val()) {db.settings = snapshot.val();}
  if (db.settings.initialBalance && !$('#setBalance').hasClass('disabled')) {
    $('#initial').val('$' + db.settings.initialBalance.toFixed(2));
    $('#cash').val('$' + db.settings.initialBalance.toFixed(2));
    $('#balance').val('$' + db.settings.initialBalance.toFixed(2));
    var speed = db.settings.speed ? db.settings.speed : 0;
    $('#speed').val(speed);
    $('#setSpeed').click();
    $('#initial').prop('readonly', 'true').css('background-color', '#CCCCCC');
    $('#setBalance').addClass('disabled');
  }
}

function setBalance() {
  if (!$('#setBalance').hasClass('disabled')) {
    db.settings.initialBalance = parseFloat($('#initial').val());
    $('#cash').val('$' + parseFloat(db.settings.initialBalance).toFixed(2));

    Δsettings.set(db.settings);
    $('#initial').prop('readonly', 'true').css('background-color', '#CCCCCC');
    $('#setBalance').addClass('disabled');
  }
}

function setSpeed() {
  // debugger;
  db.settings.speed = parseInt($('#speed').val(), 10);
  Δsettings.set(db.settings);
  clearInterval(timer);
  if (db.settings.speed > 0) {
    timer = setInterval(updateRows, db.settings.speed);
  }
}

function updateRows() {
  // debugger;
  db.settings.cash = parseFloat($('#initial').val().slice(1)).toFixed(2);
  db.settings.stock = 0.00;
  db.settings.balance = parseFloat($('#initial').val().slice(1)).toFixed(2);
  $('#cash').val('$' + db.settings.cash);
  $('#stock').val('$' + db.settings.stock);
  $('#balance').val('$' + db.settings.balance);
  var $row = $('#stockList tr:first-child').detach();
  $('#stockList').empty().append($row);
  for(var i = 0; i < db.stocks.length; i++) {
    db.stocks[i].prevPrice = db.stocks[i].price;
    updateQuote(db.stocks[i], i);
  }
}

function updateQuote(stock, i) {

  getStockQuote(stock.symbol, function(data, textStatus, jqXHR) {addRow(stock, data.Data.LastPrice, i);});
}

function addRow(stock, price, i) {

  var $tr = $('<tr>');
  var $td = $('<td>');
  $tr.append($td.clone().text(stock.symbol));
  $tr.append($td.clone().text(stock.name));
  $tr.append($td.clone().text('$' + stock.originalPrice.toFixed(2)));
  var $tdPrice = $td.clone().text('$' + price.toFixed(2));
  if (i) {
    if (Math.floor(price * 100) / 100 > db.stocks[i].prevPrice) {
      console.log(stock.symbol + price + ' > ' + db.stocks[i].prevPrice);
      $tdPrice.addClass('higher');
      // $tdPrice.removeClass('lower');
    } else if (Math.floor(price * 100) / 100 < db.stocks[i].prevPrice) {
      console.log(stock.symbol + price + ' < ' + db.stocks[i].prevPrice);
      $tdPrice.addClass('lower');
      // $tdPrice.removeClass('higher');
    }
    db.stocks[i].prevPrice = price;
  }

  $tr.append($tdPrice);
  $tr.append($td.clone().text(stock.quantity));
  // debugger;
  var expense = stock.originalPrice * stock.quantity;
  var income = price * stock.quantity;
  updateTotals(expense, income);
  var total = (income); // - (expense);
  $tr.append($td.clone().text('$' + total.toFixed(2)));
  $('#stockList').append($tr);

}

function updateTotals(expense, income) {
  var cash = $('#cash').val().slice(1);
  var stock = $('#stock').val().slice(1);
  cash = parseFloat(cash) - expense;
  stock = parseFloat(stock) + income;
  $('#cash').val('$' + parseFloat(cash).toFixed(2));
  $('#stock').val('$' + parseFloat(stock).toFixed(2));
  $('#balance').val('$' + parseFloat(cash + stock).toFixed(2));
}