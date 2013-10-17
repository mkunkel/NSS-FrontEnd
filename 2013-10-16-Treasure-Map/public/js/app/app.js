'use strict';

// Firebase Schema
var Δdb;
var Δpositions;
var Δpoi;

// Local Schema (defined in keys.js)
db.positions = [];
db.poi = [];
db.markers = [];
// db.path = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);
  Δpositions = Δdb.child('positions');
  Δpoi = Δdb.child('poi');
  Δpositions.on('child_added', dbPositionAdded);
  Δpoi.on('child_added', dbPoiAdded);
  initMap(36, -86, 5);
  $('#start').click(clickStart);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickStart() {
  var geoOptions = {
    enableHighAccuracy: true,
    maximumAge        : 1000,
    timeout           : 60000
  };
  db.watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbPositionAdded(position) {
  position = position.val();
  var latLng = getLatLng(position);
  db.positions.push(position);
  if (db.positions.length === 1) {
    htmlAddStartMarker(latLng);

    htmlInitPath();
  }
  db.path.push(latLng);
  htmlCenterZoom(latLng, 20);
}

function dbPoiAdded(point) {
  point = point.val();
  db.poi.push(point);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddStartMarker(latLng) {
  var image = 'img/start.png';
  db.markers.first = new google.maps.Marker({
    position: latLng,
    icon: image,
    map: db.map,
    title:'Starting Point'
  });
}

function htmlInitPath() {
  var path = new google.maps.Polyline({
    geodesic: true,
    map: db.map,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  db.path = path.getPath();

}

function htmlAddPoiMarker(latLng, title) {

}

function htmlAddEndMarker(latLng) {

}

function htmlCenterZoom(latLng, zoom) {
  db.map.setCenter(latLng);
  db.map.setZoom(zoom);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.SATELLITE};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function geoSuccess(location) {
  var position = {};
  position.latitude = location.coords.latitude;
  position.longitude = location.coords.longitude;
  position.altitude = location.coords.altitude || 0;
  position.time = moment().format('MMMM Do YYYY, h:mm:ss a');
  Δpositions.push(position);
}

function geoError() {
  console.log('Sorry, no position available.');
}



// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function parseUpperCase(string){
  return string.toUpperCase();
}

function parseLowerCase(string){
  return string.toLowerCase();
}

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

function getLatLng(position) {
  return new google.maps.LatLng(position.latitude, position.longitude);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
