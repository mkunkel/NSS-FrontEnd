var database = require('../modules/database');

// GET /people
exports.index = function(req, res){
  var people = database.read(__dirname   + '/../db/people.json');
  res.render('people/index', { title: 'Address Book | People', people: people });
};

// POST /people
exports.create = function(req, res){
  var person = {};
  person.name = req.body.name;
  person.gender = req.body.gender;
  person.age = req.body.age;
  person.color = req.body.color;
  var people = database.read(__dirname   + '/../db/people.json');
  people.push(person);
  database.write(__dirname   + '/../db/people.json', people);
  res.redirect('/people');
};



// GET /people/new
exports.new = function(req, res){
  res.render('people/new');
};

