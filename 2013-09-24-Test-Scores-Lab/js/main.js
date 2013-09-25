var scores = [];
var total = 0;
var score;
var average;

for (var i = 1; i <= 10  ; i++) {
  score = (parseFloat(prompt('What is the test score for student ' + i + "?")));
  while (isNaN(score))  // Make sure entry is a number, re-prompt until it is a number
    score = (parseFloat(prompt('That was not a number. What is the test score for student ' + i + "?")));
  total += score;
  scores.push(score);}
average = total / scores.length;
document.write('Mean test score is ' + average);

total = 0;
for (i = 0; i < scores.length  ; i++)
  total += Math.pow(scores[i] - average, 2);
document.write('<br>Standard deviation is ' + Math.sqrt(total / scores.length));