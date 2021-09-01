const spinner = prpoperty => {
    document.getElementById('spinner').style.display = prpoperty;
}
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    spinner('block');
    if (searchText == '') {
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
        spinner('none');
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

