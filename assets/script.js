var recipeFormEl = document.querySelector("#recipe-search");
var beverageFormEl = document.querySelector("#beverage-search");

// Beverage API permissions
const bevOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e42bdfecf5mshf3552e7e1249ca6p16c62fjsn997c4e790fc4",
    "X-RapidAPI-Host": "cocktail-by-api-ninjas.p.rapidapi.com",
  },
};

// Recipe API permissions
const recipeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "cbfed17221msh2efdb0eadae0eefp18de4bjsn3cd21032b10f",
    "X-RapidAPI-Host": "recipe-by-api-ninjas.p.rapidapi.com",
  },
};

// Recipe search function
var userRecipeInput = function (event) {
  event.preventDefault();
  var recSearchInput = document.getElementById("requested-recipe").value;
  console.log(recSearchInput);
  recipeSearch(recSearchInput);
};

// Beverage search function
var userBevInput = function (event) {
  event.preventDefault();
  var bevSearchInput = document.getElementById("requested-beverage").value;
  console.log(bevSearchInput);
  beverageSearch(bevSearchInput);
};

// Recipe fetch code
var recipeSearch = function (recipeReq) {
  var recipeQueryURL =
    "https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=" + recipeReq;
  console.log(recipeQueryURL);
  fetch(recipeQueryURL, recipeOptions)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

// Beverage fetch code
var beverageSearch = function (bevReq) {
  var bevQueryURL =
    "https://cocktail-by-api-ninjas.p.rapidapi.com/v1/cocktail?ingredients=" +
    bevReq;
  console.log(bevQueryURL);
  fetch(bevQueryURL, bevOptions)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

recipeFormEl.addEventListener("submit", userRecipeInput);
beverageFormEl.addEventListener("submit", userBevInput);
