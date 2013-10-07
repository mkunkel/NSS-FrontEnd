'use strict';
$(document).ready(init);

function init() {
  $('#add').click(addTask);
  $('table').on('click', '.chk', checked);
  $('table').on('click', '.up, .down', move);
  $('table').on('click', '.removebtn', remove);
  $('input[type=text]:first-of-type').focus();
}

function addTask() {
  // debugger;
  var $tr = $('<tr>');
  var $td = $('<td>');
  var $input = $('<input>');
  var $img = $('<img>');
  $tr.append($td.clone().addClass('date').text($('#due').val()));
  $tr.append($td.clone().addClass('task').text($('#task').val()));
  $tr.append($td.clone().addClass('color').css('background-color', $('#color').val()));
  //checkbox here
  var $done = $td.clone().addClass('done');
  var $chk = $input.clone().attr('type', 'checkbox').addClass('chk');
  $done.append($chk);
  //remove here
  var $remove = $td.clone().addClass('remove');
  var $btn = $input.clone().attr('type', 'button').val('Remove?');
  $btn.addClass('removebtn');
  $remove.append($btn);
  //up/down here
  var $arrows = $td.clone().addClass('arrows');
  $arrows.append($img.clone().addClass('up').attr('src', 'images/up.png'));
  $arrows.append($img.clone().addClass('down').attr('src', 'images/down.png'));
  $tr.append($done, $remove, $arrows);
  $('table').append($tr);
  $('input[type=text]').val('');
  $('input[type=text]:first-of-type').focus();
}

function checked() {
  var $chk = $(this);
  if ($chk.is(':checked')){
    $chk.parent().parent().addClass('checked');
  } else {
    $chk.parent().parent().removeClass('checked');
  }
}

function move() {
  var $arrow = $(this);
  var $row = $arrow.parent().parent();
  if ($arrow.hasClass('up')) {
    //move row up, but only if not already at the top
    if (!$row.prev().hasClass('head')) {
      $row.insertBefore($row.prev());
    }
  } else {
    //move row down
    $row.insertAfter($row.next());
  }
}

function remove() {
  $(this).parent().parent().remove();
}