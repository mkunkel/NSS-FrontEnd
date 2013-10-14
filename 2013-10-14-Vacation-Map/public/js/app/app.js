'use strict';

// Firebase Schema
var Δdb;
var Δlocations;

// Local Schema
var db = {};
db.locations = [];

db.map = null;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://vacation-map-mkunkel.firebaseIO.com');
  Δlocations = Δdb.child('locations');
  Δlocations.on('child_added', dbLocationAdded);

  $('#setZoom').click(clickSetZoom);
  $('#addLocation').click(clickAddLocation);
  $('#goLocation').click(clickGoLocation);
  initMap(36, -86, 5);
}

function clickAddLocation() {
  var name = getValue('#location');
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({address: name}, function(results, status){
    var location = {};
    location.name = results[0].formatted_address;
    location.coords = results[0].geometry.location;
    // location.long = results[0].geometry.location.mb;
    Δlocations.push(location);
  });

}

function clickSetZoom() {
  var zoom = getValue('#zoom', parseInt);
  db.map.setZoom(zoom);
}

function clickGoLocation() {
  var name = $('#selectLocation').val();
  var location = _.find(db.locations, function(x){return x.name === name});
  htmlGoToLocation(location);
}

function dbLocationAdded(location) {
  // var name = location.Name();
  location = location.val();
  db.locations.push(location);
  htmlAddLocation(location);
  htmlAddMarker(location);
}

//---------------------------------------------------------------------------------------------------------
//----------------Views------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

function htmlAddLocation(location) {
  var $option = $('<option>').text(location.name).val(location.name);
  $('#selectLocation').append($option);
}

function htmlGoToLocation(location) {
  var latLng = new google.maps.LatLng(location.coords.lb, location.coords.mb);
  db.map.setCenter(latLng);
}

function htmlAddMarker(location) {
  var latLng = new google.maps.LatLng(location.coords.lb, location.coords.mb);
  var marker = new google.maps.Marker({map: db.map,
    position: latLng,
    title: location.name,
    animation: google.maps.Animation.DROP});
}

//---------------------------------------------------------------------------------------------------------
//----------------Init Map and Utilities-------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, zoomControl: false, streetViewControl: false};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function getValue(selector, fn, decimals) {
  var value = $(selector).val();
  if (fn) {
    value = fn(value);
  }
  if (decimals) {
    value = value.toFixed(decimals);
  }
  return value;
}