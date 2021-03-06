// hit enter to press search button
const searchInput = document.getElementById('search-field');
const searchButton = document.getElementById('search-btn');
searchInput.addEventListener("keypress", (e) => {
    if (e.key == 'Enter') {
        searchButton.click();
    }
});

const hideShowContent = (prop1, prop2) => {
    document.getElementById(prop1).style.display = prop2;
}
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    hideShowContent('meal-container', 'none');
    hideShowContent('spinner', 'block');
    if (searchText == '') {
        hideShowContent('spinner', 'none');
        document.getElementById('error-message').innerText = 'Please write something to search on the box!';
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => searchResult(data.meals));
    }
}
const searchResult = meals => {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.textContent = '';
    if (JSON.stringify(meals) == 'null') {
        hideShowContent('spinner', 'none');
        document.getElementById('error-message').innerText = 'Sorry! No item found!!';
    }
    else {
        document.getElementById('error-message').innerText = '';
        meals.forEach(meal => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div onclick="getMealDetails(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                <small>Meal id: ${meal.idMeal}</samll>  
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 300)}</p>
                </div>
            </div>
            `;
            mealContainer.appendChild(div);
        });
        hideShowContent('meal-container', 'flex');
        hideShowContent('spinner', 'none');
    }
}

//use async await insted of fetch
const getMealDetails = async meal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`
    const res = await fetch(url);
    const data = await res.json();
    mealDetails(data.meals[0]);

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => mealDetails(data.meals[0]));
}
const mealDetails = meal => {
    const singleMealDetails = document.getElementById('single-meal-details');
    singleMealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <small>Meal id: ${meal.idMeal}</samll>
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions}</p>
          <a target="_blank" href="${meal.strYoutube}" class="btn btn-primary">Go to Meal</a>
        </div>
    `
    singleMealDetails.appendChild(div);
}

