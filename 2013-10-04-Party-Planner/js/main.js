'use strict';
$(document).ready(init);

function init () {
  $('#add').click(addRow);
  $('#add').focus();
  $('table').on('click', '.rsvp', rsvp);
  $('table').on('click', '.nuke', nuke);
  $('table').on('keypress', '.textbox', enter);
  $('table').on('click', '.up, .down', move);
}

function addRow() {
  var $tr = $('<tr>');
  var $name = $('<td>');
  var $food = $('<td>');
  var $ctrl = $('<td>');
  var $nukecell = $('<td>');
  var $nukebtn = $('<input>');
  var $input = $('<input>');
  var $button = $('<input>');
  var $up = $('<img>');
  var $down = $('<img>');
  $up.addClass('up').attr('src','images/up.png');
  $down.addClass('down').attr('src','images/down.png');
  $name.addClass('name');

  $food.addClass('food');
  $ctrl.addClass('ctrl');
  $nukecell.addClass('nukecell');
  $nukebtn.attr('type', 'button');
  $nukebtn.val('Nuke!');
  $nukebtn.addClass('nuke');

  $nukecell.append($nukebtn, $up, $down);
  $input.attr('type', 'text').addClass('textbox');
  $button.attr('type', 'button');
  $button.val('RSVP');
  $button.addClass('rsvp');
  $ctrl.append($input, $button);

  $tr.append($tr, $name, $food, $ctrl, $nukecell);
  $('table').append($tr);
  $input.focus();
}

function rsvp() {
  var $btn = $(this);
  var input = $btn.prev().val();
  input = input.split(',');
  $btn.parent().siblings('.name').text(input[0].trim());
  $btn.parent().siblings('.food').text(input[1].trim());
  $('#add').focus();
}

function nuke() {
  var $btn = $(this);
  // debugger;
  $btn.closest('tr').remove();
}

function move() {
  var $btn = $(this);

  var $parent = $btn.parent().parent();
  // debugger;
  if ($btn.hasClass('up')) {
    if ($parent.prev().children('th').length < 1) {
      $parent.insertBefore($parent.prev());
    }
  } else {
    $parent.insertAfter($parent.next());
  }
}

function enter(e) {
  if (e.which === 13) {
    $(this).next().click();
    alert('this');
  }
}