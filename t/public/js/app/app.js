// 'use strict';

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// // Firebase Schema
// var Δdb;

// // Local Schema (defined in keys.js)

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// $(document).ready(initialize);

// function initialize(fn, flag){
//   $(document).foundation();
//   initMap(36, -86, 5);
//   initializeDatabase();
//   turnHandlersOn();
// }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// function initializeDatabase(){
//   Δdb = new Firebase(db.keys.firebase);
// }

// function turnHandlersOn(){
//   $('-selector-').on('-event-', functionName);
// }

// function turnHandlersOff(){
//   $('-selector-').off('-event-', functionName);
// }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// function initMap(lat, lng, zoom){
//   var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
//   db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
// }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// function getValue(selector, fn){
//   var value = $(selector).val();
//   value = value.trim();
//   $(selector).val('');

//   if(fn){
//     value = fn(value);
//   }

//   return value;
// }

// function parseUpperCase(string){
//   return string.toUpperCase();
// }

// function parseLowerCase(string){
//   return string.toLowerCase();
// }

// function formatCurrency(number){
//   return '$' + number.toFixed(2);
// }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
