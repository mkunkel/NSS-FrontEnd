'use strict';
var photos = [];
var currentIndex = 0;
var timer;
var page = 1;
$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#search').click(searchFlickr);
  $('#photo').on('dblclick', '.photo', remove);
  $('#photo').on('click', '.photo', select);
  $('#photo').on('click', '.photo', open);
}

function searchFlickr() {
  var API_KEY = '9ef7bd8a36c1d713433c10bd95f60d37';
  var query = $('#query').val();
  var PER_PAGE = '3';
  // alert(page);
  $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&text=' + query + '&per_page=' + PER_PAGE + '&page=' + page + '&format=json&jsoncallback=?', results);

}

function results(data) {
  photos = data.photos.photo;
  timer = setInterval(createImage, 1000);
  // var page = data.photos.page + 1;
  // for (var i = 0; i < photos.length; i++) {
  //   createImage(photos[i]);
  // }
}

function createImage() {
  // debugger;
  var photo = photos[currentIndex];
  try {
    currentIndex++;
    var url = 'http://farm'+ photo.farm +'.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg';
    console.log(url);
    var $img = $('<div>');
    $img.css('background-image', 'url("' + url + '")').addClass('photo');
    // var $a = $('<a>').attr('href', url);
    // $a.append($img);
    $('#photo').append($img);
    if (currentIndex === photos.length - 1) {
      clearInterval(timer);
      currentIndex = 0;
      page++;
      searchFlickr();
    }
  }
  catch(err) {
    clearInterval(timer);
    currentIndex = 0;
    searchFlickr();
  }
}

function remove() {
  $(this).remove();
}

function select() {
  $(this).toggleClass('.selected');
}
