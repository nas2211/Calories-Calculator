"use strict";

var calorieCounter = document.getElementById("calorie-counter");
var budgetNumberInput = document.getElementById("budget");
var entryDropdown = document.getElementById("entry-dropdown");
var addEntryButton = document.getElementById("add-entry");
var clearButton = document.getElementById("clear");
var output = document.getElementById("output");
var isError = false;

function cleanInputString(str) {
  var regex = /[+-\s]/g;
  return str.replace(regex, "");
}

function isInvalidInput(str) {
  var regex = /\d+e\d+/i;
  return str.match(regex);
}

function addEntry() {
  var targetInputContainer = document.querySelector("#".concat(entryDropdown.value, " .input-container"));
  var entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  var HTMLString = "\n  <label for=\"".concat(entryDropdown.value, "-").concat(entryNumber, "-name\">Entry ").concat(entryNumber, " Name</label>\n  <input type=\"text\" id=\"").concat(entryDropdown.value, "-").concat(entryNumber, "-name\" placeholder=\"Name\" />\n  <label for=\"").concat(entryDropdown.value, "-").concat(entryNumber, "-calories\">Entry ").concat(entryNumber, " Calories</label>\n  <input\n    type=\"number\"\n    min=\"0\"\n    id=\"").concat(entryDropdown.value, "-").concat(entryNumber, "-calories\"\n    placeholder=\"Calories\"\n  />");
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

function calculateCalories(e) {
  e.preventDefault();
  isError = false;
  var breakfastNumberInputs = document.querySelectorAll("#breakfast input[type='number']");
  var lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']");
  var dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']");
  var snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']");
  var exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']");
  var breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  var lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  var dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  var snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  var exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  var budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  var consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  var remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  var surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";
  output.innerHTML = "\n  <span class=\"".concat(surplusOrDeficit.toLowerCase(), "\">").concat(Math.abs(remainingCalories), " Calorie ").concat(surplusOrDeficit, "</span>\n  <hr>\n  <p>").concat(budgetCalories, " Calories Budgeted</p>\n  <p>").concat(consumedCalories, " Calories Consumed</p>\n  <p>").concat(exerciseCalories, " Calories Burned</p>\n  ");
  output.classList.remove("hide");
}

function getCaloriesFromInputs(list) {
  var calories = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      var currVal = cleanInputString(item.value);
      var invalidInputMatch = isInvalidInput(currVal);

      if (invalidInputMatch) {
        alert("Invalid Input: ".concat(invalidInputMatch[0]));
        isError = true;
        return null;
      }

      calories += Number(currVal);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return calories;
}

function clearForm() {
  var inputContainers = Array.from(document.querySelectorAll(".input-container"));

  for (var _i = 0, _inputContainers = inputContainers; _i < _inputContainers.length; _i++) {
    var container = _inputContainers[_i];
    container.innerHTML = "";
  }

  budgetNumberInput.value = "";
  output.innerText = "";
  output.classList.add("hide");
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);