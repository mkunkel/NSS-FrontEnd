$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#priority').on('submit', submitPriority);
  $('#todo').on('submit', submitTodo);
  $('.deleteTodo').on('submit', submitDelete);
  $('#todos').on('click', '.chk', clickChk);
  $('.updateTodo').on('submit', submitUpdate);
}

function clickChk() {
  $(this).closest('.updateTodo').trigger('submit');
}

function submitPriority(event) {
  submitAjaxForm(event, this, htmlAddPriorityToSelect);
}

function submitTodo(event) {
  submitAjaxForm(event, this, htmlAddTodo);
}

function submitDelete(event) {
  submitAjaxForm(event, this, htmlDeleteRow);
}

function submitUpdate(event) {
  submitAjaxForm(event, this, htmlStrikeRow);
}

function submitAjaxForm(event, form, fn) {
  var url = $(form).attr('action');
  var data = $(form).serialize();

  var options = {};
  options.url = url;
  options.type = 'POST';
  options.data = data;
  options.success = function(data, status, jqXHR){
    fn(data, form);
  };
  options.error = function(jqXHR, status, error){
    console.log(error);
  };


  $.ajax(options)

  event.preventDefault();
}


function htmlAddPriorityToSelect(data) {
  $option = $('<option>').val(data._id).text(data.name);
  $('#prioritySelect').append($option);
  $('#priority input').val('').css('background-color', '#eeeef6');
  $('#priority input[name="name"]').focus();
}

function htmlAddTodo(data) {
  console.log(data);

// form.updateTodo(action='/todos/#{todo.id}', method='POST')
//             input(type= 'hidden', name= '_method', value= 'PUT')
//             input.chk(type= 'checkbox')

  var $tr = $('<tr>').css('background-color', data.priority.color);

  var form = '<form class="updateTodo" action="/todos/' + data.id + '" method="POST"><input type="hidden" name="_method" value="PUT"><input class="chk" type="checkbox"></form>';
  $tr.append($('<td>').append(form));
  $tr.append($('<td>').text(data.title));
  $tr.append($('<td>').text(moment(data.dueDate).format('dddd, MMMM Do YYYY')));
  $tr.append($('<td>').text(data.priority.name));
  var $form = $('<form>')
          .addClass('deleteToDo')
          .attr('action', '/todos/' + data.id)
          .attr('method', 'POST');
  var $input = $('<input>').attr('type', 'hidden')
           .attr('name', '_method')
           .attr('value', 'DELETE');
  var $button = $('<button>').addClass('button')
            .addClass('tiny')
            .addClass('alert')
            .addClass('radius')
            .attr('type', 'submit')
            .text('Delete');

  $form.append($input).append($button);
  $tr.append($('<td>').append($form));

  $('#todos').append($tr);
}

function htmlDeleteRow(data, button) {
  $(button).closest('tr').remove();
}

function htmlStrikeRow(data, chk) {
  $(chk).closest('tr').toggleClass('completed');
}
