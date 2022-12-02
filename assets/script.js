var buttonEl = document.getElementById("ID OF BUTTON");

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

// Search function
var userSearch = function (event) {
  event.preventDefault();
  var searchInput = document.getElementById("FORM INPUT FIELD ID").value;
  console.log(searchInput);
  beverageSearch(searchInput);
};

// Beverage Fetch code from origin

fetch(
  "https://cocktail-by-api-ninjas.p.rapidapi.com/v1/cocktail?name=bloody%20mary",
  bevOptions
)
  .then((response) => response.json())
  // .then((response) => console.log(response))
  .then((response) => console.log(response[0].ingredients))
  .catch((err) => console.error(err));

// Recipe Fetch code from origin

fetch(
  "https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=italian%20wedding%20soup",
  recipeOptions
)
  .then((response) => response.json())
  .then((response) => console.log(response[0].ingredients))
  .catch((err) => console.error(err));

buttonEl.addEventListener("click", userSearch);
