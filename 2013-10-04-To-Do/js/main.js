'use strict';
$(document).ready(init);

function init() {
  $('#add').click(addTask);
  $('#color').keypress(isEnter);
  // $('#due').keyup(addSlash);
  $('table').on('click', '.chk', checked);
  $('table').on('click', '.up, .down', move);
  $('table').on('click', '.removebtn', remove);
  $('input[type=text]:first-of-type').focus();
}

// function dateHelper(e) {
//   if (isNaN(String.fromCharCode(e.which)) &&
//       (e.which !== 104) &&
//       (e.which !== 46) &&
//       (e.which !== 9) &&
//       (e.which !== 116)){
//     return false;
//   } else {
//     setTimeout(addSlash(), 200);

//   }
// }

// function addSlash(e) {
//   if (e.which !== 104 ) {
//     if ($('#due').val().length === 2) {
//       $('#due').val($('#due').val() + '/');
//     } else if ($('#due').val().length === 5) {
//       $('#due').val($('#due').val() + '/');
//     }
//   }
// }

function isEnter(e) {
  if (e.which === 13) {
    $('#add').focus();
  }
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
  var $row = $(this).parent().parent();
  $row.find('td')
  .wrapInner('<div style="display: block;" />')
  .parent()
  .find('td > div')
  .fadeOut(500, function(){$(this).parent().parent().remove();});
}
