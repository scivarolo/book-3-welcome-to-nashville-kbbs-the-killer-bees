const zomatoSearchBtn = document.querySelector("#zomatoInputBtn");
const zomatoInput = document.querySelector("#zomatoInput");
const zomatoResultsSection = document.querySelector(".results__zomato");

// This function captures the input from the Zomato search and converts it to a query string with +'s instaed of spaces.
function getZomatoSearch() {
  let queryString = zomatoInput.value;
  queryString = queryString.split(" ").join("+");

  zomatoAPI.request(queryString)
    .then(results => outputZomatoResults(results));
}

// This function outputs the results from Zomato into a list on the DOM
// Then adds Event Listeners to the Add buttons.
function outputZomatoResults(results) {
  restaurants = results.restaurants;
  console.log(restaurants);
  zomatoResultsSection.innerHTML += "<ul>";
  restaurants.forEach((restaurant) => {
    zomatoResultsSection.innerHTML += `
      <li>
        <h3>${restaurant.restaurant.name}</h3>
        <h4>${restaurant.restaurant.location.address}</h4>
        <p>Average Price for Two: $${restaurant.restaurant.average_cost_for_two}</p>
        <button class="results__zomato__add">Add to Itinerary</button>
      </li>
    `;
  });
  zomatoResultsSection.innerHTML += "</ul>";
  addToItinEventListeners();
}

// Add Event Listener to Zomato search button
zomatoSearchBtn.addEventListener("click", getZomatoSearch);


// Add Event Listener to Add to Itinerary Buttons
function addToItinEventListeners() {
  let addButtons = zomatoResultsSection.querySelectorAll("li button");
  addButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      console.log(event);
      zomatoAddToItinerary(event.target);
    });
  });
}

// Output desired restaurant to the Itinerary section
function zomatoAddToItinerary(clickedButton) {
  let desiredRestaurant = clickedButton.parentNode;
  let itinerarySection = document.querySelector(".itinerary__zomato");
  console.log(itinerarySection);
  //desiredRestaurant.removeChild(clickedButton);
  itinerarySection.innerHTML = `<div>${desiredRestaurant.innerHTML}</div>`;
  let button = itinerarySection.querySelector("button");
  button.textContent = "Remove from Itinerary";
  button.addEventListener("click", (event) => {
    event.target.parentNode.remove();
  });
}