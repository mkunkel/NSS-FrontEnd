var name = prompt('What is your name?');
var strPrint = name;
var balance = parseFloat(prompt('What is your initial balance?'));
// get three deposits and add them
balance += parseFloat(prompt('What was the amount of your first deposit?'));
balance += parseFloat(prompt('What was the amount of your second deposit?'));
balance += parseFloat(prompt('What was the amount of your third deposit?'));
// get three withdrawals and subtract them
balance -= parseFloat(prompt('What was the amount of your first withdrawal?'));
balance -= parseFloat(prompt('What was the amount of your second withdrawal?'));
balance -= parseFloat(prompt('What was the amount of your third withdrawal?'));

if (balance < 0) { //check for overdraft
  balance -= 50;
  strPrint += ", you received an overdraft fee of $50.00";
}

console.log(strPrint + ", your balance is $" + balance.toFixed(2)); //convert to float
