// Selects the container where the cards will appear
const mealContainer = document.getElementById("meal-container");

// Fetches data from the API
fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken")
  .then(response => response.json())
  .then(data => {
    const meals = data.meals;

    meals.forEach(meal => {
      // For each recipe, create an <article> element
      const card = document.createElement("article");
      card.classList.add("card");

// For now, we'll just display the recipe name
     card.innerHTML = `
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
  <h2>${meal.strMeal}</h2>
  <p>${meal.strInstructions.slice(0, 100)}...</p>
  <ul>
    ${getIngredients(meal).map(ing => `<li>${ing}</li>`).join('')}
  </ul>
  <a class="btn" href="${meal.strYoutube}" target="_blank">Watch Video</a>
`;
 // Adds the card to the container
      mealContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Erro ao buscar dados da API:", error);
    mealContainer.innerHTML = "<p>Erro ao carregar receitas.</p>";
  });

// Function to get up to 5 ingredients from the recipe
function getIngredients(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${ingredient} - ${measure}`);
    }

    if (ingredients.length === 5) break;
  }

  return ingredients;
}
