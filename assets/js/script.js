//--------------------------------------------- Variable Declarations ---------------------------------------------------//

var recipeFormEl = document.querySelector("#recipe-search");
var beverageFormEl = document.querySelector("#beverage-search");
var recResultsEl = document.getElementById("rec-results-list");
var bevResultsEl = document.getElementById("bev-results-list");
var populateBox = document.getElementsByClassName("box");
var recTitleModal = document.getElementById("write-recipe-title");
var recServModal = document.getElementById("write-recipe-servings");
var recIngModal = document.getElementById("write-recipe-ingredients");
var recInsModal = document.getElementById("write-recipe-instructions");
var bevName = document.getElementById("drink-name");
var bevIngredients = document.getElementById("ingredients");
var bevInstructions = document.getElementById("instructions");
var shopping = document.getElementById("shop");
var shoppingList = document.getElementById("shopping");

//--------------------------------------------- Beverage API permissions ---------------------------------------------------//

const bevOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e42bdfecf5mshf3552e7e1249ca6p16c62fjsn997c4e790fc4",
    "X-RapidAPI-Host": "cocktail-by-api-ninjas.p.rapidapi.com",
  },
};

//--------------------------------------------- Recipe API permissions ---------------------------------------------------//

const recipeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "cbfed17221msh2efdb0eadae0eefp18de4bjsn3cd21032b10f",
    "X-RapidAPI-Host": "recipe-by-api-ninjas.p.rapidapi.com",
  },
};

//--------------------------------------------- Recipe search function ---------------------------------------------------//

var userRecipeInput = function (event) {
  event.preventDefault();
  var recSearchInput = document.getElementById("requested-recipe").value;
  recResultsEl.innerHTML = "";
  recipeSearch(recSearchInput);
};

//--------------------------------------------- Beverage search function ---------------------------------------------------//

var userBevInput = function (event) {
  event.preventDefault();
  var bevSearchInput = document.getElementById("requested-beverage").value;
  bevResultsEl.innerHTML = "";
  beverageSearch(bevSearchInput);
};

//--------------------------------------------- Recipe fetch code ---------------------------------------------------//

var recipeSearch = function (recipeReq) {
  var recipeQueryURL =
    "https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=" + recipeReq;
  fetch(recipeQueryURL, recipeOptions)
    .then((response) => response.json())
    .then((response) => displayRecipes(response))
    .catch((err) => console.error(err));
};

//--------------------------------------------- Displays recipes ---------------------------------------------------//

var displayRecipes = function (recipeArray) {
  if (recipeArray.length === 0) {
    var createText = document.createElement("li");
    createText.textContent = "Ingredient Not Found, Please Try Another Search";
    recResultsEl.appendChild(createText);
  } else {
    for (let index = 0; index < recipeArray.length; index++) {
      localStorage.setItem(
        recipeArray[index].title,
        JSON.stringify(recipeArray[index])
      );
      var createList = document.createElement("li");
      var createLink = document.createElement("button");
      createLink.setAttribute(
        "class",
        "js-modal-trigger button is-fullwidth is-justify-content-flex-start"
      );
      createLink.setAttribute("data-target", "modal-js-example");
      createLink.textContent = recipeArray[index].title;
      createLink.addEventListener("click", buttonClickHandler);
      recResultsEl.appendChild(createList);
      createList.appendChild(createLink);
    }
  }
};

//--------------------------------------------- click handler for modal functionality ---------------------------------------------------//

function buttonClickHandler(event) {
  const modal = event.target.dataset.target;
  var clickedRecipe = event.target.textContent;
  const recipeModal = JSON.parse(localStorage.getItem(clickedRecipe));

  if (recipeModal.servings) {
    recServModal.innerHTML = recipeModal.servings;
  } else {
    recServModal.innerHTML = "";
  }

  if (recipeModal.title) {
    recTitleModal.innerHTML = recipeModal.title;
  } else {
    recTitleModal.innerHTML = recipeModal.name;
  }
  recIngModal.innerHTML = recipeModal.ingredients;
  recInsModal.innerHTML = recipeModal.instructions;
  const $target = document.getElementById(modal);
  openModal($target);

  shopping.addEventListener("click", saveToShoppingList);
}

function saveToShoppingList(event) {
  var clickedRecipe;

  if (recServModal.innerHTML === "") {
    clickedRecipe = recIngModal.textContent.split(",");
  } else {
    clickedRecipe = recIngModal.textContent.split("|");
  }
  var shopList = document.createElement("ul");
  shopList.setAttribute("id", "List");

  for (let i = 0; i < clickedRecipe.length; i++) {
    var shopListItem = document.createElement("li");
    shopListItem.textContent = clickedRecipe[i];
    shopList.append(shopListItem);
  }

  shoppingList.append(shopList);
}

//--------------------------------------------- Add a click event on various child elements to close the parent modal ---------------------------------------------------//

(
  document.querySelectorAll(
    ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
  ) || []
).forEach(($close) => {
  const $target = $close.closest(".modal");

  $close.addEventListener("click", () => {
    closeModal($target);
  });
});

//--------------------------------------------- Add a keyboard event to close all modals ---------------------------------------------------//

document.addEventListener("keydown", (event) => {
  const e = event || window.event;

  if (e.keyCode === 27) {
    // Escape key
    closeAllModals();
  }
});
function openModal($el) {
  $el.classList.add("is-active");
}

function closeModal($el) {
  $el.classList.remove("is-active");
}

function closeAllModals() {
  (document.querySelectorAll(".modal") || []).forEach(($modal) => {
    closeModal($modal);
  });
}

//--------------------------------------------- Beverage fetch code ---------------------------------------------------//

var beverageSearch = function (bevReq) {
  var bevQueryURL =
    "https://cocktail-by-api-ninjas.p.rapidapi.com/v1/cocktail?ingredients=" +
    bevReq;
  fetch(bevQueryURL, bevOptions)
    .then((response) => response.json())
    .then((response) => displayBevRecipes(response))
    .catch((err) => console.error(err));
};

//--------------------------------------------- Displays beverage recipes ---------------------------------------------------//

var displayBevRecipes = function (recipeArray) {
  console.log(recipeArray);
  if (recipeArray.length === 0) {
    var createText = document.createElement("li");
    createText.textContent = "Ingredient Not Found, Please Try Another Search";
    bevResultsEl.appendChild(createText);
  } else {
    for (let index = 0; index < recipeArray.length; index++) {
      localStorage.setItem(
        recipeArray[index].name,
        JSON.stringify(recipeArray[index])
      );

      var createList = document.createElement("li");
      var createLink = document.createElement("button");
      createLink.setAttribute(
        "class",
        "js-modal-trigger button is-fullwidth is-justify-content-flex-start"
      );
      createLink.setAttribute("data-target", "modal-js-example");
      createLink.textContent = recipeArray[index].name;
      createLink.addEventListener("click", buttonClickHandler);
      bevResultsEl.appendChild(createList);
      createList.appendChild(createLink);
    }
  }
};

function clearlist() {
  document.getElementById("List").textContent = "";
}

//--------------------------------------------- Event Listeners  ---------------------------------------------------//

document.getElementById("clearlist").addEventListener("click", clearlist);
recipeFormEl.addEventListener("submit", userRecipeInput);
beverageFormEl.addEventListener("submit", userBevInput);
