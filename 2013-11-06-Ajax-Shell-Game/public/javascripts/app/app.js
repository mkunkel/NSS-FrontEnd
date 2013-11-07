$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#game').on('submit', submitGame);
  $('.cup').on('click', clickCup);
}

//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------


function submitGame(event) {
  var url = $(this).attr('action') + '?player=' + $('input[name="player"').val();
  sendGenericAjaxRequest(url, {}, 'POST', null, event, newGame);
  console.log(url);
}

function clickCup(event) {
  var guess = $(this).data('position');
  var gameId = $('#cups').data('game');
  var url = '/games/' + gameId;
  sendGenericAjaxRequest(url, {guess: guess}, 'POST', 'PUT', null, gameCompleted, this);
}

//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------


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

function sendGenericAjaxRequest(url, data, verb, altVerb, event, fn, form){
  var options = {};
  options.url = url;
  options.type = verb;
  options.data = data;
  options.success = function(data, status, jqXHR){
    fn(data, form);
  };
  options.error = function(jqXHR, status, error){console.log(error);};

  if(altVerb) options.data._method = altVerb;
  $.ajax(options);
  if(event) event.preventDefault();
}

//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------

function newGame(data, form) {
  console.log(data._id);
  $('input[name="player"]').val('');
  $('#cups').css('display', 'block');
  $('#cups').data('game', data._id);

}

function gameCompleted(data, cup) {
  console.log(data.didWin);
  console.log(cup);
  var color = 'red';
  if (data.didWin) { color = 'green' ;}

  $(cup).css('background-color', color);
}