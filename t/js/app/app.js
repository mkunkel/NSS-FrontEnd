'use strict';

var Δdb;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('enter-firebase-database-url-here');
}
