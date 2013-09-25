/* this is a multi-line
    javascript
    file
*/
var firstName = prompt('What is your first name?');
var lastName = prompt('What is your last name?');
var age = prompt('What is your age?');
age = parseInt(age);
var gender = prompt('What is your gender?');
var fullName = firstName + ' ' + lastName;
var birthMonth = prompt('What is your birth month?');
var currentMonth = prompt('What month is it now?');

var test1 = prompt('Score for test 1?');
var test2 = prompt('Score for test 2?');
var test3 = prompt('Score for test 3?');
var sum = 0;
sum += parseInt(test1);
sum += parseInt(test2);
sum += parseInt(test3);
var average = sum / 3;
console.log(fullName + " your average test score is " + average);
if (average < 70) {
  console.log('failed');
}
else if ((average <= 70) && (average < 80)) {
  console.log('You made a C')
}
else if ((average <= 80) && (average < 90)) {
  console.log('You made a B')
}
else {
  console.log('You made a A')
}

if ((firstName == "Mike") && (lastName == "Kunkel"))
  console.log('Hey, I know you!');

if ((age >= 21) &&  (gender == "female"))
  console.log("Ladies night specials for you");
else if ((age >= 21) && (gender == "male"))
  console.log("You're buying tonight");
else
  console.log("not old enough");

var canHaveCake = (currentMonth == birthMonth);
var cake = (currentMonth == birthMonth) ? "chocolate" : "vanilla";

console.log('you are eating ' + cake + " cake.")

switch(birthMonth) {
  case "january":
    console.log('you are a capricorn');
    break;
  case "february":
    console.log('you are a pisces');
    break;
  default:
    console.log('you are none of these');
}


// FizzBuzz
// for (var i=1;i<=100;i++){
//   var strPrint = "";
//   if (i % 3 == 0) {strPrint = "fizz";}
//   if (i % 5 == 0) {strPrint = strPrint + "Buzz";}
//   strPrint = strPrint || i;
//   console.log(strPrint);}


// Checkbook lab
// var name = prompt('What is your name?');
// var balance = prompt('What is your initial balance?');
// var deposit1 = prompt('What was the amount of your first deposit?');
// var deposit2 = prompt('What was the amount of your second deposit?');
// var deposit3 = prompt('What was the amount of your third deposit?');
// var withdrawal1 = prompt('What was the amount of your first withdrawal?');
// var withdrawal2 = prompt('What was the amount of your second withdrawal?');
// var withdrawal3 = prompt('What was the amount of your third withdrawal?');
// balance = parseFloat(balance);
// deposit1 = parseFloat(deposit1);
// deposit2 = parseFloat(deposit2);
// deposit3 = parseFloat(deposit3);
// withdrawal1 = parseFloat(withdrawal1);
// withdrawal2 = parseFloat(withdrawal2);
// withdrawal3 = parseFloat(withdrawal3);


// balance = balance + deposit1 + deposit2 + deposit3 - withdrawal1 - withdrawal2 - withdrawal3;
// console.log(name + " your balance is $" + balance);

// if (balance < 0) {
//   balance -= 50;
//   console.log("Minus overdraft fee of $50.00, your new balance is $" + balance);
// }


