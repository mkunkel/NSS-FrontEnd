$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  $('#authenticationButton').on('click', clickAuth);
  $('#register').on('click', clickRegister);
  $('#login').on('click', clickLogin);
  $('.delete').on('click', clickDelete);
  $('.isAdmin').on('change', clickCheckAdmin);
  $('.completed').on('change', clickCheckComplete);
  $('#create').on('click', clickCreate);
}

function clickRegister(e) {
  $('#err').text(' ');
  var url = '/users';
  var data = $('#authentication').serialize();
  sendAjaxRequest(url, data, 'POST', null, e, function(data){
    handleRegistration(data);
  });
}

function clickLogin(e) {
  $('#err').text(' ');
  var url = '/login';
  var data = $('#authentication').serialize();
  sendAjaxRequest(url, data, 'POST', 'PUT', e, function(data){
    processLogin(data);
  });
}

function clickAuth(e) {
  if (!$(this).data('email')) {
    $('#authentication').toggleClass('hidden');
    $('input[name=email]').focus();
  } else {
    var url = '/logout';
    sendAjaxRequest(url, {}, 'POST', 'DELETE', e, function(data){
      if (data.status) {
        redirect();
      }
    });
  }
  e.preventDefault;
}

function clickDelete(e) {
  var url = '/admin/' + $(this).data('id');
  var button = this;
  sendAjaxRequest(url, {}, 'POST', 'DELETE', e, function(data){
    if (data.status === 'ok') {
      processDelete($(button).closest('tr'));
    }
  });
}

function clickCheckAdmin(e) {
  var url = '/admin/' + $(this).val();
  var check = this;

  sendAjaxRequest(url, {}, 'POST', 'PUT', e, function(data){
    if (data.status === 'ok') {
      processToggleAdmin(check, data.isAdmin);
    }
  });
}

function clickCheckComplete(e) {
  var url = '/todos/' + $(this).val();
  var check = this;

  sendAjaxRequest(url, {}, 'POST', 'PUT', e, function(data){
    if (data.status === 'ok') {
      processToggleComplete(check, data.isComplete);
    }
  });
}

function clickCreate(e) {
  var url = '/todos';
  var data = $('#todoForm').serialize();

  sendAjaxRequest(url, data, 'POST', null, e, function(data){
    console.log(data);

    var $tr = $('<tr>');
    var $td = $('<td>');
    var $chk = $('<input>').attr('type', 'checkbox').addClass('completed').val(data._id);
    if (data.isComplete) {
      $chk.prop('checked', true);
    }
    $tr.append($td.clone().append($chk));
    $tr.append($td.clone().text(data.title));
    $tr.append($td.clone().text(data.category));
    $tr.append($td.clone().text(data.dueDate));
    $('#todos').append($tr);
  });
}



function handleRegistration(data) {
  if (data.status === 'ok') {
    $('input').val('');
    $('#authentication').toggleClass('hidden');
  } else {
    $('#err').text('Error: please try again');
  }
}

function processLogin(data) {
  if (data.status === 'ok') {
    redirect();
  } else {
    $('#authentication input').val('');
    $('#authentication input[type=text]').focus();
    $('#err').text('Wrong email/password');
  }
}

function processDelete($row) {
  $row.remove();
}

function processToggleAdmin(check, isAdmin) {
  $(check).prop('checked', isAdmin);
  console.log(isAdmin);
}

function processToggleComplete(check, isComplete) {
  $(check).prop('checked', isComplete);
}

function redirect() {
  window.location.href = '/';
}

function initializeSocketIO(){
  var port = location.port ? location.port : '80';
  var url = location.protocol + '//' + location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  console.log(data);
}
