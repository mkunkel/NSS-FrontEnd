'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#search').click(searchFlickr);
  $('#empty').click(emptyPics);
  $('#delete').click(deletePics);
  $('#save').click(savePics);
  $('#photo').on('dblclick', '.photo', remove);
  $('#photo').on('click', '.photo', select);
  $('#photo').on('click', '.photo', open);
  $('#photo').on('click', '.more', load);
}

function searchFlickr(page) {
  var API_KEY = '9ef7bd8a36c1d713433c10bd95f60d37';
  var query = $('#query').val();
  var PER_PAGE = '52';
  // alert(page);
  page = typeof page !== 'undefined' ? page : 1;
  $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&text=' + query + '&per_page=' + PER_PAGE + '&page=' + page + '&format=json&jsoncallback=?', results);

}

function results(data) {
  var photos = data.photos.photo;
  var page = data.photos.page + 1;
  for (var i = 0; i < photos.length; i++) {
    createImage(photos[i]);
  }
  var $clear = $('<div>').addClass('clear');
  var $a = $('<a>').attr('href', '#').addClass('button');
  if (photos.length) {
    $a.addClass('small radius more').text('Load Page ' + page);
    $('#photo').append($clear, $a);
  } else {
    alert('connection failed');
  }
}

function createImage(photo) {
  var url = 'http://farm'+ photo.farm +'.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg';
  var $img = $('<div>');
  $img.css('background-image', 'url("' + url + '")').addClass('photo');
  // var $a = $('<a>').attr('href', url);
  // $a.append($img);
  $('#photo').append($img);
}

function remove() {
  $(this).remove();
}

function load() {
  $(this).prev().prev().focus();
  $(this).prev().remove();

  $(this).remove();
  var page = $(this).text().split(' ');
  // debugger;
  // page = parseInt(page[page.length - 1], 10);
  searchFlickr(page[2]);
}

function emptyPics() {
  $('#photo').children('.photo:not(.selected)').remove();
}

function select() {
  $(this).toggleClass('selected');
}

function deletePics() {
  $('#photo').children('.selected').remove();
}

function savePics() {
  var $selected = $('#photo').children('.selected');
  $('#saved').append($selected);
}