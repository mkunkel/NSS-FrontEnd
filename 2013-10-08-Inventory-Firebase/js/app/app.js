'use strict';

//database schema
var Δdb;
var Δitems;
var Δperson;
var db = {};

//local schema
db.person = {};
db.items = [];
db.statistics = {};
db.statistics.grandTotal = 0;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add').click(add);
  $('#save').click(save);
  $('.next').keypress(enterPressed);
  Δdb = new Firebase('https://inventory-mkunkel2.firebaseio.com/');
  Δitems = Δdb.child('items');
  Δperson = Δdb.child('person');
  Δperson.on('value', personChanged);
  // Δdb.once('value', receiveDb);
  Δitems.on('child_added', itemAdded);
}

function enterPressed(e) {

  if (e.which === 13) {
    $(this).parent().next().children('input').focus();
  }
}

function itemAdded(snapshot){
  var item = snapshot.val();
  console.log(item);
  db.items.push(item);
  createRow(item);
  updateTotal();
}

function personChanged(snapshot){
  db.person = snapshot.val();
  try {
    $('#person').val(db.person.fullName);
    $('#address').val(db.person.address);
    console.log(db.person);
  }
  catch(e) {
    console.log('error: ' + e);
  }
  console.log(db.person);
}

function save(){
  var fullName = $('#person').val();
  var address = $('#address').val();
  db.person.fullName = fullName;
  db.person.address = address;

  Δperson.update(db.person);
}

function add(){
  var name = $('#name').val();
  var count = $('#count').val();
  var value = parseFloat($('#value').val());
  var room = $('#room').val();
  var condition = $('#condition').val();
  var date = $('#date').val();

  var item = {};
  item.name = name;
  item.count = count;
  item.value = '$' + value.toFixed(2);
  item.room = room;
  item.condition = condition;
  item.date = date;

  Δitems.push(item);
  // createRow(item);
  $('#add').closest('.row').children().children('input.next').val('');
  $('#name').focus();
}

function createRow(item){

  var row = '<tr><td class="name"></td><td class="count"></td><td class="value"></td><td class="room"></td><td class="condition"></td><td class="date"></td></tr>';
  var $row = $(row);
  $row.children('.name').text(item.name);
  $row.children('.count').text(item.count);
  $row.children('.value').text(item.value);
  $row.children('.room').text(item.room);
  $row.children('.condition').text(item.condition);
  $row.children('.date').text(item.date);

  $('#items').append($row);
}

function updateTotal() {
  // debugger;
  var sum = 0;
  for(var i = 0; i < db.items.length; i++) {

    sum += parseFloat(db.items[i].value.slice(1)) * parseInt(db.items[i].count, 10);
  }
  db.statistics.grandTotal = sum;
  $('#total').text('Total Cost: ' + toCurrency(db.statistics.grandTotal));
}

function toCurrency(num) {
  num = num.toFixed(2);
  return '$' + num;
}
