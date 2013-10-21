'use strict';

var schools = [];

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}

  $(document).foundation();
  $('#addSchool').click(clickAddSchool);
  $('#addStudent').click(clickAddStudent);
  $('#addSubject').click(clickAddSubject);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// HANDLERS------------------------------------------------------------ //

function clickAddSchool() {
  var length = getValue('#length');
  var width = getValue('#width');
  var name = getValue('#school');
  var school = new School(name, length, width);
  schools.push(school);
  htmlAddSchoolToSelect(school);
}

function clickAddStudent() {
  var schoolName = $('#pickSchool').val();
  var gpa = getValue('#gpa');
  var name = getValue('#student');
  var school = _.find(schools, function(s) {return s.name === schoolName;});
  var student = new Student(name, gpa);
  school.students.push(student);
  htmlAddStudentToSelect(student);
}

function clickAddSubject() {
  var studentName = $('#pickStudent').val();
  var subject = getValue('#subject');
  var school = _.find(schools, function(school) {
    return _.find(school.students, function(student) {
      return student.name === studentName;
    });
  });
  var student = _.find(school.students, function(s) {
      return s.name === studentName;
    });
  student.subjects.push(subject);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// CLASSES------------------------------------------------------------- //

function School(name, length, width) {
  this.name = name;
  this.established = '1930';
  this.length = length;
  this.width = width;
  this.students = [];
  this.area = function() {return parseInt(this.length, 10) * parseInt(this.width, 10);};
  this.gpa = function() {
    var sum = _.reduce(this.students, function(memo, student) {return memo + student.gpa;}, 0);
    return sum / this.students.length || 0;
  };
}

function Student(name, gpa) {
  this.name = name;
  this.classes = [];
  this.grades = [];
  this.subjects = [];
  this.gpa = parseFloat(gpa);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// VIEWS--------------------------------------------------------------- //

function htmlAddSchoolToSelect(school) {
  var $option = $('<option>');
  $option.val(school.name).text(school.name);
  $('#pickSchool').append($option);
}

function htmlAddStudentToSelect(student) {
  var $option = $('<option>');
  $option.val(student.name).text(student.name);
  $('#pickStudent').append($option);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// HELPERS------------------------------------------------------------- //

function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}


function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }
  $(selector).focus();
  return value;
}