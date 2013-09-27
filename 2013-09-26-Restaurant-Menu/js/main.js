var menuItems = [];
var categories = [];
var addAnother = true;
var exists;
var totalCalories = 0;
var totalPrice = 0;

while(addAnother) {
  var menuItem = {};
  menuItem.item = prompt('What is the name of this menu item?');
  menuItem.category = prompt('What type of menu item is this?');
  menuItem.price = parseFloat(prompt('How much do you want to charge for this?'));
  menuItem.calories = parseInt(prompt('How many calories in this item?'));
  menuItem.ingredients = [];
  var ingredient = 1;
  while(ingredient) {
    ingredient = prompt('Enter an ingredient that is in this dish, leave blank when all ingredients have been entered.');
    ingredient.length ? menuItem.ingredients.push(ingredient) : null;
  }
  exists = false;   // If new category, add it to categories array
  for(var i = 0; i < categories.length; i++){
    if (categories[i].toLowerCase() == menuItem.category.toLowerCase())
      exists = true;
  }
  !exists ? categories.push(menuItem.category) : null;
  menuItems.push(menuItem);
  addAnother = confirm("Add another menu item?");
}

// BEGIN OUTPUT
// Start with the menu itself
var x;
var ingredientList;
for(i = 0; i < categories.length; i++) {
  console.log(categories[i] + ":");
  for(var item = 0; item < menuItems.length; item++) {
    if (categories[i].toLowerCase() == menuItems[item].category.toLowerCase()) {
      x = menuItems[item]; // variable x only for shortening later requests for menuItems[item]
      console.log('    ' + x.item + " - " + x.calories + " calories - $" + x.price);
      totalPrice += x.price;
      totalCalories += x.calories;
      ingredientList = "";
      for(var a = 0; a < x.ingredients.length; a++) // build ingredient string
        ingredientList += a == 0 ? x.ingredients[a] : ", " + x.ingredients[a]; // include comma if not first element
      console.log('       ' + ingredientList);
    }
  }
  console.log(" "); //print blank line between categories
}

// Then output menu totals
// The number of items on the menu
console.log("There are " + menuItems.length + " menu items");
console.log("In " + categories.length + " categories");
console.log("The total calorie count is: " + totalCalories);
console.log("The total price is: $" + totalPrice);
console.log("The average price is: $" + totalPrice / menuItems.length);
console.log("The average calorie count is: " + totalCalories / menuItems.length);